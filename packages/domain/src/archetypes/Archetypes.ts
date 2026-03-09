import {
  createPrimaryAttributes,
  type PrimaryAttributes,
} from "@domain/attributes/primary";

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
        strength: 5,
        vitality: 5,
      }),
    },
  },
  lancer: {
    archetype: "lancer",
    attributes: {
      primary: createPrimaryAttributes({
        strength: 3,
        dexterity: 5,
        vitality: 2,
      }),
    },
  },
  archer: {
    archetype: "archer",
    attributes: {
      primary: createPrimaryAttributes({
        strength: 2,
        dexterity: 6,
        vitality: 2,
      }),
    },
  },
  monk: {
    archetype: "monk",
    attributes: {
      primary: createPrimaryAttributes({
        intelligence: 8,
        vitality: 2,
      }),
    },
  },
};

export function getArchetypePreset(archetype: Archetype): ArchetypePreset {
  return archetypePreset[archetype];
}
