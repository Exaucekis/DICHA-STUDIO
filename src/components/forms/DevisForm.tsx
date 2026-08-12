"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { services } from "@/lib/data/mock-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function DevisForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") ?? "";

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: preselectedService,
    project: "",
    budget: "",
    desiredDate: "",
    message: "",
    honeypot: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-16 border border-accent/30 bg-accent-muted p-8">
        <h2 className="font-display text-2xl uppercase text-accent">
          Demande envoyée
        </h2>
        <p className="text-muted-foreground mt-4">
          Merci ! L&apos;équipe DICHA STUDIO vous recontactera rapidement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-6">
        <FormField label="Prénom" required>
          <input
            type="text"
            required
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="form-input"
          />
        </FormField>
        <FormField label="Nom" required>
          <input
            type="text"
            required
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="form-input"
          />
        </FormField>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <FormField label="Téléphone" required>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
      </div>

      <FormField label="Service" required>
        <select
          required
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="form-input"
        >
          <option value="">Sélectionner un service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
          <option value="autre">Autre</option>
        </select>
      </FormField>

      <FormField label="Projet">
        <input
          type="text"
          value={form.project}
          onChange={(e) => setForm({ ...form, project: e.target.value })}
          className="form-input"
        />
      </FormField>

      <div className="grid sm:grid-cols-2 gap-6">
        <FormField label="Budget indicatif">
          <select
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            className="form-input"
          >
            <option value="">Non précisé</option>
            <option value="< 500€">Moins de 500€</option>
            <option value="500-1000€">500€ — 1 000€</option>
            <option value="1000-5000€">1 000€ — 5 000€</option>
            <option value="> 5000€">Plus de 5 000€</option>
          </select>
        </FormField>
        <FormField label="Date souhaitée">
          <input
            type="date"
            value={form.desiredDate}
            onChange={(e) => setForm({ ...form, desiredDate: e.target.value })}
            className="form-input"
          />
        </FormField>
      </div>

      <FormField label="Description du projet" required>
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
        <p className="text-red-400 text-sm">Une erreur est survenue. Réessayez.</p>
      )}

      <Button type="submit" size="lg" disabled={status === "loading"}>
        {status === "loading" ? "Envoi..." : "Envoyer ma demande"}
      </Button>
    </form>
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
