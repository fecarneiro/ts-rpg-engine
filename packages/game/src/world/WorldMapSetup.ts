import { TILE_SIZE, mapAssets } from "@game/configs/map";
import type Phaser from "phaser";

/** Return type with map dimensions in tiles for bounds validation */
export type WorldMapSetupBuildResult = {
  widthTiles: number;
  heightTiles: number;
};

export class WorldMapSetup {
  public constructor(private readonly scene: Phaser.Scene) {}

  /** Creates tilemap, layer, physics/camera bounds, grid and returns dimensions */
  public build(): WorldMapSetupBuildResult {
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

    this.createGrid(map.widthInPixels, map.heightInPixels);

    // Dimensions for PlayerController bounds
    return {
      widthTiles: map.width,
      heightTiles: map.height,
    };
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
