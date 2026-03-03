export type PrimaryAttribute =
  | "strength"
  | "dexterity"
  | "intelligence"
  | "vitality";

export type SecondaryAttribute = "maxHp" | "attack" | "defense" | "critChance";

export type PrimaryAttributes = Record<PrimaryAttribute, number>;
export type SecondaryAttributes = Record<SecondaryAttribute, number>;
