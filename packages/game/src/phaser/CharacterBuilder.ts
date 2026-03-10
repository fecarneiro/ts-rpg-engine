import type { Character } from "@domain/character/Character";
import { createCharacter } from "@domain/character/Character";
import type { Position } from "@domain/character/position/Position";
import type { CharacterAsset } from "@game/configs/character";
import { CHARACTER_SCALE } from "@game/configs/constants";
import { tileToPixel } from "@game/utils/PixelTileConverters";
import type Phaser from "phaser";

export type CharacterBuilderResult = {
  character: Character;
  player: Phaser.GameObjects.Sprite;
};

export class CharacterBuilder {
  public constructor(
    private readonly scene: Phaser.Scene,
    private readonly asset: CharacterAsset,
    private readonly initialPosition: Position = { x: 0, y: 0 }
  ) {}

  public build(): CharacterBuilderResult {
    const character = createCharacter(
      "player-1",
      this.asset.id,
      this.initialPosition,
      "down",
      1
    );

    const player = this.scene.add.sprite(
      tileToPixel(character.position.x),
      tileToPixel(character.position.y),
      this.asset.idle.spritesheetKey,
      0
    );

    player.setScale(CHARACTER_SCALE);
    player.setDepth(1);

    if (!this.scene.anims.exists(this.asset.idle.animKey)) {
      this.scene.anims.create({
        key: this.asset.idle.animKey,
        frames: this.scene.anims.generateFrameNumbers(
          this.asset.idle.spritesheetKey,
          { start: 0, end: this.asset.idle.frameEnd }
        ),
        frameRate: 8,
        repeat: -1,
      });
    }

    if (!this.scene.anims.exists(this.asset.run.animKey)) {
      this.scene.anims.create({
        key: this.asset.run.animKey,
        frames: this.scene.anims.generateFrameNumbers(
          this.asset.run.spritesheetKey,
          { start: 0, end: this.asset.run.frameEnd }
        ),
        frameRate: 12,
        repeat: -1,
      });
    }

    if (!this.scene.anims.exists(this.asset.attack.animKey)) {
      this.scene.anims.create({
        key: this.asset.attack.animKey,
        frames: this.scene.anims.generateFrameNumbers(
          this.asset.attack.spritesheetKey,
          { start: 0, end: this.asset.attack.frameEnd }
        ),
        frameRate: 12,
        repeat: 0,
      });
    }

    player.play(this.asset.idle.animKey);

    return { character, player };
  }
}
