type TelegramMessageData = { name: string; email: string; phone: string; practitioners: string[]; code: string; expiry: string; };

export function formatTelegramMessage(data: TelegramMessageData): string {
  const lines = ["🎫 Neuer Gutschein angefordert!", "", `Name: ${data.name}`, `E-Mail: ${data.email}`];
  if (data.phone) lines.push(`Tel: ${data.phone}`);
  lines.push(`Beraterin: ${data.practitioners.join(", ")}`);
  lines.push(`Code: ${data.code}`);
  lines.push(`Gültig bis: ${data.expiry}`);
  return lines.join("\n");
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) { console.warn("Telegram not configured"); return; }
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chatId, text }) });
  } catch (error) { console.error("Telegram notification failed:", error); }
}
