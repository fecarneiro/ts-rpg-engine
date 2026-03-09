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
  public readonly nickname: string;
  public readonly archetype: Archetype;
  public readonly attributes: {
    primary: PrimaryAttributes;
    secondary: SecondaryAttributes;
  };
  public position: Position;
  public level: number;

  constructor(
    nickname: string,
    archetype: Archetype,
    position: Position = { x: 0, y: 0 },
    level: number = 1
  ) {
    const preset = getArchetypePreset(archetype);

    this.nickname = nickname;
    this.archetype = preset.archetype;
    this.attributes = {
      primary: createPrimaryAttributes(preset.attributes.primary),
      secondary: calculateSecondaryAttributes(preset.attributes.primary),
    };
    this.position = position;
    this.level = level;
  }

  public move(direction: Direction): void {
    this.position = applyMovement(this.position, direction);
  }
}
