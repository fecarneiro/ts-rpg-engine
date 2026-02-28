import { type PrimaryAttributes } from "@core/attributes";

export interface CharacterClass {
  characterClass: "warrior" | "lancer" | "archer" | "monk";
  primaryAttributes: PrimaryAttributes;
}

export const WARRIOR: CharacterClass = {
  characterClass: "warrior",
  primaryAttributes: {
    strength: 1,
    dexterity: 1,
    intelligence: 1,
    vitality: 1,
  },
};

export const LANCER: CharacterClass = {
  characterClass: "lancer",
  primaryAttributes: {
    strength: 1,
    dexterity: 1,
    intelligence: 1,
    vitality: 1,
  },
};

export const ARCHER: CharacterClass = {
  characterClass: "archer",
  primaryAttributes: {
    strength: 1,
    dexterity: 1,
    intelligence: 1,
    vitality: 1,
  },
};

export const MONK: CharacterClass = {
  characterClass: "warrior",
  primaryAttributes: {
    strength: 1,
    dexterity: 1,
    intelligence: 1,
    vitality: 1,
  },
};
