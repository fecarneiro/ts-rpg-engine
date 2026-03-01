import { ASSET_KEYS } from "@game/scenes/PreloadScene";
import Phaser from "phaser";
/**
 * Roadmap (WorldScene) — suggested implementation order
 *
 * 1) Camera follow [next]
 *    - cameras.main.startFollow(player) to follow the character.
 *    - Optional: adjust zoom for pixel art.
 *
 * 2) Player animations
 *    - Configure idle and run from spritesheets.
 *    - Switch idle ↔ run based on isMoving.
 *
 * 3) Collision / walkability (when adding internal obstacles to the map)
 *    - Read "Colliders" layer from Tiled.
 *    - Convert rectangles into blocked tiles (e.g., Set of "x,y").
 *    - On movement validation, check if target tile is blocked.
 *    - Note: current bounds (0–29, 0–19) already prevent leaving the map; Colliders are for internal obstacles.
 */
const TILE_SIZE = 64;
const CHARACTER_SCALE = 0.75;
const MOVE_DURATION_MS = 180;

// Function to centralize sprite on tile
function tileToPixel(tile: number): number {
  return tile * TILE_SIZE + TILE_SIZE / 2;
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
    const map = this.make.tilemap({ key: ASSET_KEYS.TILED_MAP_OVERWORLD });

    const tileset = map.addTilesetImage(
      "Overworld",
      ASSET_KEYS.TILESET_MAP_IMAGE
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

    // Add character location + dimensions
    this.player = this.add.sprite(
      tileToPixel(this.playerTileX),
      tileToPixel(this.playerTileY),
      ASSET_KEYS.SPRITESHEET_WARRIOR_IDLE,
      0 // First character frame in spritesheet
    );

    this.player.setScale(CHARACTER_SCALE);

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

    // Character movement
    const targetX = tileToPixel(nextTileX);
    const targetY = tileToPixel(nextTileY);

    // Tweens (in-between)
    this.tweens.add({
      targets: this.player,
      x: targetX,
      y: targetY,
      duration: MOVE_DURATION_MS,
      ease: "Linear",
      onComplete: () => {
        this.playerTileX = nextTileX;
        this.playerTileY = nextTileY;
        this.isMoving = false;
      },
    });
  }
}
