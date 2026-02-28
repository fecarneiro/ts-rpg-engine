import { type PrimaryAttributes } from "@core/attributes";

export interface CharacterClass {
  characterClass: "warrior" | "mage" | "archer" | "priest";
  primaryAttributes: PrimaryAttributes;
}

export const WARRIOR: CharacterClass = {
  characterClass: "warrior",
  primaryAttributes: {
    strength: 10,
    dexterity: 10,
    intelligence: 10,
    vitality: 10,
  },
};
