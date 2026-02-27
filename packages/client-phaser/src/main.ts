import Phaser from "phaser";
import { Character } from "@rpg/core";

class DemoScene extends Phaser.Scene {
  public constructor() {
    super("demo");
  }

  public create(): void {
    const character = new Character({
      id: "char-1",
      name: "Knight",
      primary: {
        strength: 4,
        dexterity: 4,
        vitality: 5,
        intelligence: 1,
      },
    });

    this.add.text(20, 20, `Hero: ${character.name}`, {
      color: "#ffffff",
      fontFamily: "monospace",
      fontSize: "20px",
    });
    this.add.text(20, 52, `HP: ${character.hp}`, {
      color: "#8ee59b",
      fontFamily: "monospace",
      fontSize: "16px",
    });
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  parent: "app",
  backgroundColor: "#1a1f2e",
  scene: [DemoScene],
});
