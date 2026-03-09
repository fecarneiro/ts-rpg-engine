import type { Direction } from "@domain/character/direction/Direction";
import type { Position } from "../position/Position";

const MovementOffsets: Record<Direction, Position> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

function getMovementOffset(direction: Direction): Position {
  const offset = MovementOffsets[direction];
  return { ...offset };
}

export function applyMovement(
  position: Position,
  direction: Direction
): Position {
  const offset = getMovementOffset(direction);
  return {
    x: position.x + offset.x,
    y: position.y + offset.y,
  };
}
