import type { Character } from "@domain/character/Character";
import type { Direction } from "@domain/character/direction/Direction";
import { tileToPixel } from "@game/utils/PixelTileConverters";
import Phaser from "phaser";

type PlayerControllerParams = {
  scene: Phaser.Scene;
  character: Character;
  player: Phaser.GameObjects.Sprite;
  moveDurationMs: number;
  idleAnimKey: string;
  runAnimKey: string;
  mapWidthTiles: number;
  mapHeightTiles: number;
};

export class PlayerController {
  private readonly scene: Phaser.Scene;
  private readonly character: Character;
  private readonly player: Phaser.GameObjects.Sprite;
  private readonly moveDurationMs: number;
  private readonly idleAnimKey: string;
  private readonly runAnimKey: string;
  private readonly mapWidthTiles: number;
  private readonly mapHeightTiles: number;
  private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private readonly wasd: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };
  private isMoving = false;

  public constructor(params: PlayerControllerParams) {
    this.scene = params.scene;
    this.character = params.character;
    this.player = params.player;
    this.moveDurationMs = params.moveDurationMs;
    this.idleAnimKey = params.idleAnimKey;
    this.runAnimKey = params.runAnimKey;
    this.mapWidthTiles = params.mapWidthTiles;
    this.mapHeightTiles = params.mapHeightTiles;
    this.cursors = this.scene.input.keyboard!.createCursorKeys();
    this.wasd = {
      up: this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.scene.input.keyboard!.addKey(
        Phaser.Input.Keyboard.KeyCodes.D
      ),
    };
  }

  public update(): void {
    if (this.isMoving) return;

    const direction = this.readDirection();
    if (!direction) return;

    const next = this.nextPosition(direction);
    if (!this.isWithinBounds(next.x, next.y)) return;

    this.isMoving = true;
    this.character.move(direction);

    this.player.play(this.runAnimKey);

    this.scene.tweens.add({
      targets: this.player,
      x: tileToPixel(next.x),
      y: tileToPixel(next.y),
      duration: this.moveDurationMs,
      ease: "Linear",
      onComplete: () => {
        this.player.play(this.idleAnimKey);
        this.isMoving = false;
      },
    });
  }

  private readDirection(): Direction | null {
    if (this.cursors.up.isDown || this.wasd.up.isDown) return "up";
    if (this.cursors.down.isDown || this.wasd.down.isDown) return "down";
    if (this.cursors.left.isDown || this.wasd.left.isDown) return "left";
    if (this.cursors.right.isDown || this.wasd.right.isDown) return "right";
    return null;
  }

  private nextPosition(direction: Direction): { x: number; y: number } {
    const offsets: Record<Direction, { x: number; y: number }> = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
    };
    const offset = offsets[direction];
    return {
      x: this.character.position.x + offset.x,
      y: this.character.position.y + offset.y,
    };
  }

  private isWithinBounds(x: number, y: number): boolean {
    return (
      x >= 0 && x < this.mapWidthTiles && y >= 0 && y < this.mapHeightTiles
    );
  }

  public destroy(): void {
    this.scene.tweens.killTweensOf(this.player);
    this.isMoving = false;

    this.cursors.up.destroy();
    this.cursors.down.destroy();
    this.cursors.left.destroy();
    this.cursors.right.destroy();
    this.wasd.up.destroy();
    this.wasd.down.destroy();
    this.wasd.left.destroy();
    this.wasd.right.destroy();
  }
}
