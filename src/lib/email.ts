import { Resend } from "resend";
import GutscheinEmail from "@/emails/gutschein";
import NotificationEmail from "@/emails/notification";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

type SendVoucherEmailParams = {
  to: string;
  firstName: string;
  lastName: string;
  practitioners: string[];
  code: string;
  expiryDate: string;
  message?: string;
};

export async function sendVoucherEmail(params: SendVoucherEmailParams) {
  const { data, error } = await getResend().emails.send({
    from: "Praxis Lebensgefühl <noreply@praxis-lebensgefuehl.com>",
    to: params.to,
    subject: "Ihr Gutschein — Praxis Lebensgefühl",
    react: GutscheinEmail({
      firstName: params.firstName,
      lastName: params.lastName,
      practitioners: params.practitioners,
      code: params.code,
      expiryDate: params.expiryDate,
      message: params.message,
    }),
  });
  if (error) throw new Error(`Failed to send voucher email: ${error.message}`);
  return data;
}

export async function sendNotificationEmail(params: SendVoucherEmailParams & { phone?: string }) {
  const notificationEmails = (process.env.NOTIFICATION_EMAILS || "").split(",").filter(Boolean);
  if (notificationEmails.length === 0) return;
  try {
    await getResend().emails.send({
      from: "Praxis Lebensgefühl <noreply@praxis-lebensgefuehl.com>",
      to: notificationEmails,
      subject: `Neuer Gutschein: ${params.firstName} ${params.lastName}`,
      react: NotificationEmail({
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.to,
        phone: params.phone,
        practitioners: params.practitioners,
        message: params.message,
        code: params.code,
        expiryDate: params.expiryDate,
      }),
    });
  } catch (error) {
    console.error("Notification email failed:", error);
  }
}
