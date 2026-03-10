import { TILE_SIZE } from "@game/configs/map";
import type Phaser from "phaser";

/** Draws debug grid using TILE_SIZE. Receives scene explicitly — pure function, no `this`. */
export function createGrid(
  scene: Phaser.Scene,
  widthInPixels: number,
  heightInPixels: number
): void {
  const grid = scene.add.grid(
    0,
    0,
    widthInPixels,
    heightInPixels,
    TILE_SIZE,
    TILE_SIZE,
    0,
    0
  );

  grid.setOrigin(0, 0);
  grid.setOutlineStyle(0xffffff, 0.25);
  grid.setDepth(0.5);
}
