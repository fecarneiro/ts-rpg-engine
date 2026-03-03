import { Character, type Direction, type TilePosition } from "@domain";
import {
  CHARACTER_FRAME_END,
  CHARACTER_SCALE,
  characterAssets,
  MOVE_DURATION_MS,
} from "@game/configs/character";
import { mapAssets, TILE_SIZE, tileToPixel } from "@game/configs/map";
import Phaser from "phaser";

export class WorldScene extends Phaser.Scene {
  private character!: Character;
  private player!: Phaser.GameObjects.Sprite;
  private isMoving = false;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  public constructor() {
    super("WorldScene");
  }

  public create(): void {
    // New character instance with archetype
    this.character = new Character("warrior");

    // Spaw character default position
    const initialPosition: TilePosition = { tileX: 2, tileY: 2 };
    const initialDirection: Direction = "down";
    this.character.spawn(initialPosition, initialDirection);

    // Add character to scene
    this.player = this.add.sprite(
      tileToPixel(this.character.position.tileX),
      tileToPixel(this.character.position.tileY),
      characterAssets.warrior.idle.spritesheetKey,
      0 // First character frame in spritesheet
    );

    // Create map + boundary limits
    // TODO: Boundary limits hardcoded
    const map = this.make.tilemap({ key: mapAssets.overworld.tilemap.key });
    const tileset = map.addTilesetImage(
      mapAssets.overworld.tilesetName,
      mapAssets.overworld.tileset.key
    );

    if (!tileset) {
      throw new Error(
        'Tileset "Overworld" not found. Confirm name="Overworld" inside the Overworld.tsx file'
      );
    }

    map.createLayer("Terrain", tileset, 0, 0);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Grid
    const grid = this.add.grid(
      0,
      0,
      map.widthInPixels,
      map.heightInPixels,
      TILE_SIZE,
      TILE_SIZE,
      0,
      0
    );
    grid.setOrigin(0, 0);
    grid.setOutlineStyle(0xffffff, 0.25);
    grid.setDepth(0.5);

    this.player.setScale(CHARACTER_SCALE);
    this.player.setDepth(1); // Above grid (0.5) so character is visible

    // Idle: 8 frames ÷ 8 = 1 s per cycle
    this.anims.create({
      key: characterAssets.warrior.idle.animKey,
      frames: this.anims.generateFrameNumbers(
        characterAssets.warrior.idle.spritesheetKey,
        {
          start: 0,
          end: CHARACTER_FRAME_END,
        }
      ),
      frameRate: 8,
      repeat: -1,
    });

    // Run: 8 frames ÷ 12 ≈ 0.67 s per cycle (more dynamic)
    this.anims.create({
      key: characterAssets.warrior.run.animKey,
      frames: this.anims.generateFrameNumbers(
        characterAssets.warrior.run.spritesheetKey,
        {
          start: 0,
          end: CHARACTER_FRAME_END,
        }
      ),
      frameRate: 12,
      repeat: -1,
    });

    this.player.play(characterAssets.warrior.idle.animKey);

    // Cursor keys
    this.cursors = this.input.keyboard!.createCursorKeys();

    // Follow character with camera
    this.cameras.main.startFollow(this.player, true);
  }

  public update(): void {
    // Implement character movement state and keyboard configs
    if (this.isMoving) return;

    let nextTileX = this.character.position.tileX;
    let nextTileY = this.character.position.tileY;
    let direction: Direction | undefined = undefined;

    if (this.cursors.up.isDown || this.input.keyboard!.addKey("W").isDown) {
      nextTileY -= 1;
      direction = "up";
    } else if (
      this.cursors.down.isDown ||
      this.input.keyboard!.addKey("S").isDown
    ) {
      nextTileY += 1;
      direction = "down";
    } else if (
      this.cursors.left.isDown ||
      this.input.keyboard!.addKey("A").isDown
    ) {
      nextTileX -= 1;
      direction = "left";
    } else if (
      this.cursors.right.isDown ||
      this.input.keyboard!.addKey("D").isDown
    ) {
      nextTileX += 1;
      direction = "right";
    } else {
      return; // No input record
    }

    // Validate bounds (30x20 tiles) and character moving state = true
    if (nextTileX < 0 || nextTileX >= 30 || nextTileY < 0 || nextTileY >= 20) {
      return;
    }

    this.isMoving = true;
    this.player.play(characterAssets.warrior.run.animKey);

    const targetX = tileToPixel(nextTileX);
    const targetY = tileToPixel(nextTileY);

    this.tweens.add({
      targets: this.player,
      x: targetX,
      y: targetY,
      duration: MOVE_DURATION_MS,
      ease: "Linear",
      onComplete: () => {
        this.character.move(direction);
        this.isMoving = false;
        this.player.play(characterAssets.warrior.idle.animKey);
      },
    });
  }
}
