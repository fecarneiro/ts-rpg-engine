import type { Archetype } from "@domain/character/archetypes/Archetypes";

export type AnimationAsset = {
  spritesheetKey: string;
  animKey: string;
  url: string;
  frameEnd: number;
};

export type CharacterAsset = {
  id: Archetype;
  idle: AnimationAsset;
  run: AnimationAsset;
};

export const CHARACTER_ASSETS: CharacterAsset[] = [
  {
    id: "warrior",
    idle: {
      spritesheetKey: "spritesheet_warrior_idle",
      animKey: "warrior_idle",
      url: "/assets/characters/warrior/Warrior_Idle.png",
      frameEnd: 7,
    },
    run: {
      spritesheetKey: "spritesheet_warrior_run",
      animKey: "warrior_run",
      url: "/assets/characters/warrior/Warrior_Run.png",
      frameEnd: 5,
    },
  },
  {
    id: "lancer",
    idle: {
      spritesheetKey: "spritesheet_lancer_idle",
      animKey: "lancer_idle",
      url: "/assets/characters/lancer/Lancer_Idle.png",
      frameEnd: 9,
    },
    run: {
      spritesheetKey: "spritesheet_lancer_run",
      animKey: "lancer_run",
      url: "/assets/characters/lancer/Lancer_Run.png",
      frameEnd: 5,
    },
  },
];
