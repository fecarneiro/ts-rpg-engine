import { assetKeys, characterAssets } from "@game/scenes/PreloadScene";
import Phaser from "phaser";
/**
 * Roadmap (WorldScene) — suggested implementation order
 *
 * 3) Collision / walkability (when adding internal obstacles to the map)
 *    - Read "Colliders" layer from Tiled.
 *    - Convert rectangles into blocked tiles (e.g., Set of "x,y").
 *    - On movement validation, check if target tile is blocked.
 *    - Note: current bounds (0–29, 0–19) already prevent leaving the map; Colliders are for internal obstacles.
 */
const tileSize = 64;
const characterScale = 0.75;
const moveDurationMs = 180;
const characterFrameEnd = 7;

function tileToPixel(tile: number): number {
  return tile * tileSize + tileSize / 2;
}

export class WorldScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  private playerTileX = 2;
  private playerTileY = 2;
  private isMoving = false;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  public constructor() {
    super("WorldScene");
  }

  public create(): void {
    // Create map + boundary limits
    const map = this.make.tilemap({ key: assetKeys.tiledMapOverworld });

    const tileset = map.addTilesetImage("Overworld", assetKeys.tilesetMapImage);

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
      tileSize,
      tileSize,
      0,
      0
    );
    grid.setOrigin(0, 0);
    grid.setOutlineStyle(0xffffff, 0.25);
    grid.setDepth(0.5);

    const warrior = characterAssets.warrior;

    // Add character location + dimensions
    this.player = this.add.sprite(
      tileToPixel(this.playerTileX),
      tileToPixel(this.playerTileY),
      warrior.idle.spritesheetKey,
      0 // First character frame in spritesheet
    );

    this.player.setScale(characterScale);

    // Idle: 8 frames ÷ 8 = 1 s per cycle
    this.anims.create({
      key: warrior.idle.animKey,
      frames: this.anims.generateFrameNumbers(warrior.idle.spritesheetKey, {
        start: 0,
        end: characterFrameEnd,
      }),
      frameRate: 8,
      repeat: -1,
    });

    // Run: 8 frames ÷ 12 ≈ 0.67 s per cycle (more dynamic)
    this.anims.create({
      key: warrior.run.animKey,
      frames: this.anims.generateFrameNumbers(warrior.run.spritesheetKey, {
        start: 0,
        end: characterFrameEnd,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.player.play(warrior.idle.animKey);

    // Cursor keys
    this.cursors = this.input.keyboard!.createCursorKeys();

    // Follow character with camera
    this.cameras.main.startFollow(this.player, true);
  }

  public update(): void {
    // Implement character movement state and keyboard configs
    if (this.isMoving) return;

    let nextTileX = this.playerTileX;
    let nextTileY = this.playerTileY;

    if (this.cursors.up.isDown || this.input.keyboard!.addKey("W").isDown) {
      nextTileY -= 1;
    } else if (
      this.cursors.down.isDown ||
      this.input.keyboard!.addKey("S").isDown
    ) {
      nextTileY += 1;
    } else if (
      this.cursors.left.isDown ||
      this.input.keyboard!.addKey("A").isDown
    ) {
      nextTileX -= 1;
    } else if (
      this.cursors.right.isDown ||
      this.input.keyboard!.addKey("D").isDown
    ) {
      nextTileX += 1;
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
      duration: moveDurationMs,
      ease: "Linear",
      onComplete: () => {
        this.playerTileX = nextTileX;
        this.playerTileY = nextTileY;
        this.isMoving = false;
        this.player.play(characterAssets.warrior.idle.animKey);
      },
    });
  }
}
