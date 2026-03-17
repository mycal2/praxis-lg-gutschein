import { describe, it, expect } from "vitest";
import { formatTelegramMessage } from "../telegram";

describe("formatTelegramMessage", () => {
  it("formats message correctly", () => {
    const msg = formatTelegramMessage({ name: "Julia Muster", email: "julia@beispiel.de", phone: "0431 123 456", practitioners: ["Julia Messer-Blohm"], code: "LG-2026-A7X3BC", expiry: "17. Juni 2026" });
    expect(msg).toContain("Julia Muster");
    expect(msg).toContain("julia@beispiel.de");
    expect(msg).toContain("LG-2026-A7X3BC");
  });
  it("omits phone when empty", () => {
    const msg = formatTelegramMessage({ name: "Julia Muster", email: "julia@beispiel.de", phone: "", practitioners: ["Julia Messer-Blohm"], code: "LG-2026-A7X3BC", expiry: "17. Juni 2026" });
    expect(msg).not.toContain("Tel:");
  });
});
