import Phaser from "phaser";

export const ASSET_KEYS = {
  TERRAIN: "terrain",
};

export const ASSET_URLS = {
  TERRAIN: "/assets/terrain/Tilemap_color1.png",
};

export class PreloadScene extends Phaser.Scene {
  public constructor() {
    super("PreloadScene");
  }

  public preload(): void {
    this.load.image(ASSET_KEYS.TERRAIN, ASSET_URLS.TERRAIN);
  }
}
