/**
 * TMJ (Tiled Map JSON): Layout blueprint — tile positions, colliders, layers. Defines which tile goes where via tile IDs.
 * PNG: Visual tileset — sprite sheet with the actual pixel art for each tile.The TMJ references this image and maps tile IDs to regions within it.
 */
export const mapAssets = {
  worldMap: {
    tilesetName: "WorldMap",
    tilemap: {
      key: "world_map_tiled_map_json",
      url: "/assets/terrains/WorldMap.tmj",
    },
    tileset: {
      key: "world_map_tileset_image",
      url: "/assets/terrains/WorldMap.png",
    },
  },
} as const;
