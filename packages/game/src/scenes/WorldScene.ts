import type { Archetype } from "@domain/character/archetypes/Archetypes";
import type { Character } from "@domain/character/Character";
import type { CharacterAsset } from "@game/configs/character";
import { CHARACTER_ASSETS } from "@game/configs/character";
import { MOVE_DURATION_MS } from "@game/configs/constants";
import { CharacterBuilder } from "@game/phaser/CharacterBuilder";
import { MapBuilder } from "@game/phaser/MapBuilder";
import { PlayerController } from "@game/phaser/PlayerController";
import Phaser from "phaser";

export class WorldScene extends Phaser.Scene {
  private character!: Character;
  private player!: Phaser.GameObjects.Sprite;
  private playerController!: PlayerController;
  private mapData!: { widthTiles: number; heightTiles: number };

  public constructor() {
    super("WorldScene");
  }

  public create(): void {
    this.mapData = new MapBuilder(this).build();
    this.spawnCharacter(CHARACTER_ASSETS[0]!);
    this.cameras.main.startFollow(this.player, true);
  }

  public update(): void {
    this.playerController.update();
  }

  public swapCharacter(assetId: Archetype): void {
    const asset = CHARACTER_ASSETS.find((a) => a.id === assetId);
    if (!asset) return;

    this.player.destroy();
    this.playerController.destroy();
    this.spawnCharacter(asset);
    this.cameras.main.startFollow(this.player, true);
  }

  private spawnCharacter(asset: CharacterAsset): void {
    const result = new CharacterBuilder(this, asset).build();
    this.character = result.character;
    this.player = result.player;
    this.playerController = new PlayerController({
      scene: this,
      character: this.character,
      player: this.player,
      moveDurationMs: MOVE_DURATION_MS,
      idleAnimKey: asset.idle.animKey,
      runAnimKey: asset.run.animKey,
      mapWidthTiles: this.mapData.widthTiles,
      mapHeightTiles: this.mapData.heightTiles,
    });
  }
}
