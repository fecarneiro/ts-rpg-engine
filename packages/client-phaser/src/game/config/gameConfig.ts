/**
 * Centralized game configuration.
 * Single source of truth for constants, asset keys, and paths.
 */

/** Registry keys (shared state between scenes) */
export const REGISTRY_KEYS = {
  PLAYER_CHARACTER: "playerCharacter",
} as const;

/** HUD panel (top-left corner) */
export const HUD_PANEL = {
  X: 16,
  Y: 16,
  WIDTH: 120,
  HP_BAR_HEIGHT: 8,
  PADDING: 8,
  BG_COLOR: 0x1a1a1a,
  BG_ALPHA: 0.8,
  HP_BAR_BG_COLOR: 0x330000,
  HP_BAR_FILL_COLOR: 0xff0000,
} as const;

/** Floating HP bar (above character) */
export const HP_BAR_FLOATING = {
  WIDTH: 48,
  HEIGHT: 6,
  OFFSET_Y: -40,
  BG_COLOR: 0x330000,
  FILL_COLOR: 0x00ff00,
} as const;

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
export const PLAYER_WORLD_SIZE = TILE_SIZE * 4;
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
