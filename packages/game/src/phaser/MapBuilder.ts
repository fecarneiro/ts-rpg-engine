import { mapAssets } from "@game/configs/map";
import { createGrid } from "@game/phaser/GridBuilder";
import type Phaser from "phaser";

/** Return type with map dimensions in tiles for bounds validation */
export type MapBuilderResult = {
  widthTiles: number;
  heightTiles: number;
};

export class MapBuilder {
  public constructor(private readonly scene: Phaser.Scene) {}

  /** Creates tilemap, layer, physics/camera bounds, grid and returns dimensions */
  public build(): MapBuilderResult {
    const map = this.scene.make.tilemap({
      key: mapAssets.worldMap.tilemap.key,
    });

    const tileset = map.addTilesetImage(
      mapAssets.worldMap.tilesetName,
      mapAssets.worldMap.tileset.key
    );

    if (!tileset) {
      throw new Error(
        'Tileset "WorldMap" not found. Confirm name="WorldMap" inside the WorldMap.tmj file'
      );
    }
    // Renders Terrain layer from TMJ
    map.createLayer("Terrain", tileset, 0, 0);

    // Limits physics world to map size
    this.scene.physics.world.setBounds(
      0,
      0,
      map.widthInPixels,
      map.heightInPixels
    );

    // Keeps camera within map bounds
    this.scene.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels,
      map.heightInPixels
    );

    createGrid(this.scene, map.widthInPixels, map.heightInPixels);

    // Dimensions for PlayerController bounds
    return {
      widthTiles: map.width,
      heightTiles: map.height,
    };
  }
}
