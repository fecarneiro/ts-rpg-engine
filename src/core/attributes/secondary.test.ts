import { describe, it, expect } from "vitest";
import { calculateSecondaryAttributes } from "./secondary";

describe("calculateSecondaryAttributes", () => {
  it("calcula secundários a partir dos primários", () => {
    const primary = {
      strength: 5,
      dexterity: 3,
      intelligence: 0,
      vitality: 7,
    };

    const result = calculateSecondaryAttributes(primary);

    expect(result.maxHp).toBe(70);
    expect(result.attack).toBe(5 * 2 + 3);
    expect(result.defense).toBe(14);
    expect(result.critChance).toBe(0.03);
  });
});
