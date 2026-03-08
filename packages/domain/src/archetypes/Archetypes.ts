import { type PrimaryAttributes } from "@domain/attributes/types";

export type Archetype = "warrior" | "lancer" | "archer" | "monk";

export interface ArchetypePreset {
  archetype: Archetype;
  primaryAttributes: PrimaryAttributes;
}

const archetypePreset: Record<Archetype, ArchetypePreset> = {
  warrior: {
    archetype: "warrior",
    primaryAttributes: {
      strength: 5,
      dexterity: 1,
      intelligence: 1,
      vitality: 5,
    },
  },
  lancer: {
    archetype: "lancer",
    primaryAttributes: {
      strength: 3,
      dexterity: 5,
      intelligence: 1,
      vitality: 2,
    },
  },
  archer: {
    archetype: "archer",
    primaryAttributes: {
      strength: 2,
      dexterity: 6,
      intelligence: 1,
      vitality: 2,
    },
  },
  monk: {
    archetype: "monk",
    primaryAttributes: {
      strength: 1,
      dexterity: 1,
      intelligence: 8,
      vitality: 2,
    },
  },
};

export function getArchetypePreset(archetype: Archetype): ArchetypePreset {
  return archetypePreset[archetype];
}

console.log(getArchetypePreset("warrior"));
