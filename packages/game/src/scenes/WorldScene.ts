import { ASSET_KEYS } from "@game/scenes/PreloadScene";
import Phaser from "phaser";
/**
 *
 * 3) Camera setup
 *    - Set camera bounds to prevent scrolling outside the map.
 *    - Optionally follow the player (camera.startFollow(player)).
 *    - Optionally adjust zoom for pixel art readability.
 *
 * 4) Collision / walkability (Tiled object layer)
 *    - Read the "Colliders" object layer from Tiled.
 *    - Convert collider rectangles into blocked grid tiles (e.g., Set of "x,y").
 *    - Before moving 1 tile, validate the next tile is not blocked.
 *
 * 5) Player creation
 *    - Spawn the player at a grid position (tileX/tileY) and convert to pixels (tile -> world coords).
 *    - Configure animations (idle/run) from spritesheets.
 *    - Note: sprite size (e.g., 192x192) is visual; collision/hitbox is usually smaller (feet area).
 *
 * 6) Grid movement (1 tile per step)
 *    - Read input (WASD/Arrows).
 *    - Compute next tile coordinate.
 *    - If walkable, tween/move exactly TILE_SIZE pixels to the next tile.
 *    - Lock input while moving to avoid overlapping moves.
 *
 * Typical lifecycle usage:
 * - create(): build map, camera, player, collision data structures
 * - update(): handle input, step movement, animation state updates
 */

export class WorldScene extends Phaser.Scene {
  public constructor() {
    super("WorldScene");
  }

  public create(): void {
    // Create the tilemap.
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
    // Boundary limits for map and camera
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }
}
