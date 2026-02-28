import {
  calculateSecondaryAttributes,
  type PrimaryAttributes,
  type SecondaryAttributes,
} from "@core/attributes";
import { type CharacterClass } from "./characterClasses";

export type CharacterId = string;

export interface CharacterParams {
  id: CharacterId;
  name: string;
  characterClass: CharacterClass;
}

export class Character {
  public readonly id: CharacterId;
  public readonly name: string;

  private _characterClass: CharacterClass;
  private _primary: PrimaryAttributes;
  private _secondary: SecondaryAttributes;
  private _hp: number;

  constructor(params: CharacterParams) {
    if (!params.id) throw new Error("Character id is required.");
    if (!params.name.trim()) throw new Error("Character name is required.");

    this.id = params.id;
    this.name = params.name;
    this._characterClass = params.characterClass;

    this._primary = params.characterClass.primaryAttributes;
    this._secondary = calculateSecondaryAttributes(this._primary);
    this._hp = this._secondary.maxHp;
  }

  get characterClass(): CharacterClass {
    return this._characterClass;
  }

  get primary(): PrimaryAttributes {
    return this._primary;
  }

  get secondary(): SecondaryAttributes {
    return this._secondary;
  }

  get hp(): number {
    return this._hp;
  }
}
