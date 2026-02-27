import Phaser from "phaser";

export class WorldScene extends Phaser.Scene {
  public constructor() {
    super("WorldScene");
  }

  public create(): void {
    this.add.text(24, 24, "WorldScene loaded", {
      color: "#ffffff",
      fontFamily: "monospace",
      fontSize: "20px",
    });
  }
}
