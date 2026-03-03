export type Archetype = "warrior" | "lancer" | "archer" | "monk";
export type Direction = "up" | "down" | "left" | "right";
export type TilePosition = { tileX: number; tileY: number };

export class Character {
  public readonly archetype: Archetype;
  public direction!: Direction;
  public position!: TilePosition;

  constructor(archetype: Archetype) {
    this.archetype = archetype;
  }

  public spawn(position: TilePosition, direction: Direction): void {
    this.position = { ...position };
    this.direction = direction;
  }

  public move(direction: Direction): void {
    this.direction = direction;
    switch (direction) {
      case "up":
        this.position.tileY -= 1;
        break;
      case "down":
        this.position.tileY += 1;
        break;
      case "left":
        this.position.tileX -= 1;
        break;
      case "right":
        this.position.tileX += 1;
        break;
    }
  }
}
