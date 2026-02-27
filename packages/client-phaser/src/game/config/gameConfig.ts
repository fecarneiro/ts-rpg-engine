/**
 * Centralized game configuration.
 * Single source of truth for constants, asset keys, and paths.
 */

/** Canvas dimensions */
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

/** Tile and map (32px = shorter steps, Pokémon/Tibia feel) */
export const TILE_SIZE = 32;
/** Top-left of original grass tile (frame 10 in 64x64 → ~40 in 32x32) */
export const GRASS_TILE_FRAME = 40;

/** World = canvas (terrain fills screen, no green border) */
export const WORLD_WIDTH = CANVAS_WIDTH;
export const WORLD_HEIGHT = CANVAS_HEIGHT;

/** Grid for movement (derived from canvas / tile size) */
export const MAP_WIDTH_TILES = Math.floor(CANVAS_WIDTH / TILE_SIZE);
export const MAP_HEIGHT_TILES = Math.floor(CANVAS_HEIGHT / TILE_SIZE);

/** Player sprite */
export const PLAYER_FRAME_SIZE = 192;
export const PLAYER_WORLD_SIZE = 96;
export const PLAYER_SCALE = PLAYER_WORLD_SIZE / PLAYER_FRAME_SIZE;

/** Movement */
export const STEP_DURATION_MS = 180;

/** Asset keys */
export const ASSET_KEYS = {
  PLAYER_IDLE_SHEET: "player_idle_sheet",
  PLAYER_RUN_SHEET: "player_run_sheet",
  TERRAIN_TILES: "terrain_tiles_color2",
} as const;

/** Asset paths and frame config */
export const ASSET_PATHS = {
  PLAYER_IDLE: "/assets/tiny-swords/characters/player/Warrior_Idle.png",
  PLAYER_RUN: "/assets/tiny-swords/characters/player/Warrior_Run.png",
  TERRAIN_TILES: "/assets/tiny-swords/terrain/tileset/Tilemap_color2.png",
} as const;

export const ASSET_FRAME_CONFIG = {
  PLAYER: { frameWidth: 192, frameHeight: 192 },
  TILE: { frameWidth: 32, frameHeight: 32 },
} as const;
