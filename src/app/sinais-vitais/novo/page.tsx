"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { AppScreen } from "@/shared/components/AppScreen";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { submitVitalRecord } from "../actions";
import { getNewVitalRecordInitialData, getVitalPatientOptions } from "../data";
import { NewVitalRecordErrors, NewVitalRecordFormData, PatientOption } from "../types";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-semibold tracking-[0.01em] text-foreground">{children}</span>;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="text-sm font-medium text-danger">{message}</span>;
}

function TextInput({ label, value, error, onChange }: { label: string; value: string; error?: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void; }) {
  return (
    <label className="flex flex-col gap-2.5">
      <FieldLabel>{label}</FieldLabel>
      <input
        value={value}
        onChange={onChange}
        className={`min-h-14 rounded-2xl border bg-white px-4 text-base text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)] outline-none transition-all focus:ring-4 ${error ? "border-danger focus:border-danger focus:ring-danger/10" : "border-border focus:border-primary focus:ring-primary/10"}`}
      />
      <FieldError message={error} />
    </label>
  );
}

function SelectField({ label, value, options, error, onChange }: { label: string; value: string; options: PatientOption[]; error?: string; onChange: (event: ChangeEvent<HTMLSelectElement>) => void; }) {
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

export default function NovoSinalVitalPage() {
  const [form, setForm] = useState<NewVitalRecordFormData>(getNewVitalRecordInitialData());
  const [errors, setErrors] = useState<NewVitalRecordErrors>({});
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const patientOptions = getVitalPatientOptions();

  function updateField<Key extends keyof NewVitalRecordFormData>(key: Key, value: NewVitalRecordFormData[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setFeedback("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const result = await submitVitalRecord(form);
    setErrors(result.errors);
    setFeedback(result.message);
    setIsSubmitting(false);
    if (result.ok) setForm(getNewVitalRecordInitialData());
  }

  return (
    <AppScreen className="space-y-6">
      <section className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-foreground">Registrar sinais vitais</h1>
          <p className="text-base leading-6 text-muted">Registre os parâmetros principais do paciente de forma rápida.</p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]">
          <div className="space-y-4">
            <SelectField label="Paciente *" value={form.patientId} options={patientOptions} error={errors.patientId} onChange={(event) => updateField("patientId", event.target.value)} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextInput label="Temperatura (°C)" value={form.temperature} error={errors.temperature} onChange={(event) => updateField("temperature", event.target.value)} />
              <TextInput label="FC (bpm)" value={form.heartRate} error={errors.heartRate} onChange={(event) => updateField("heartRate", event.target.value)} />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextInput label="FR (irpm)" value={form.respiratoryRate} error={errors.respiratoryRate} onChange={(event) => updateField("respiratoryRate", event.target.value)} />
              <TextInput label="SpO2 (%)" value={form.spo2} error={errors.spo2} onChange={(event) => updateField("spo2", event.target.value)} />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextInput label="PA Sistólica (mmHg)" value={form.systolicPressure} onChange={(event) => updateField("systolicPressure", event.target.value)} />
              <TextInput label="PA Diastólica (mmHg)" value={form.diastolicPressure} onChange={(event) => updateField("diastolicPressure", event.target.value)} />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextInput label="Glasgow (3-15)" value={form.glasgow} onChange={(event) => updateField("glasgow", event.target.value)} />
              <TextInput label="Glicemia capilar (mg/dL)" value={form.glucose} onChange={(event) => updateField("glucose", event.target.value)} />
            </div>

            <TextInput label="Dor (0-10)" value={form.pain} onChange={(event) => updateField("pain", event.target.value)} />

            <label className="flex flex-col gap-2.5">
              <FieldLabel>Notas</FieldLabel>
              <textarea
                value={form.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                rows={4}
                className="rounded-2xl border border-border bg-white px-4 py-3 text-base text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)] outline-none transition-all placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>
          </div>
        </section>

        {feedback ? (
          <p className={`text-sm font-medium ${Object.keys(errors).length ? "text-danger" : "text-success"}`}>{feedback}</p>
        ) : null}

        <div className="space-y-3">
          <PrimaryButton>{isSubmitting ? "Salvando..." : "Salvar registro"}</PrimaryButton>
          <Link href="/sinais-vitais" className="block text-center text-sm font-semibold text-muted">Cancelar</Link>
        </div>
      </form>
    </AppScreen>
  );
}
