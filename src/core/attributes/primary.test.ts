import { describe, it, expect } from "vitest";
import { addPrimaryModifiers, createPrimaryAttributes } from "./primary";

describe("createPrimaryAttributes", () => {
  it("retorna defaults quando chamada sem argumentos", () => {
    expect(createPrimaryAttributes()).toEqual({
      strength: 1,
      dexterity: 1,
      intelligence: 1,
      vitality: 1,
    });
  });

  it("retorna atributos parciais fornecidos como parâmetro + defaults quando chamada", () => {
    expect(createPrimaryAttributes({ strength: 8, vitality: 5 })).toEqual({
      strength: 8,
      dexterity: 1,
      intelligence: 1,
      vitality: 5,
    });
  });
});

describe("addPrimaryModifiers", () => {
  it("adiciona modificadores aos atributos primários", () => {
    const base = {
      strength: 5,
      dexterity: 3,
      intelligence: 0,
      vitality: 7,
    };

    const result = addPrimaryModifiers(base, { strength: 2, dexterity: 1 });

    expect(result).toEqual({
      strength: 7,
      dexterity: 4,
      intelligence: 0,
      vitality: 7,
    });
  });

  it("ignora atributos ausentes nos modificadores (trata como 0)", () => {
    const base = createPrimaryAttributes({ strength: 10 });
    const result = addPrimaryModifiers(base, {});

    expect(result).toEqual({
      strength: 10,
      dexterity: 1,
      intelligence: 1,
      vitality: 1,
    });
  });
});
