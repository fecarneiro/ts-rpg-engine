import { clamp01 } from "@domain/utils/clamp";
import type { PrimaryAttributes } from "./primary";

export type SecondaryAttribute = "maxHp" | "attack" | "defense" | "critChance";

export type SecondaryAttributes = Record<SecondaryAttribute, number>;

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
