import { TILE_SIZE } from "@game/configs/constants";

export function tileToPixel(tile: number): number {
  return tile * TILE_SIZE + TILE_SIZE / 2;
}

export function pixelToTile(pixel: number): number {
  return Math.floor(pixel / TILE_SIZE);
}
