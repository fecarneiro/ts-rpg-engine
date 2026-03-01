import { ASSET_KEYS } from "@game/scenes/PreloadScene";

export class WorldScene extends Phaser.Scene {
  public constructor() {
    super("WorldScene");
  }

  public create(): void {
    this.add.image(500, 500, ASSET_KEYS.TERRAIN);
  }
}
