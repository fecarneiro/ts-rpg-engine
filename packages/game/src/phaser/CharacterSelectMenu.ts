import { CHARACTER_ASSETS } from "@game/configs/character";
import type { CharacterAsset } from "@game/configs/character";
import { UI_ASSETS } from "@game/configs/ui";
import type Phaser from "phaser";

const PANEL_W = 230;
const PANEL_PADDING = 20;
const HEADER_H = 40;
const BTN_W = 190;
const BTN_H = 49;
const BTN_GAP = 10;
const PANEL_H = HEADER_H + CHARACTER_ASSETS.length * (BTN_H + BTN_GAP) + PANEL_PADDING;

export class CharacterSelectMenu {
  private readonly container: Phaser.GameObjects.Container;
  private escKey?: Phaser.Input.Keyboard.Key;

  constructor(private readonly scene: Phaser.Scene) {
    this.container = scene.add.container(0, 0).setVisible(false);

    this.container.add(this.createPanel());
    this.container.add(this.createCloseButton());
    CHARACTER_ASSETS.forEach((asset, i) => {
      this.container.add(this.createCharacterButton(asset, i));
    });
  }

  public open(): void {
    const { width, height } = this.scene.scale;
    this.container.setPosition(width / 2, height / 2).setVisible(true);

    this.escKey = this.scene.input.keyboard!.addKey("ESC");
    this.escKey.once("down", () => this.close());
  }

  public close(): void {
    this.container.setVisible(false);
    if (this.escKey) {
      this.scene.input.keyboard!.removeKey(this.escKey);
      this.escKey = undefined;
    }
  }

  private createPanel(): Phaser.GameObjects.Image {
    return this.scene.add
      .image(0, 0, UI_ASSETS.panel.key)
      .setOrigin(0.5, 0.5)
      .setDisplaySize(PANEL_W, PANEL_H);
  }

  private createCloseButton(): Phaser.GameObjects.Image {
    const x = PANEL_W / 2 - 16;
    const y = -PANEL_H / 2 + 16;

    return this.scene.add
      .image(x, y, UI_ASSETS.iconCross.key)
      .setDisplaySize(24, 24)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.close());
  }

  private createCharacterButton(
    asset: CharacterAsset,
    index: number
  ): Phaser.GameObjects.GameObject[] {
    const y = -PANEL_H / 2 + HEADER_H + index * (BTN_H + BTN_GAP) + BTN_H / 2;

    const btn = this.scene.add
      .image(0, y, UI_ASSETS.buttonNormal.key)
      .setDisplaySize(BTN_W, BTN_H)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => btn.setAlpha(0.85))
      .on("pointerout", () => btn.setAlpha(1))
      .on("pointerdown", () => btn.setTexture(UI_ASSETS.buttonPressed.key))
      .on("pointerup", () => {
        btn.setTexture(UI_ASSETS.buttonNormal.key);
        this.scene.scene.get("WorldScene").events.emit("character:change", asset.id);
        this.close();
      });

    const label = this.scene.add
      .text(0, y, asset.id, { fontSize: "14px", color: "#3d2b1f", fontStyle: "bold" })
      .setOrigin(0.5, 0.5);

    return [btn, label];
  }
}
