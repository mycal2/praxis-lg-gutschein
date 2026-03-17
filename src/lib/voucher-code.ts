import { randomBytes } from "crypto";

export function generateVoucherCode(): string {
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const random = Array.from(randomBytes(6), (b) => chars[b % chars.length]).join("");
  return `LG-${year}-${random}`;
}

export function calculateExpiry(): Date {
  const expiry = new Date();
  expiry.setMonth(expiry.getMonth() + 3);
  return expiry;
}

export function formatDateGerman(date: Date): string {
  return date.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
}
