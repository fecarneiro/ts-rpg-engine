import Phaser from "phaser";

export class PreloadScene extends Phaser.Scene {
  public constructor() {
    super("PreloadScene");
  }

  public preload(): void {
    this.load.spritesheet(
      "player_idle_sheet",
      "/assets/tiny-swords/characters/player/Warrior_Idle.png",
      {
        frameWidth: 192,
        frameHeight: 192,
      }
    );

    this.load.spritesheet(
      "player_run_sheet",
      "/assets/tiny-swords/characters/player/Warrior_Run.png",
      {
        frameWidth: 192,
        frameHeight: 192,
      }
    );

    this.load.image(
      "terrain_tilemap_1",
      "/assets/tiny-swords/terrain/tileset/Tilemap_color1.png"
    );
    this.load.image(
      "terrain_shadow",
      "/assets/tiny-swords/terrain/tileset/Shadow.png"
    );
    this.load.image(
      "obstacle_rock_1",
      "/assets/tiny-swords/props/obstacles/Rock1.png"
    );
    this.load.image(
      "obstacle_tree_1",
      "/assets/tiny-swords/props/obstacles/Tree1.png"
    );
    this.load.image(
      "building_house_1",
      "/assets/tiny-swords/buildings/House1.png"
    );
    this.load.image(
      "building_tower",
      "/assets/tiny-swords/buildings/Tower.png"
    );
  }
  public create(): void {
    this.scene.start("WorldScene");
  }
}
