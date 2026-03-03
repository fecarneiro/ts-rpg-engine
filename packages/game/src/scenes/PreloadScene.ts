import {
  CHARACTER_FRAME_CONFIG,
  characterAssets,
} from "@game/configs/character";
import { mapAssets } from "@game/configs/map";
import Phaser from "phaser";

export class PreloadScene extends Phaser.Scene {
  public constructor() {
    super("PreloadScene");
  }

  public preload(): void {
    const { overworld } = mapAssets;
    this.load.tilemapTiledJSON(overworld.tilemap.key, overworld.tilemap.url);
    this.load.image(overworld.tileset.key, overworld.tileset.url);

    const { warrior } = characterAssets;

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
