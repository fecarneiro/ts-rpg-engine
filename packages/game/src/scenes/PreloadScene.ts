import Phaser from "phaser";

export const ASSET_KEYS = {
  // Tiled map data (JSON/TMJ): contains layers, tile indices, object layers (Colliders), etc.
  TILED_MAP_OVERWORLD: "tiled_map_overworld",

  // Tileset PNG (image): contains the actual pixels for the tiles used by the map.
  TILESET_MAP_IMAGE: "tileset_map_image",

  // Character spritesheets (animation frames).
  SPRITESHEET_WARRIOR_IDLE: "spritesheet_warrior_idle",
  SPRITESHEET_WARRIOR_RUN: "spritesheet_warrior_run",
} as const;

export const ASSET_URLS = {
  /* Tile size: 64x64
   * Width 30 tiles x 64 = 1920px
   * Height 20 tiles x 64 = 1280px
   * Physical world (0,0) to (1920,1280) */
  TILED_MAP_OVERWORLD: "/assets/terrains/Overworld.tmj",
  TILESET_MAP_IMAGE: "/assets/terrains/Tilemap_color2.png",

  WARRIOR: {
    IDLE: "/assets/characters/warrior/Warrior_Idle.png",
    RUN: "/assets/characters/warrior/Warrior_Run.png",
  },
} as const;

export const ASSET_FRAME_CONFIG = {
  // Warrior frames are 192x192 px in this pack.
  CHARACTER_192: { frameWidth: 192, frameHeight: 192 },
} as const;

export class PreloadScene extends Phaser.Scene {
  public constructor() {
    super("PreloadScene");
  }

  public preload(): void {
    // Preload = "download + cache assets"
    // Nothing is drawn here yet; we are only loading into Phaser's cache.

    // Load Tiled map data (layout + layers + object layers).
    this.load.tilemapTiledJSON(
      ASSET_KEYS.TILED_MAP_OVERWORLD,
      ASSET_URLS.TILED_MAP_OVERWORLD
    );

    // Load tileset PNG as an image (tilesets are images, not spritesheets).
    this.load.image(ASSET_KEYS.TILESET_MAP_IMAGE, ASSET_URLS.TILESET_MAP_IMAGE);

    this.load.spritesheet(
      ASSET_KEYS.SPRITESHEET_WARRIOR_IDLE,
      ASSET_URLS.WARRIOR.IDLE,
      ASSET_FRAME_CONFIG.CHARACTER_192
    );

    this.load.spritesheet(
      ASSET_KEYS.SPRITESHEET_WARRIOR_RUN,
      ASSET_URLS.WARRIOR.RUN,
      ASSET_FRAME_CONFIG.CHARACTER_192
    );
  }

  // Once assets are loaded, start the main gameplay scene.
  public create(): void {
    this.scene.start("WorldScene");
  }
}
