import {
  createPrimaryAttributes,
  type PrimaryAttributes,
} from "@domain/character/attributes/PrimaryAttributes";

export type Archetype = "warrior" | "lancer" | "archer" | "monk";

export interface ArchetypePreset {
  archetype: Archetype;
  attributes: {
    primary: PrimaryAttributes;
  };
}

const archetypePreset: Record<Archetype, ArchetypePreset> = {
  warrior: {
    archetype: "warrior",
    attributes: {
      primary: createPrimaryAttributes({
        strength: 2,
        vitality: 3,
      }),
    },
  },
  lancer: {
    archetype: "lancer",
    attributes: {
      primary: createPrimaryAttributes({
        strength: 3,
        vitality: 2,
      }),
    },
  },
  archer: {
    archetype: "archer",
    attributes: {
      primary: createPrimaryAttributes({
        strength: 3,
        vitality: 2,
      }),
    },
  },
  monk: {
    archetype: "monk",
    attributes: {
      primary: createPrimaryAttributes({
        intelligence: 3,
        vitality: 2,
      }),
    },
  },
};

export function getArchetypePreset(archetype: Archetype): ArchetypePreset {
  return archetypePreset[archetype];
}
