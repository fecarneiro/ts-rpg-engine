import {
  getArchetypePreset,
  type Archetype,
} from "@domain/archetypes/Archetypes";
import type { PrimaryAttributes } from "@domain/attributes/primary";

// export type Direction = "up" | "down" | "left" | "right";
// export type TilePosition = { tileX: number; tileY: number };

export class Character {
  public readonly archetype: Archetype;
  public readonly attributes: PrimaryAttributes;
  // public direction!: Direction;
  // public position!: TilePosition;

  constructor(archetype: Archetype) {
    const archetypePreset = getArchetypePreset(archetype);
    this.archetype = archetypePreset.archetype;
    this.attributes = archetypePreset.attributes.primary;
  }

  // public spawn(position: TilePosition, direction: Direction): void {
  //   this.position = { ...position };
  //   this.direction = direction;
  // }

  // public move(direction: Direction): void {
  //   this.direction = direction;
  //   switch (direction) {
  //     case "up":
  //       this.position.tileY -= 1;
  //       break;
  //     case "down":
  //       this.position.tileY += 1;
  //       break;
  //     case "left":
  //       this.position.tileX -= 1;
  //       break;
  //     case "right":
  //       this.position.tileX += 1;
  //       break;
  //   }
  // }
}

for (const archetype of ["warrior", "lancer", "archer", "monk"]) {
  console.log(new Character(archetype as Archetype));
}
