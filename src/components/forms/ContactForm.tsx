"use client";

import { useState } from "react";
import { siteSettings } from "@/lib/data/mock-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div>
        <h2 className="font-display text-xl uppercase mb-6">Coordonnées</h2>
        <dl className="space-y-4 text-muted-foreground">
          {siteSettings.contactEmail && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-accent">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${siteSettings.contactEmail}`} className="hover:text-accent">
                  {siteSettings.contactEmail}
                </a>
              </dd>
            </div>
          )}
          {siteSettings.contactPhone && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-accent">Téléphone</dt>
              <dd className="mt-1">
                <a
                  href={`tel:${siteSettings.contactPhone.replace(/\s/g, "")}`}
                  className="hover:text-accent"
                >
                  {siteSettings.contactPhone}
                </a>
              </dd>
            </div>
          )}
          {siteSettings.contactWhatsApp && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-accent">WhatsApp</dt>
              <dd className="mt-1">
                <a
                  href={`https://wa.me/${siteSettings.contactWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  {siteSettings.contactPhone || "Contacter via WhatsApp"}
                </a>
              </dd>
            </div>
          )}
        </dl>
        <Button href="/devis" className="mt-8">
          Demander un devis
        </Button>
      </div>

      {status === "success" ? (
        <div className="border border-accent/30 bg-accent-muted p-8 flex items-center justify-center">
          <p className="text-accent">Message envoyé avec succès.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="Nom" required>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="form-input"
            />
          </FormField>
          <FormField label="Email" required>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="form-input"
            />
          </FormField>
          <FormField label="Téléphone">
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="form-input"
            />
          </FormField>
          <FormField label="Sujet">
            <input
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="form-input"
            />
          </FormField>
          <FormField label="Message" required>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="form-input resize-none"
            />
          </FormField>
          <input
            type="text"
            name="website"
            value={form.honeypot}
            onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
          />
          {status === "error" && (
            <p className="text-red-400 text-sm">Erreur lors de l&apos;envoi.</p>
          )}
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Envoi..." : "Envoyer"}
          </Button>
        </form>
      )}
    </div>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
        {required && " *"}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
