import Phaser from "phaser";

export class UIScene extends Phaser.Scene {
  public constructor() {
    super("UIScene");
  }

  public create(): void {
    this.add.text(100, 100, "Hello World");
  }
}
