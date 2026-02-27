import { BootScene } from "@client/game/scenes/BootScene";
import { PreloadScene } from "@client/game/scenes/PreloadScene";
import { WorldScene } from "@client/game/scenes/WorldScene";
import Phaser from "phaser";

export function startGame(parent: string): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: 800,
    height: 600,
    backgroundColor: "#1d1d1d",
    pixelArt: true,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: "arcade",
      arcade: { debug: false },
    },
    scene: [BootScene, PreloadScene, WorldScene], // Scene pipeline
  });
}

startGame("app");
