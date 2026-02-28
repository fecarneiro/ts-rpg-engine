import { Character } from "@core/character/character";
import { WARRIOR } from "@core/character/characterClasses";
import Phaser from "phaser";
import { REGISTRY_KEYS } from "../config/gameConfig";

export class BootScene extends Phaser.Scene {
  public constructor() {
    super("BootScene");
  }

  public create(): void {
    const playerCharacter = new Character({
      id: "player-1",
      name: "Hero",
      characterClass: WARRIOR,
    });
    this.registry.set(REGISTRY_KEYS.PLAYER_CHARACTER, playerCharacter);
    this.scene.start("PreloadScene");
  }
}
