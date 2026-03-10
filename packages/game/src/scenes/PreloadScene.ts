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

    const warrior = characterAssets.warrior;

    const characterFrameConfig = CHARACTER_FRAME_CONFIG;

    this.load.spritesheet(
      warrior.idle.spritesheetKey,
      warrior.idle.url,
      characterFrameConfig
    );

    this.load.spritesheet(
      warrior.run.spritesheetKey,
      warrior.run.url,
      characterFrameConfig
    );
  }

  public create(): void {
    this.scene.start("WorldScene");
  }
}
