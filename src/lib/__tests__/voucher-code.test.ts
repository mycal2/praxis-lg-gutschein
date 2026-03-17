import { describe, it, expect } from "vitest";
import { generateVoucherCode } from "../voucher-code";

describe("generateVoucherCode", () => {
  it("returns code in format LG-YYYY-XXXXXX", () => {
    const code = generateVoucherCode();
    expect(code).toMatch(/^LG-\d{4}-[A-Z0-9]{6}$/);
  });
  it("includes current year", () => {
    const code = generateVoucherCode();
    const year = new Date().getFullYear().toString();
    expect(code).toContain(year);
  });
  it("generates different codes on successive calls", () => {
    const codes = new Set(Array.from({ length: 100 }, () => generateVoucherCode()));
    expect(codes.size).toBe(100);
  });
});
