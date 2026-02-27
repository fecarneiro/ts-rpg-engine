import {
  ASSET_FRAME_CONFIG,
  ASSET_KEYS,
  ASSET_PATHS,
} from "@client/game/config/gameConfig";
import Phaser from "phaser";

export class PreloadScene extends Phaser.Scene {
  public constructor() {
    super("PreloadScene");
  }

  public preload(): void {
    this.load.spritesheet(
      ASSET_KEYS.PLAYER_IDLE_SHEET,
      ASSET_PATHS.PLAYER_IDLE,
      ASSET_FRAME_CONFIG.PLAYER
    );

    this.load.spritesheet(
      ASSET_KEYS.PLAYER_RUN_SHEET,
      ASSET_PATHS.PLAYER_RUN,
      ASSET_FRAME_CONFIG.PLAYER
    );

    this.load.spritesheet(
      ASSET_KEYS.TERRAIN_TILES,
      ASSET_PATHS.TERRAIN_TILES,
      ASSET_FRAME_CONFIG.TILE
    );
  }

  public create(): void {
    this.scene.start("WorldScene");
  }
}
