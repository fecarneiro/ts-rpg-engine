import { MOVE_DURATION_MS } from "@game/configs/constants";
import { characterAssets } from "@game/configs/character";
import { CharacterBuilder } from "@game/phaser/CharacterBuilder";
import { MapBuilder } from "@game/phaser/MapBuilder";
import { PlayerController } from "@game/phaser/PlayerController";
import Phaser from "phaser";

export class WorldScene extends Phaser.Scene {
  private playerController!: PlayerController;

  public constructor() {
    super("WorldScene");
  }

  public create(): void {
    const mapData = new MapBuilder(this).build();
    const { character, player } = new CharacterBuilder(this).build();

    this.playerController = new PlayerController({
      scene: this,
      character,
      player,
      moveDurationMs: MOVE_DURATION_MS,
      idleAnimKey: characterAssets.warrior.idle.animKey,
      runAnimKey: characterAssets.warrior.run.animKey,
      mapWidthTiles: mapData.widthTiles,
      mapHeightTiles: mapData.heightTiles,
    });

    this.cameras.main.startFollow(player, true);
  }

  public update(): void {
    this.playerController.update();
  }
}
