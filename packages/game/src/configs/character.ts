export const CHARACTER_SCALE = 0.75;
export const MOVE_DURATION_MS = 180;
export const CHARACTER_FRAME_END = 7;

export const CHARACTER_FRAME_CONFIG = {
  frameWidth: 192,
  frameHeight: 192,
} as const;

export const characterAssets = {
  warrior: {
    idle: {
      spritesheetKey: "spritesheet_warrior_idle",
      animKey: "warrior_idle",
      url: "/assets/characters/warrior/Warrior_Idle.png",
    },
    run: {
      spritesheetKey: "spritesheet_warrior_run",
      animKey: "warrior_run",
      url: "/assets/characters/warrior/Warrior_Run.png",
    },
  },
} as const;
