import { Character } from "@domain/character/Character";
import type { Archetype } from "@domain/character/archetypes/Archetypes";
import type { Direction } from "@domain/character/direction/Direction";
import type { Position } from "@domain/character/position/Position";

export function createCharacter(
  nickname: string,
  archetype: Archetype,
  position: Position = { x: 0, y: 0 },
  direction: Direction = "down",
  level = 1
): Character {
  return new Character(nickname, archetype, position, direction, level);
}
