import { UI_ASSETS } from "@game/configs/ui";
import { CharacterSelectMenu } from "@game/phaser/CharacterSelectMenu";
import Phaser from "phaser";

export class UIScene extends Phaser.Scene {
  public constructor() {
    super("UIScene");
  }

  public create(): void {
    const menu = new CharacterSelectMenu(this);
    this.createOpenMenuButton(menu);
  }

  private createOpenMenuButton(menu: CharacterSelectMenu): void {
    const W = 160;
    const H = 40;
    const MARGIN = 12;
    const x = this.scale.width - W / 2 - MARGIN;
    const y = this.scale.height - H / 2 - MARGIN;

    const btn = this.add
      .image(x, y, UI_ASSETS.buttonNormal.key)
      .setDisplaySize(W, H)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => btn.setAlpha(0.85))
      .on("pointerout", () => btn.setAlpha(1))
      .on("pointerdown", () => btn.setTexture(UI_ASSETS.buttonPressed.key))
      .on("pointerup", () => {
        btn.setTexture(UI_ASSETS.buttonNormal.key);
        menu.open();
      });

    this.add
      .text(x, y, "Change Character", {
        fontSize: "13px",
        color: "#3d2b1f",
        fontStyle: "bold",
      })
      .setOrigin(0.5, 0.5);
  }
}
