import { PreloadScene } from "@game/scenes/PreloadScene";
import { UIScene } from "@game/scenes/UIScene";
import { WorldScene } from "@game/scenes/WorldScene";
import Phaser from "phaser";

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  width: 800,
  height: 600,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
  },
  physics: {
    default: "arcade",
  },
  // TODO: see more options
  scene: [PreloadScene, WorldScene, UIScene],
};

new Phaser.Game(gameConfig);
