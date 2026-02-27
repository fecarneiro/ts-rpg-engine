import { type PrimaryAttributes, type SecondaryAttributes } from "./types";
import { clamp01 } from "../utils/clamp";

export function calculateSecondaryAttributes(
  primary: PrimaryAttributes
): SecondaryAttributes {
  return {
    maxHp: primary.vitality * 10,
    attack: primary.strength * 2 + primary.dexterity,
    defense: primary.vitality * 2,
    critChance: clamp01(primary.dexterity * 0.01),
  };
}
