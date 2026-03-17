import { NextRequest, NextResponse } from "next/server";
import { gutscheinSchema, practitionerNames } from "@/lib/validation";
import { generateVoucherCode, calculateExpiry, formatDateGerman } from "@/lib/voucher-code";
import { sendVoucherEmail, sendNotificationEmail } from "@/lib/email";
import { formatTelegramMessage, sendTelegramMessage } from "@/lib/telegram";
import { gutscheinLimiter } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Origin check
  const origin = request.headers.get("origin") || "";
  const host = request.headers.get("host") || "";
  if (origin && !origin.includes(host)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  // Rate limiting
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  if (!gutscheinLimiter.check(ip)) {
    return NextResponse.json({ error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." }, { status: 429 });
  }

  // Parse & validate
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const result = gutscheinSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Validierungsfehler", fields: result.error.flatten().fieldErrors }, { status: 400 });
  }

  const data = result.data;
  const code = generateVoucherCode();
  const expiry = calculateExpiry();
  const expiryFormatted = formatDateGerman(expiry);
  const practitionerList = data.practitioners.map((p) => practitionerNames[p]);

  // Send voucher email (critical)
  try {
    await sendVoucherEmail({
      to: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      practitioners: practitionerList,
      code,
      expiryDate: expiryFormatted,
      message: data.message || undefined,
    });
  } catch (error) {
    console.error("Voucher email failed:", error);
    return NextResponse.json({ error: "E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es erneut." }, { status: 500 });
  }

  // Fire-and-forget: notification + Telegram
  sendNotificationEmail({
    to: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    practitioners: practitionerList,
    code,
    expiryDate: expiryFormatted,
    message: data.message || undefined,
  });

  sendTelegramMessage(formatTelegramMessage({
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    phone: data.phone || "",
    practitioners: practitionerList,
    code,
    expiry: expiryFormatted,
  }));

  return NextResponse.json({ success: true });
}
