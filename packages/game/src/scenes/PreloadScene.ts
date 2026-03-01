import Phaser from "phaser";

export const assetKeys = {
  tiledMapOverworld: "tiled_map_overworld",
  tilesetMapImage: "tileset_map_image",
} as const;

export const assetUrls = {
  tiledMapOverworld: "/assets/terrains/Overworld.tmj",
  tilesetMapImage: "/assets/terrains/Tilemap_color2.png",
} as const;

/**
 * Character asset config: spritesheet key (for loading), animation key (for play()),
 * and URL. Grouped by character for single source of truth.
 */
export const characterAssets = {
  warrior: {
    idle: {
      spritesheetKey: "spritesheet_warrior_idle",
      animKey: "warrior_idle",
      url: "/assets/characters/warrior/Warrior_Idle.png",
    },
    run: {
      spritesheetKey: "spritesheet_warrior_run",
      animKey: "warrior_run",
      url: "/assets/characters/warrior/Warrior_Run.png",
    },
  },
} as const;

export const assetFrameConfig = {
  character192: { frameWidth: 192, frameHeight: 192 },
} as const;

export class PreloadScene extends Phaser.Scene {
  public constructor() {
    super("PreloadScene");
  }

  public preload(): void {
    this.load.tilemapTiledJSON(
      assetKeys.tiledMapOverworld,
      assetUrls.tiledMapOverworld
    );

    this.load.image(assetKeys.tilesetMapImage, assetUrls.tilesetMapImage);

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
