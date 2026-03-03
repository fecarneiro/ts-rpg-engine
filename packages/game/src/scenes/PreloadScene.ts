import { mapAssets } from "@game/maps/assets";
import Phaser from "phaser";

export const assetFrameConfig = {
  character192: { frameWidth: 192, frameHeight: 192 },
} as const;

export class PreloadScene extends Phaser.Scene {
  public constructor() {
    super("PreloadScene");
  }

  public preload(): void {
    const { overworld } = mapAssets;
    this.load.tilemapTiledJSON(overworld.tilemap.key, overworld.tilemap.url);
    this.load.image(overworld.tileset.key, overworld.tileset.url);

    const { warrior } = characterAssets;
    const frameConfig = assetFrameConfig.character192;

    this.load.spritesheet(
      warrior.idle.spritesheetKey,
      warrior.idle.url,
      frameConfig
    );

    this.load.spritesheet(
      warrior.run.spritesheetKey,
      warrior.run.url,
      frameConfig
    );
  }

  public create(): void {
    this.scene.start("WorldScene");
  }
}
