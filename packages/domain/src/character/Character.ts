import {
  getArchetypePreset,
  type Archetype,
} from "@domain/archetypes/Archetypes";
import {
  createPrimaryAttributes,
  type PrimaryAttributes,
} from "@domain/attributes/primary";

export class Character {
  public readonly archetype: Archetype;
  public readonly attributes: {
    primary: PrimaryAttributes;
  };

  constructor(archetype: Archetype) {
    const preset = getArchetypePreset(archetype);

    this.archetype = preset.archetype;
    this.attributes = {
      primary: createPrimaryAttributes(preset.attributes.primary),
    };
  }
}
