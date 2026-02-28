/**
 * Centralized game configuration.
 * Single source of truth for constants, asset keys, and paths.
 */

export const ASSET_FRAME_CONFIG = {
  PLAYER: { frameWidth: 192, frameHeight: 192 },
  TILE: { frameWidth: 32, frameHeight: 32 },
} as const;

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
/** Top-left of original grass tile */
export const GRASS_TILE_FRAME = 40;

/** World = canvas (terrain fills screen, no green border) */
export const WORLD_WIDTH = CANVAS_WIDTH;
export const WORLD_HEIGHT = CANVAS_HEIGHT;

/** Grid for movement (derived from canvas / tile size) */
export const MAP_WIDTH_TILES = Math.floor(CANVAS_WIDTH / TILE_SIZE);
export const MAP_HEIGHT_TILES = Math.floor(CANVAS_HEIGHT / TILE_SIZE);

/** Player sprite */
export const PLAYER_FRAME_SIZE = 192;
export const PLAYER_WORLD_SIZE = TILE_SIZE * 6;
export const PLAYER_SCALE = PLAYER_WORLD_SIZE / PLAYER_FRAME_SIZE;

/** Movement */
export const STEP_DURATION_MS = 180;

/** Asset keys (used by Phaser to identify loaded assets) */
export const ASSET_KEYS = {
  PLAYER_IDLE_SHEET: "player_idle_sheet",
  PLAYER_RUN_SHEET: "player_run_sheet",
  TERRAIN_TILES: "terrain_tiles_color1",
} as const;

/** Asset file paths (for preload) */
export const ASSET_PATHS = {
  TERRAIN_TILES: "/assets/tiny-swords/terrain/tileset/Tilemap_color1.png",
} as const;

/** Character class IDs (must match core CharacterClass.characterClass) */
export type CharacterClassId = "warrior" | "lancer" | "archer" | "monk";
export type Action = "idle" | "run";

/** Paths to character sprites per class. Used to load the correct asset based on Character.characterClass. */
export const CHARACTER_ASSETS: Record<
  CharacterClassId,
  Record<Action, string>
> = {
  warrior: {
    idle: "/assets/tiny-swords/characters/warrior/Warrior_Idle.png",
    run: "/assets/tiny-swords/characters/warrior/Warrior_Run.png",
  },
  lancer: {
    idle: "/assets/tiny-swords/characters/lancer/Lancer_Idle.png",
    run: "/assets/tiny-swords/characters/lancer/Lancer_Run.png",
  },
  archer: {
    idle: "/assets/tiny-swords/characters/archer/Archer_Idle.png",
    run: "/assets/tiny-swords/characters/archer/Archer_Run.png",
  },
  monk: {
    idle: "/assets/tiny-swords/characters/monk/Idle.png",
    run: "/assets/tiny-swords/characters/monk/Run.png",
  },
} as const;

/** Gets the asset paths for a character class. */
export function getCharacterAssets(
  classId: CharacterClassId
): (typeof CHARACTER_ASSETS)[CharacterClassId] {
  return CHARACTER_ASSETS[classId];
}
