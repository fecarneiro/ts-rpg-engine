import type { WalkabilityChecker } from "@application/character/WalkabilityChecker";
import type { Character } from "@domain/character/Character";
import type { Direction } from "@domain/character/direction/Direction";
import { applyMovement } from "@domain/character/movement/Movement";

export type { WalkabilityChecker };

export function tryMove(
  character: Character,
  direction: Direction,
  checker: WalkabilityChecker
): boolean {
  const next = applyMovement(character.position, direction);
  if (checker.isWalkable(next.x, next.y)) {
    character.move(direction);
    return true;
  }
  return false;
}
