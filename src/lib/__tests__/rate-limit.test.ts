import { describe, it, expect, beforeEach } from "vitest";
import { RateLimiter } from "../rate-limit";

describe("RateLimiter", () => {
  let limiter: RateLimiter;
  beforeEach(() => { limiter = new RateLimiter(3, 60_000); });
  it("allows requests under the limit", () => {
    expect(limiter.check("1.2.3.4")).toBe(true);
    expect(limiter.check("1.2.3.4")).toBe(true);
    expect(limiter.check("1.2.3.4")).toBe(true);
  });
  it("blocks requests over the limit", () => {
    limiter.check("1.2.3.4"); limiter.check("1.2.3.4"); limiter.check("1.2.3.4");
    expect(limiter.check("1.2.3.4")).toBe(false);
  });
  it("tracks IPs independently", () => {
    limiter.check("1.2.3.4"); limiter.check("1.2.3.4"); limiter.check("1.2.3.4");
    expect(limiter.check("5.6.7.8")).toBe(true);
  });
});
