import { PreloadScene } from "@game/scenes/PreloadScene";
import { WorldScene } from "@game/scenes/WorldScene";
import Phaser from "phaser";

const config: Phaser.Types.Core.GameConfig = {
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
  scene: [PreloadScene, WorldScene],
};

new Phaser.Game(config);
