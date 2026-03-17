type Entry = { count: number; resetAt: number };

export class RateLimiter {
  private store = new Map<string, Entry>();
  constructor(private maxRequests: number = 5, private windowMs: number = 60 * 60 * 1000) {}
  check(ip: string): boolean {
    const now = Date.now();
    const entry = this.store.get(ip);
    if (!entry || now > entry.resetAt) { this.store.set(ip, { count: 1, resetAt: now + this.windowMs }); return true; }
    if (entry.count < this.maxRequests) { entry.count++; return true; }
    return false;
  }
}

export const gutscheinLimiter = new RateLimiter(5, 60 * 60 * 1000);
