import {
  getArchetypePreset,
  type Archetype,
} from "@domain/character/archetypes/Archetypes";
import {
  createPrimaryAttributes,
  type PrimaryAttributes,
} from "@domain/character/attributes/PrimaryAttributes";
import {
  calculateSecondaryAttributes,
  type SecondaryAttributes,
} from "@domain/character/attributes/SecondaryAttributs";
import type { Direction } from "./movement/Direction";

export class Character {
  public readonly archetype: Archetype;
  public readonly attributes: {
    primary: PrimaryAttributes;
    secondary: SecondaryAttributes;
  };

  constructor(archetype: Archetype) {
    const preset = getArchetypePreset(archetype);

    this.archetype = preset.archetype;
    this.attributes = {
      primary: createPrimaryAttributes(preset.attributes.primary),
      secondary: calculateSecondaryAttributes(preset.attributes.primary),
    };
  }
  move(direction: Direction) {
    this.position = this.position.move(direction);
  }
}
