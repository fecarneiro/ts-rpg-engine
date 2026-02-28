import { clamp01 } from "@core/utils/clamp";
import { describe, expect, it } from "vitest";

describe("clamp01", () => {
  it("mantém valores entre 0 e 1", () => {
    expect(clamp01(0.3)).toBe(0.3);
  });

  it("trava abaixo de 0", () => {
    expect(clamp01(-10)).toBe(0);
  });

  it("trava acima de 1", () => {
    expect(clamp01(2)).toBe(1);
  });
});
