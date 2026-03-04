import { TILE_SIZE, mapAssets } from "@game/configs/map";
import type Phaser from "phaser";

/** Return type with map dimensions in tiles for bounds validation */
export type WorldMapBuildResult = {
  widthTiles: number;
  heightTiles: number;
};

export class WorldMap {
  public constructor(private readonly scene: Phaser.Scene) {}

  /** Creates tilemap, layer, physics/camera bounds, grid and returns dimensions */
  public build(): WorldMapBuildResult {
    const map = this.scene.make.tilemap({
      key: mapAssets.overworld.tilemap.key,
    });

    const tileset = map.addTilesetImage(
      mapAssets.overworld.tilesetName,
      mapAssets.overworld.tileset.key
    );

    if (!tileset) {
      throw new Error(
        'Tileset "Overworld" not found. Confirm name="Overworld" inside the Overworld.tsx file'
      );
    }

    map.createLayer("Terrain", tileset, 0, 0); // Renders Terrain layer from TMJ

    this.scene.physics.world.setBounds(
      0,
      0,
      map.widthInPixels,
      map.heightInPixels
    ); // Limits physics world to map size
    this.scene.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels,
      map.heightInPixels
    ); // Keeps camera within map bounds

    this.createGrid(map.widthInPixels, map.heightInPixels);

    return {
      widthTiles: map.width,
      heightTiles: map.height,
    }; // Dimensions for PlayerController bounds
  }

  /** Draws debug grid using TILE_SIZE */
  private createGrid(widthInPixels: number, heightInPixels: number): void {
    const grid = this.scene.add.grid(
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
}
