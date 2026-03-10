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

export interface CharacterProps {
  id: string;
  archetype: Archetype;
  position: Position;
  level: number;
  direction: Direction;
}

export class Character implements CharacterProps {
  public readonly id: string;
  public readonly archetype: Archetype;
  public readonly attributes: {
    primary: PrimaryAttributes;
    secondary: SecondaryAttributes;
  };
  public position: Position;
  public direction: Direction;
  public level: number;

  constructor(
    id: string,
    archetype: Archetype,
    position: Position = { x: 0, y: 0 },
    direction: Direction = "down",
    level: number = 1
  ) {
    const preset = getArchetypePreset(archetype);

    this.id = id;
    this.archetype = preset.archetype;
    this.attributes = {
      primary: createPrimaryAttributes(preset.attributes.primary),
      secondary: calculateSecondaryAttributes(preset.attributes.primary),
    };
    this.position = position;
    this.direction = direction;
    this.level = level;
  }

  public move(direction: Direction): void {
    this.position = applyMovement(this.position, direction);
    this.direction = direction;
  }
}

export function createCharacter(
  id: string,
  archetype: Archetype,
  position: Position = { x: 0, y: 0 },
  direction: Direction = "down",
  level = 1
): Character {
  return new Character(id, archetype, position, direction, level);
}
