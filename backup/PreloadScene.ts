import {
  ASSET_FRAME_CONFIG,
  ASSET_KEYS,
  ASSET_PATHS,
  getCharacterAssets,
  REGISTRY_KEYS,
} from "@client/config/gameConfig";
import type { Character } from "@rpg/core";
import Phaser from "phaser";

export class PreloadScene extends Phaser.Scene {
  public constructor() {
    super("PreloadScene");
  }

  public preload(): void {
    /** Get the character assets from the registry */
    const playerCharacter = this.registry.get(
      REGISTRY_KEYS.PLAYER_CHARACTER
    ) as Character;
    const classId = playerCharacter.characterClass.characterClass;

    const assets = getCharacterAssets(classId);

    this.load.spritesheet(
      ASSET_KEYS.PLAYER_IDLE_SHEET,
      assets.idle,
      ASSET_FRAME_CONFIG.PLAYER
    );

    this.load.spritesheet(
      ASSET_KEYS.PLAYER_RUN_SHEET,
      assets.run,
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
