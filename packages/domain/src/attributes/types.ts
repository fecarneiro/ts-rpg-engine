export type PrimaryAttribute =
  | "strength"
  | "dexterity"
  | "intelligence"
  | "vitality";

export type SecondaryAttribute = "maxHp" | "attack" | "defense" | "critChance";

// {
//   strength: number;
//   dexterity: number;
//   intelligence: number;
//   vitality: number;
// }
export type PrimaryAttributes = Record<PrimaryAttribute, number>;

// {
//   maxHp: number;
//   attack: number;
//   defense: number;
//   critChance: number;
// }
export type SecondaryAttributes = Record<SecondaryAttribute, number>;
