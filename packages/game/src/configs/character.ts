import type { Archetype } from "@domain/character/archetypes/Archetypes";

export type AnimationAsset = {
  spritesheetKey: string;
  animKey: string;
  url: string;
  frameEnd: number;
  frameWidth: number;
  frameHeight: number;
};

export type CharacterAsset = {
  id: Archetype;
  idle: AnimationAsset;
  run: AnimationAsset;
  attack: AnimationAsset;
};

export const CHARACTER_ASSETS: CharacterAsset[] = [
  {
    id: "warrior",
    idle: {
      spritesheetKey: "spritesheet_warrior_idle",
      animKey: "warrior_idle",
      url: "/assets/characters/warrior/Warrior_Idle.png",
      frameEnd: 7,
      frameWidth: 192,
      frameHeight: 192,
    },
    run: {
      spritesheetKey: "spritesheet_warrior_run",
      animKey: "warrior_run",
      url: "/assets/characters/warrior/Warrior_Run.png",
      frameEnd: 5,
      frameWidth: 192,
      frameHeight: 192,
    },
    attack: {
      spritesheetKey: "spritesheet_warrior_attack",
      animKey: "warrior_attack",
      url: "/assets/characters/warrior/Warrior_Attack1.png",
      frameEnd: 9,
      frameWidth: 192,
      frameHeight: 192,
    },
  },
  {
    id: "lancer",
    idle: {
      spritesheetKey: "spritesheet_lancer_idle",
      animKey: "lancer_idle",
      url: "/assets/characters/lancer/Lancer_Idle.png",
      frameEnd: 9,
      frameWidth: 320,
      frameHeight: 320,
    },
    run: {
      spritesheetKey: "spritesheet_lancer_run",
      animKey: "lancer_run",
      url: "/assets/characters/lancer/Lancer_Run.png",
      frameEnd: 5,
      frameWidth: 320,
      frameHeight: 320,
    },
    attack: {
      spritesheetKey: "spritesheet_lancer_attack",
      animKey: "lancer_attack",
      url: "/assets/characters/lancer/Lancer_Right_Attack.png",
      frameEnd: 9,
      frameWidth: 320,
      frameHeight: 320,
    },
  },
];
