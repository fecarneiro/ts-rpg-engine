import { type PrimaryAttributes } from "./types";

const DEFAULT_VALUE = 1;

export function createPrimaryAttributes(
  partial: Partial<PrimaryAttributes> = {}
): PrimaryAttributes {
  return {
    strength: partial.strength ?? DEFAULT_VALUE,
    dexterity: partial.dexterity ?? DEFAULT_VALUE,
    intelligence: partial.intelligence ?? DEFAULT_VALUE,
    vitality: partial.vitality ?? DEFAULT_VALUE,
  };
}

export function addPrimaryModifiers(
  base: PrimaryAttributes,
  modifiers: Partial<PrimaryAttributes>
): PrimaryAttributes {
  return {
    strength: base.strength + (modifiers.strength ?? 0),
    dexterity: base.dexterity + (modifiers.dexterity ?? 0),
    intelligence: base.intelligence + (modifiers.intelligence ?? 0),
    vitality: base.vitality + (modifiers.vitality ?? 0),
  };
}
