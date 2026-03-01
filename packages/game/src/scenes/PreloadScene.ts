import Phaser from "phaser";

export const ASSET_KEYS = {
  // Tiled
  TILED_MAP_OVERWORLD: "map_overworld",
  TILESET_IMAGE_TINY_SWORDS_TERRAIN: "tileset_tiny_swords_terrain",

  // Character
  SPRITESHEET_WARRIOR_IDLE: "spritesheet_warrior_idle",
  SPRITESHEET_WARRIOR_RUN: "spritesheet_warrior_run",
} as const;

export const ASSET_URLS = {
  // Tiled
  TILED_MAP_OVERWORLD: "/assets/maps/overworld.tmj",
  TILESET_IMAGE_TINY_SWORDS_TERRAIN: "/assets/terrains/Tilemap_color2.png",

  // Character
  WARRIOR: {
    IDLE: "/assets/characters/warrior/Warrior_Idle.png",
    RUN: "/assets/characters/warrior/Warrior_Run.png",
  },
} as const;

export const ASSET_FRAME_CONFIG = {
  CHARACTER_192: { frameWidth: 192, frameHeight: 192 },
} as const;

export class PreloadScene extends Phaser.Scene {
  public constructor() {
    super("PreloadScene");
  }

  public preload(): void {
    // Map data (Tiled)
    this.load.tilemapTiledJSON(
      ASSET_KEYS.TILED_MAP_OVERWORLD,
      ASSET_URLS.TILED_MAP_OVERWORLD
    );

    // Tileset image used by the map
    this.load.image(
      ASSET_KEYS.TILESET_IMAGE_TINY_SWORDS_TERRAIN,
      ASSET_URLS.TILESET_IMAGE_TINY_SWORDS_TERRAIN
    );

    // Character spritesheets
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
}
