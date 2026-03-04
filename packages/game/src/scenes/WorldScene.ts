import { Character, type Direction, type TilePosition } from "@domain";
import {
  CHARACTER_FRAME_END,
  CHARACTER_SCALE,
  characterAssets,
  MOVE_DURATION_MS,
} from "@game/configs/character";
import { tileToPixel } from "@game/configs/map";
import { PlayerController, WorldMap } from "@game/world";
import Phaser from "phaser";

export class WorldScene extends Phaser.Scene {
  private character!: Character;
  private player!: Phaser.GameObjects.Sprite;
  private playerController!: PlayerController;

  public constructor() {
    super("WorldScene");
  }

  public create(): void {
    this.character = new Character("warrior");

    const initialPosition: TilePosition = { tileX: 2, tileY: 2 };
    const initialDirection: Direction = "down";
    this.character.spawn(initialPosition, initialDirection);

    const worldMap = new WorldMap(this);
    const mapData = worldMap.build();

    this.player = this.add.sprite(
      tileToPixel(this.character.position.tileX),
      tileToPixel(this.character.position.tileY),
      characterAssets.warrior.idle.spritesheetKey,
      0
    );

    this.player.setScale(CHARACTER_SCALE);
    this.player.setDepth(1);

    this.anims.create({
      key: characterAssets.warrior.idle.animKey,
      frames: this.anims.generateFrameNumbers(
        characterAssets.warrior.idle.spritesheetKey,
        {
          start: 0,
          end: CHARACTER_FRAME_END,
        }
      ),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: characterAssets.warrior.run.animKey,
      frames: this.anims.generateFrameNumbers(
        characterAssets.warrior.run.spritesheetKey,
        {
          start: 0,
          end: CHARACTER_FRAME_END,
        }
      ),
      frameRate: 12,
      repeat: -1,
    });

    this.player.play(characterAssets.warrior.idle.animKey);

    this.playerController = new PlayerController({
      scene: this,
      character: this.character,
      player: this.player,
      moveDurationMs: MOVE_DURATION_MS,
      idleAnimationKey: characterAssets.warrior.idle.animKey,
      runAnimationKey: characterAssets.warrior.run.animKey,
      mapWidthTiles: mapData.widthTiles,
      mapHeightTiles: mapData.heightTiles,
    });

    this.cameras.main.startFollow(this.player, true);
  }

  public update(): void {
    this.playerController.update();
  }
}
