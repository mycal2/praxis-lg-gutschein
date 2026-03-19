"use client";

import { useState } from "react";
import { gutscheinSchema, practitioners, practitionerNames, type GutscheinFormData } from "@/lib/validation";
import type { Practitioner } from "@/lib/validation";

const practitionerLabels: Record<string, string> = { julia: "Julia", judith: "Judith", tatjana: "Tatjana", unsicher: "Weiß ich noch nicht" };

type FieldErrors = Partial<Record<keyof GutscheinFormData, string[]>>;

export function GutscheinForm() {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    practitioners: [] as string[],
    message: "",
    privacy: false,
    honeypot: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  function updateField(field: string, value: string | boolean | string[]) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function togglePractitioner(p: string) {
    setFormValues((prev) => {
      const current = prev.practitioners;
      const next = current.includes(p) ? current.filter((x) => x !== p) : [...current, p];
      return { ...prev, practitioners: next };
    });
    setFieldErrors((prev) => ({ ...prev, practitioners: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    setFieldErrors({});

    const result = gutscheinSchema.safeParse(formValues);
    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors as FieldErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/gutschein", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.fields) {
          setFieldErrors(data.fields);
        }
        setServerError(data.debug ? `${data.error} (${data.debug})` : data.error || "Ein Fehler ist aufgetreten.");
        return;
      }
      setSuccess(true);
    } catch {
      setServerError("Verbindungsfehler. Bitte versuchen Sie es erneut.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormValues({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      practitioners: [],
      message: "",
      privacy: false,
      honeypot: "",
    });
    setFieldErrors({});
    setServerError("");
    setSuccess(false);
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal/10 animate-[scale-in_0.3s_ease-out]">
          <svg className="h-8 w-8 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-dark mb-2">Gutschein gesendet!</h2>
        <p className="text-gray-700">
          Ihr Gutschein wurde an <strong>{formValues.email}</strong> gesendet!
        </p>
        <p className="text-gray-500 text-sm mt-1">Prüfen Sie auch Ihren Spam-Ordner.</p>
        <button
          onClick={resetForm}
          className="mt-6 inline-block rounded-lg bg-teal px-6 py-2.5 text-sm font-medium text-white hover:bg-teal-dark transition-colors"
        >
          Weiteren Gutschein anfordern
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-5">
      {serverError && (
        <div className="rounded-lg bg-error/10 border border-error/20 px-4 py-3 text-sm text-error">
          {serverError}
        </div>
      )}

      {/* Name fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-dark mb-1">Vorname *</label>
          <input
            id="firstName"
            type="text"
            value={formValues.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-teal/15 focus:border-teal ${fieldErrors.firstName ? "border-error" : "border-gray-300"}`}
            placeholder="Max"
          />
          {fieldErrors.firstName && <p className="mt-1 text-xs text-error">{fieldErrors.firstName[0]}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-dark mb-1">Nachname *</label>
          <input
            id="lastName"
            type="text"
            value={formValues.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-teal/15 focus:border-teal ${fieldErrors.lastName ? "border-error" : "border-gray-300"}`}
            placeholder="Mustermann"
          />
          {fieldErrors.lastName && <p className="mt-1 text-xs text-error">{fieldErrors.lastName[0]}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-dark mb-1">E-Mail-Adresse *</label>
        <input
          id="email"
          type="email"
          value={formValues.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-teal/15 focus:border-teal ${fieldErrors.email ? "border-error" : "border-gray-300"}`}
          placeholder="max@beispiel.de"
        />
        {fieldErrors.email && <p className="mt-1 text-xs text-error">{fieldErrors.email[0]}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-dark mb-1">Telefon <span className="text-gray-500 font-normal">(optional)</span></label>
        <input
          id="phone"
          type="tel"
          value={formValues.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-teal/15 focus:border-teal ${fieldErrors.phone ? "border-error" : "border-gray-300"}`}
          placeholder="0431 123456"
        />
        {fieldErrors.phone && <p className="mt-1 text-xs text-error">{fieldErrors.phone[0]}</p>}
      </div>

      {/* Practitioners */}
      <div>
        <label className="block text-sm font-medium text-dark mb-2">Beraterin *</label>
        <div className="flex flex-wrap gap-2">
          {practitioners.map((p) => {
            const selected = formValues.practitioners.includes(p);
            return (
              <button
                key={p}
                type="button"
                onClick={() => updateField("practitioners", [p])}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors ${
                  selected
                    ? "border-teal bg-teal/10 text-teal-dark"
                    : "border-gray-300 text-gray-700 hover:border-gray-500"
                }`}
              >
                {selected && (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
                {practitionerLabels[p]}
              </button>
            );
          })}
        </div>
        {fieldErrors.practitioners && <p className="mt-1 text-xs text-error">{fieldErrors.practitioners[0]}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-dark mb-1">Persönliche Nachricht <span className="text-gray-500 font-normal">(optional)</span></label>
        <textarea
          id="message"
          value={formValues.message}
          onChange={(e) => updateField("message", e.target.value)}
          rows={3}
          maxLength={500}
          className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors resize-none focus:ring-2 focus:ring-teal/15 focus:border-teal ${fieldErrors.message ? "border-error" : "border-gray-300"}`}
          placeholder="Ihre Nachricht für den Gutschein..."
        />
        {fieldErrors.message && <p className="mt-1 text-xs text-error">{fieldErrors.message[0]}</p>}
      </div>

      {/* Privacy */}
      <div>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={formValues.privacy}
            onChange={(e) => updateField("privacy", e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal accent-teal"
          />
          <span className="text-sm text-gray-700">
            Ich stimme der <a href="/datenschutz" target="_blank" className="text-teal hover:text-teal-dark underline">Datenschutzerklärung</a> zu. *
          </span>
        </label>
        {fieldErrors.privacy && <p className="mt-1 text-xs text-error">{fieldErrors.privacy[0]}</p>}
      </div>

      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formValues.honeypot}
          onChange={(e) => updateField("honeypot", e.target.value)}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-white hover:bg-teal-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {loading ? "Wird gesendet…" : "Gutschein anfordern"}
      </button>
    </form>
  );
}
