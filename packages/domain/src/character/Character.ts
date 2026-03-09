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
import type { Direction } from "@domain/character/direction/Direction";
import { applyMovement } from "@domain/character/movement/Movement";
import type { Position } from "@domain/character/position/Position";

export class Character {
  public readonly archetype: Archetype;
  public readonly attributes: {
    primary: PrimaryAttributes;
    secondary: SecondaryAttributes;
  };
  public position: Position;

  constructor(archetype: Archetype, position: Position = { x: 0, y: 0 }) {
    const preset = getArchetypePreset(archetype);

    this.archetype = preset.archetype;
    this.attributes = {
      primary: createPrimaryAttributes(preset.attributes.primary),
      secondary: calculateSecondaryAttributes(preset.attributes.primary),
    };
    this.position = position;
  }
  public move(direction: Direction): void {
    this.position = applyMovement(this.position, direction);
  }
}
