import { describe, it, expect } from "vitest";
import { gutscheinSchema } from "../validation";

describe("gutscheinSchema", () => {
  const validData = { firstName: "Julia", lastName: "Muster", email: "julia@beispiel.de", phone: "", practitioners: ["julia"], message: "", privacy: true, honeypot: "" };
  it("accepts valid data", () => { expect(gutscheinSchema.safeParse(validData).success).toBe(true); });
  it("rejects missing first name", () => { expect(gutscheinSchema.safeParse({ ...validData, firstName: "" }).success).toBe(false); });
  it("rejects invalid email", () => { expect(gutscheinSchema.safeParse({ ...validData, email: "not-email" }).success).toBe(false); });
  it("rejects empty practitioners", () => { expect(gutscheinSchema.safeParse({ ...validData, practitioners: [] }).success).toBe(false); });
  it("rejects unchecked privacy", () => { expect(gutscheinSchema.safeParse({ ...validData, privacy: false }).success).toBe(false); });
  it("rejects filled honeypot", () => { expect(gutscheinSchema.safeParse({ ...validData, honeypot: "bot-value" }).success).toBe(false); });
  it("accepts optional phone", () => { expect(gutscheinSchema.safeParse({ ...validData, phone: "0431 123456" }).success).toBe(true); });
});
