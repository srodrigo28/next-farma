"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { AppScreen } from "@/shared/components/AppScreen";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { submitHandoffNote } from "../actions";
import { getHandoffShiftOptions, getHandoffUnitOptions, getNewHandoffInitialData } from "../data";
import { HandoffOption, NewHandoffNoteErrors, NewHandoffNoteFormData } from "../types";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-semibold tracking-[0.01em] text-foreground">{children}</span>;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="text-sm font-medium text-danger">{message}</span>;
}

function SelectField({ label, value, options, error, onChange }: { label: string; value: string; options: HandoffOption[]; error?: string; onChange: (event: ChangeEvent<HTMLSelectElement>) => void; }) {
  return (
    <label className="flex flex-col gap-2.5">
      <FieldLabel>{label}</FieldLabel>
      <select
        value={value}
        onChange={onChange}
        className={`min-h-14 rounded-2xl border bg-white px-4 text-base text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)] outline-none transition-all focus:ring-4 ${error ? "border-danger focus:border-danger focus:ring-danger/10" : "border-border focus:border-primary focus:ring-primary/10"}`}
      >
        {options.map((option) => (
          <option key={option.label} value={option.value}>{option.label}</option>
        ))}
      </select>
      <FieldError message={error} />
    </label>
  );
}

export default function NovaNotaPassagemPage() {
  const [form, setForm] = useState<NewHandoffNoteFormData>(getNewHandoffInitialData());
  const [errors, setErrors] = useState<NewHandoffNoteErrors>({});
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<Key extends keyof NewHandoffNoteFormData>(key: Key, value: NewHandoffNoteFormData[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setFeedback("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const result = await submitHandoffNote(form);
    setErrors(result.errors);
    setFeedback(result.message);
    setIsSubmitting(false);
    if (result.ok) setForm(getNewHandoffInitialData());
  }

  return (
    <AppScreen className="space-y-6">
      <section className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-foreground">Nova nota de passagem</h1>
          <p className="text-base leading-6 text-muted">Registre o resumo do plantão para a próxima equipe.</p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]">
          <div className="space-y-4">
            <SelectField label="Unidade" value={form.unit} options={getHandoffUnitOptions()} error={errors.unit} onChange={(event) => updateField("unit", event.target.value)} />
            <SelectField label="Plantão" value={form.shift} options={getHandoffShiftOptions()} error={errors.shift} onChange={(event) => updateField("shift", event.target.value)} />
            <label className="flex flex-col gap-2.5">
              <FieldLabel>Resumo *</FieldLabel>
              <textarea
                value={form.summary}
                onChange={(event) => updateField("summary", event.target.value)}
                rows={6}
                placeholder="Descreva os principais eventos do plantão, pacientes críticos e intercorrências..."
                className={`rounded-2xl border bg-white px-4 py-3 text-base text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)] outline-none transition-all placeholder:text-muted/70 focus:ring-4 ${errors.summary ? "border-danger focus:border-danger focus:ring-danger/10" : "border-border focus:border-primary focus:ring-primary/10"}`}
              />
              <FieldError message={errors.summary} />
            </label>
          </div>
        </section>

        {feedback ? (
          <p className={`text-sm font-medium ${Object.keys(errors).length ? "text-danger" : "text-success"}`}>{feedback}</p>
        ) : null}

        <div className="space-y-3">
          <PrimaryButton>{isSubmitting ? "Salvando..." : "Salvar"}</PrimaryButton>
          <Link href="/passagem-plantao" className="block text-center text-sm font-semibold text-muted">Cancelar</Link>
        </div>
      </form>
    </AppScreen>
  );
}
