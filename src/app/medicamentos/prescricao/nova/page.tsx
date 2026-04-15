"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AppScreen } from "@/shared/components/AppScreen";
import { DatePickerField } from "@/shared/components/DatePickerField";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { submitPrescription } from "../../actions";
import {
  getDoseUnitOptions,
  getFrequencyOptions,
  getIntervalUnitOptions,
  getNewPrescriptionInitialData,
  getPrescriptionMedicationOptions,
  getPrescriptionPatientOptions,
  getRouteOptions,
} from "../../data";
import { MedicationOption, PrescriptionFormData, PrescriptionFormErrors } from "../../types";

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

function SelectField({ label, value, options, error, onChange }: { label: string; value: string; options: MedicationOption[]; error?: string; onChange: (event: ChangeEvent<HTMLSelectElement>) => void; }) {
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

export default function NovaPrescricaoPage() {
  const [form, setForm] = useState<PrescriptionFormData>(getNewPrescriptionInitialData());
  const [errors, setErrors] = useState<PrescriptionFormErrors>({});
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patientOptions, setPatientOptions] = useState<MedicationOption[]>([{ value: "", label: "Selecionar paciente" }]);
  const [medicationOptions, setMedicationOptions] = useState<MedicationOption[]>([{ value: "", label: "Selecionar medicamento" }]);

  useEffect(() => {
    let isMounted = true;

    async function loadOptions() {
      const [patients, medications] = await Promise.all([
        getPrescriptionPatientOptions(),
        getPrescriptionMedicationOptions(),
      ]);

      if (isMounted) {
        setPatientOptions(patients);
        setMedicationOptions(medications);
      }
    }

    void loadOptions();

    return () => {
      isMounted = false;
    };
  }, []);

  function updateField<Key extends keyof PrescriptionFormData>(key: Key, value: PrescriptionFormData[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setFeedback("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const result = await submitPrescription(form);
    setErrors(result.errors);
    setFeedback(result.message);
    setIsSubmitting(false);
    if (result.ok) setForm(getNewPrescriptionInitialData());
  }

  return (
    <AppScreen className="space-y-6">
      <section className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-foreground">Nova prescrição</h1>
          <p className="text-base leading-6 text-muted">Cadastre uma prescrição e prepare a geração dos horários.</p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]">
          <div className="space-y-4">
            <SelectField label="Paciente *" value={form.patientId} options={patientOptions} error={errors.patientId} onChange={(event) => updateField("patientId", event.target.value)} />
            <SelectField label="Medicamento *" value={form.medicationId} options={medicationOptions} error={errors.medicationId} onChange={(event) => updateField("medicationId", event.target.value)} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <TextInput label="Dose *" value={form.dose} error={errors.dose} onChange={(event) => updateField("dose", event.target.value)} />
              <SelectField label="Unidade" value={form.unit} options={getDoseUnitOptions()} onChange={(event) => updateField("unit", event.target.value)} />
              <SelectField label="Via" value={form.route} options={getRouteOptions()} onChange={(event) => updateField("route", event.target.value)} />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <SelectField label="Frequência" value={form.frequency} options={getFrequencyOptions()} onChange={(event) => updateField("frequency", event.target.value)} />
              <TextInput label="A cada" value={form.intervalValue} onChange={(event) => updateField("intervalValue", event.target.value)} />
              <SelectField label="Período" value={form.intervalUnit} options={getIntervalUnitOptions()} onChange={(event) => updateField("intervalUnit", event.target.value)} />
            </div>

            <DatePickerField
              label="Início *"
              mode="datetime"
              value={form.startAt}
              error={errors.startAt}
              onChange={(value) => updateField("startAt", value)}
            />

            <label className="flex flex-col gap-2.5">
              <FieldLabel>Orientações</FieldLabel>
              <textarea
                value={form.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                rows={4}
                className="rounded-2xl border border-border bg-white px-4 py-3 text-base text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)] outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>
          </div>
        </section>

        {feedback ? (
          <p className={`text-sm font-medium ${Object.keys(errors).length ? "text-danger" : "text-success"}`}>{feedback}</p>
        ) : null}

        <div className="space-y-3">
          <PrimaryButton>{isSubmitting ? "Salvando..." : "Criar + gerar horários"}</PrimaryButton>
          <Link href="/medicamentos" className="block text-center text-sm font-semibold text-muted">Cancelar</Link>
        </div>
      </form>
    </AppScreen>
  );
}


