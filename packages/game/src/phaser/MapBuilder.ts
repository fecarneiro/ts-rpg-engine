import { mapAssets } from "@game/configs/map";
import { createGrid } from "@game/phaser/GridBuilder";
import type Phaser from "phaser";

export type MapBuilderResult = {
  widthTiles: number;
  heightTiles: number;
};

export class MapBuilder {
  public constructor(private readonly scene: Phaser.Scene) {}

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
    map.createLayer("Terrain", tileset, 0, 0);

    this.scene.physics.world.setBounds(
      0,
      0,
      map.widthInPixels,
      map.heightInPixels
    );

    this.scene.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels,
      map.heightInPixels
    );

    createGrid(this.scene, map.widthInPixels, map.heightInPixels);

    return {
      widthTiles: map.width,
      heightTiles: map.height,
    };
  }
}
