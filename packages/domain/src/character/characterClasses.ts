import { type PrimaryAttributes } from "@core/attributes";

export interface CharacterClass {
  characterClass: "warrior" | "lancer" | "archer" | "monk";
  primaryAttributes: PrimaryAttributes;
}

export const WARRIOR: CharacterClass = {
  characterClass: "warrior",
  primaryAttributes: {
    strength: 5,
    dexterity: 1,
    intelligence: 1,
    vitality: 5,
  },
};

export const LANCER: CharacterClass = {
  characterClass: "lancer",
  primaryAttributes: {
    strength: 3,
    dexterity: 5,
    intelligence: 1,
    vitality: 2,
  },
};

export const ARCHER: CharacterClass = {
  characterClass: "archer",
  primaryAttributes: {
    strength: 2,
    dexterity: 6,
    intelligence: 1,
    vitality: 2,
  },
};

export const MONK: CharacterClass = {
  characterClass: "monk",
  primaryAttributes: {
    strength: 1,
    dexterity: 1,
    intelligence: 8,
    vitality: 2,
  },
};
