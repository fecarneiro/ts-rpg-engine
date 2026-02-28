import {
  ASSET_KEYS,
  GRASS_TILE_FRAME,
  MAP_HEIGHT_TILES,
  MAP_WIDTH_TILES,
  PLAYER_SCALE,
  STEP_DURATION_MS,
  TILE_SIZE,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from "@client/config/gameConfig";
import Phaser from "phaser";

type Direction = "up" | "down" | "left" | "right";

type TilePosition = {
  readonly x: number;
  readonly y: number;
};

export class WorldScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<"W" | "A" | "S" | "D", Phaser.Input.Keyboard.Key>;

  private player!: Phaser.GameObjects.Sprite;
  private playerTile: TilePosition = { x: 12, y: 9 };
  private facing: Direction = "down";
  private isMoving = false;

  public constructor() {
    super("WorldScene");
  }

  public create(): void {
    this.createMap();
    this.createGrid();
    this.createAnimations();
    this.createPlayer();
    this.createInput();
    this.configureCamera();
  }

  public update(): void {
    if (this.isMoving) return;

    const direction = this.readDirection();
    if (!direction) return;

    const nextTile = this.getNextTile(this.playerTile, direction);
    if (!this.isInsideBounds(nextTile)) return;

    this.startStep(direction, nextTile);
  }

  private createMap(): void {
    this.add
      .tileSprite(
        0,
        0,
        WORLD_WIDTH,
        WORLD_HEIGHT,
        ASSET_KEYS.TERRAIN_TILES,
        GRASS_TILE_FRAME
      )
      .setOrigin(0, 0);
  }

  private createGrid(): void {
    const grid = this.add.grid(
      0,
      0,
      WORLD_WIDTH,
      WORLD_HEIGHT,
      TILE_SIZE,
      TILE_SIZE,
      0x000000, // fill transparent
      0,
      0x00ff00, // outline green
      0.3
    );
    grid.setOrigin(0, 0);
    grid.setDepth(1000);
  }

  private createAnimations(): void {
    const directions: Direction[] = ["up", "down", "left", "right"];

    for (const direction of directions) {
      const idleKey = `player_idle_${direction}`;
      if (!this.anims.exists(idleKey)) {
        this.anims.create({
          key: idleKey,
          frames: this.anims.generateFrameNumbers(
            ASSET_KEYS.PLAYER_IDLE_SHEET,
            {
              start: 0,
              end: 7,
            }
          ),
          frameRate: 8,
          repeat: -1,
        });
      }

      const walkKey = `player_walk_${direction}`;
      if (!this.anims.exists(walkKey)) {
        this.anims.create({
          key: walkKey,
          frames: this.anims.generateFrameNumbers(ASSET_KEYS.PLAYER_RUN_SHEET, {
            start: 0,
            end: 5,
          }),
          frameRate: 12,
          repeat: -1,
        });
      }
    }
  }

  private createPlayer(): void {
    this.player = this.add.sprite(
      this.tileToWorldX(this.playerTile.x),
      this.tileToWorldY(this.playerTile.y),
      ASSET_KEYS.PLAYER_IDLE_SHEET,
      0
    );

    this.player.setOrigin(0.5, 0.78);
    this.player.setScale(PLAYER_SCALE);
    this.player.play("player_idle_down");
  }

  private createInput(): void {
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = this.input.keyboard!.addKeys("W,A,S,D") as Record<
      "W" | "A" | "S" | "D",
      Phaser.Input.Keyboard.Key
    >;
  }

  private configureCamera(): void {
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.setRoundPixels(true);
    this.cameras.main.setBackgroundColor("#365a3c");
    // World fits in 1 screen: no follow, camera stays fixed
  }

  private readDirection(): Direction | null {
    if (this.cursors.left.isDown || this.wasd.A.isDown) return "left";
    if (this.cursors.right.isDown || this.wasd.D.isDown) return "right";
    if (this.cursors.up.isDown || this.wasd.W.isDown) return "up";
    if (this.cursors.down.isDown || this.wasd.S.isDown) return "down";
    return null;
  }

  private getNextTile(
    currentTile: TilePosition,
    direction: Direction
  ): TilePosition {
    if (direction === "left") return { x: currentTile.x - 1, y: currentTile.y };
    if (direction === "right")
      return { x: currentTile.x + 1, y: currentTile.y };
    if (direction === "up") return { x: currentTile.x, y: currentTile.y - 1 };
    if (direction === "down") return { x: currentTile.x, y: currentTile.y + 1 };
    return currentTile;
  }

  private startStep(direction: Direction, nextTile: TilePosition): void {
    this.isMoving = true;
    this.facing = direction;
    this.player.play(`player_walk_${direction}`);

    this.tweens.add({
      targets: this.player,
      x: this.tileToWorldX(nextTile.x),
      y: this.tileToWorldY(nextTile.y),
      duration: STEP_DURATION_MS,
      ease: "Linear",
      onComplete: () => {
        this.playerTile = nextTile;
        this.isMoving = false;
        this.player.play(`player_idle_${this.facing}`, true);
      },
    });
  }

  private isInsideBounds(tile: TilePosition): boolean {
    return (
      tile.x >= 0 &&
      tile.y >= 0 &&
      tile.x < MAP_WIDTH_TILES &&
      tile.y < MAP_HEIGHT_TILES
    );
  }

  private tileToWorldX(tileX: number): number {
    return tileX * TILE_SIZE + TILE_SIZE / 2;
  }

  private tileToWorldY(tileY: number): number {
    return tileY * TILE_SIZE + TILE_SIZE / 2;
  }
}
