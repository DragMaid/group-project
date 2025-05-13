import { add, subtract } from "../math";

describe("Math functions", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(add(1, 2)).toBe(3);
  });

  test("subtracts 5 - 3 to equal 2", () => {
    expect(subtract(5, 3)).toBe(2);
  });

  test("subtracts 3 - 5 to equal -2", () => {
    expect(subtract(3, 5)).toBe(-2);
  });
});
