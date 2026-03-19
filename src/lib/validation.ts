import { z } from "zod";

export const practitioners = ["julia", "judith", "tatjana", "unsicher"] as const;
export type Practitioner = (typeof practitioners)[number];

export const practitionerNames: Record<Practitioner, string> = {
  julia: "Julia Messer-Blohm",
  judith: "Judith Jacob",
  tatjana: "Tatjana Müller",
  unsicher: "Weiß ich noch nicht",
};

export const gutscheinSchema = z.object({
  firstName: z.string().min(2, "Bitte geben Sie Ihren Vornamen ein"),
  lastName: z.string().min(2, "Bitte geben Sie Ihren Nachnamen ein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  phone: z.string().refine((val) => !val || val.replace(/\D/g, "").length >= 6, {
    message: "Bitte geben Sie eine gültige Telefonnummer ein",
  }).optional().default(""),
  practitioners: z.array(z.enum(practitioners)).min(1, "Bitte wählen Sie eine Beraterin"),
  message: z.string().max(500, "Maximal 500 Zeichen").optional().default(""),
  privacy: z.literal(true, { message: "Bitte stimmen Sie der Datenschutzerklärung zu" }),
  honeypot: z.string().max(0, "Invalid submission"),
});

export type GutscheinFormData = z.infer<typeof gutscheinSchema>;
