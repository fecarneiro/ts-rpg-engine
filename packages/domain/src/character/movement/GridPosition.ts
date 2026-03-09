import type { Direction } from "@domain/character/movement/Direction";

export interface GridOffset {
  x: number;
  y: number;
}

const DirectionOffsets: Record<Direction, GridOffset> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export function getDirectionOffset(direction: Direction): GridOffset {
  const offset = DirectionOffsets[direction];
  return { ...offset };
}
