import {
  calculateSecondaryAttributes,
  type PrimaryAttributes,
  type SecondaryAttributes,
} from "@core/attributes";

export type CharacterId = string;

export interface CharacterParams {
  id: CharacterId;
  name: string;
  primary: PrimaryAttributes;
}

export interface CharacterSnapshot {
  id: CharacterId;
  name: string;
  primary: PrimaryAttributes;
  hp: number;
}

export class Character {
  public readonly id: CharacterId;
  public readonly name: string;

  private _primary: PrimaryAttributes;
  private _secondary: SecondaryAttributes;
  private _hp: number;

  constructor(params: CharacterParams) {
    if (!params.id) throw new Error("Character id is required.");
    if (!params.name.trim()) throw new Error("Character name is required.");

    this.id = params.id;
    this.name = params.name;

    this._primary = params.primary;
    this._secondary = calculateSecondaryAttributes(params.primary);
    this._hp = this._secondary.maxHp;
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
