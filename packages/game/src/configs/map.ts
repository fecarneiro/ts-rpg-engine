export const TILE_SIZE = 64;

export const mapAssets = {
  overworld: {
    tilesetName: "Overworld",
    tilemap: {
      key: "tiled_map_overworld",
      url: "/assets/terrains/Overworld.tmj",
    },
    tileset: {
      key: "tileset_map_image",
      url: "/assets/terrains/Tilemap_color2.png",
    },
  },
} as const;

export function tileToPixel(tile: number): number {
  return tile * TILE_SIZE + TILE_SIZE / 2;
}
