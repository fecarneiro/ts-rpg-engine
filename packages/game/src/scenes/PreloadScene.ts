import { CHARACTER_ASSETS } from "@game/configs/character";
import { MAP_ASSETS } from "@game/configs/map";
import { UI_ASSETS } from "@game/configs/ui";
import Phaser from "phaser";

export class PreloadScene extends Phaser.Scene {
  public constructor() {
    super("PreloadScene");
  }

  public preload(): void {
    // Load map assets
    const worldMap = MAP_ASSETS.worldMap;
    this.load.tilemapTiledJSON(worldMap.tilemap.key, worldMap.tilemap.url);
    this.load.image(worldMap.tileset.key, worldMap.tileset.url);

    // Load character assets (each has its own frame size, e.g. Warrior 192x192, Lancer 320x320)
    for (const asset of CHARACTER_ASSETS) {
      this.load.spritesheet(asset.idle.spritesheetKey, asset.idle.url, {
        frameWidth: asset.idle.frameWidth,
        frameHeight: asset.idle.frameHeight,
      });
      this.load.spritesheet(asset.run.spritesheetKey, asset.run.url, {
        frameWidth: asset.run.frameWidth,
        frameHeight: asset.run.frameHeight,
      });
    }

    // Load UI assets
    for (const asset of Object.values(UI_ASSETS)) {
      this.load.image(asset.key, asset.url);
    }
  }

  public create(): void {
    this.scene.start("WorldScene");
  }
}
