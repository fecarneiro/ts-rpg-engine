import { CHARACTER_FRAME_CONFIG } from "@game/configs/constants";
import { characterAssets } from "@game/configs/character";
import { mapAssets } from "@game/configs/map";
import Phaser from "phaser";

export class PreloadScene extends Phaser.Scene {
  public constructor() {
    super("PreloadScene");
  }

  public preload(): void {
    const worldMap = mapAssets.worldMap;
    this.load.tilemapTiledJSON(worldMap.tilemap.key, worldMap.tilemap.url);
    this.load.image(worldMap.tileset.key, worldMap.tileset.url);

    for (const asset of characterAssets) {
      this.load.spritesheet(asset.idle.spritesheetKey, asset.idle.url, CHARACTER_FRAME_CONFIG);
      this.load.spritesheet(asset.run.spritesheetKey, asset.run.url, CHARACTER_FRAME_CONFIG);
    }
  }

  public create(): void {
    this.scene.start("WorldScene");
  }
}
