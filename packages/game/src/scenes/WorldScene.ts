import { MapBuilder } from "@game/phaser/MapBuilder";
import { CharacterBuilder } from "@game/phaser/CharacterBuilder";
import Phaser from "phaser";

export class WorldScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  // TODO Fase 2: private character!: Character;
  // TODO Fase 2: private playerController!: PlayerController;

  public constructor() {
    super("WorldScene");
  }

  public create(): void {
    new MapBuilder(this).build();

    const { player } = new CharacterBuilder(this).build();
    this.player = player;

    // TODO Fase 2: guardar character e criar PlayerController com:
    // new PlayerController({
    //   scene: this,
    //   character,
    //   player: this.player,
    //   moveDurationMs: MOVE_DURATION_MS,
    //   idleAnimKey: characterAssets.warrior.idle.animKey,
    //   runAnimKey: characterAssets.warrior.run.animKey,
    //   mapWidthTiles: mapData.widthTiles,
    //   mapHeightTiles: mapData.heightTiles,
    // });

    this.cameras.main.startFollow(this.player, true);
  }

  public update(): void {
    // TODO Fase 2: this.playerController.update();
  }
}
