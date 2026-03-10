import {
  characterAssets,
  CHARACTER_SCALE,
  CHARACTER_FRAME_END,
} from "@game/configs/character";
import { tileToPixel } from "@game/configs/map";
import { createCharacter } from "@domain/character/Character";
import type { Character } from "@domain/character/Character";
import type Phaser from "phaser";

export type CharacterBuilderResult = {
  character: Character;
  player: Phaser.GameObjects.Sprite;
};

export class CharacterBuilder {
  public constructor(private readonly scene: Phaser.Scene) {}

  public build(): CharacterBuilderResult {
    const character = createCharacter("player-1", "warrior", { x: 0, y: 0 }, "down", 1);

    const player = this.scene.add.sprite(
      tileToPixel(character.position.x),
      tileToPixel(character.position.y),
      characterAssets.warrior.idle.spritesheetKey,
      0
    );

    player.setScale(CHARACTER_SCALE);
    player.setDepth(1);

    this.scene.anims.create({
      key: characterAssets.warrior.idle.animKey,
      frames: this.scene.anims.generateFrameNumbers(
        characterAssets.warrior.idle.spritesheetKey,
        { start: 0, end: CHARACTER_FRAME_END }
      ),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: characterAssets.warrior.run.animKey,
      frames: this.scene.anims.generateFrameNumbers(
        characterAssets.warrior.run.spritesheetKey,
        { start: 0, end: CHARACTER_FRAME_END }
      ),
      frameRate: 12,
      repeat: -1,
    });

    player.play(characterAssets.warrior.idle.animKey);

    return { character, player };
  }
}
