import type { PrimaryAttributes } from "@domain/character/attributes/PrimaryAttributes";

export type SecondaryAttribute = "maxHp" | "attack" | "defense";
export type SecondaryAttributes = Record<SecondaryAttribute, number>;

export function calculateSecondaryAttributes(
  primary: PrimaryAttributes
): SecondaryAttributes {
  return {
    maxHp: primary.vitality * 10,
    attack: primary.strength * 2,
    defense: primary.vitality * 2,
  };
}
