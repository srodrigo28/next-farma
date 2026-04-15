"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AppScreen } from "@/shared/components/AppScreen";
import { DatePickerField } from "@/shared/components/DatePickerField";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import {
  getNewPatientInitialData,
  getPatientFormUnitOptions,
  getPatientSexOptions,
} from "../data";
import { submitNewPatient } from "../actions";
import { NewPatientFormData, NewPatientFormErrors, PatientSelectOption } from "../types";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-semibold tracking-[0.01em] text-foreground">{children}</span>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <span className="text-sm font-medium text-danger">{message}</span>;
}

function TextInput({
  label,
  placeholder,
  value,
  error,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="flex flex-col gap-2.5">
      <FieldLabel>{label}</FieldLabel>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`min-h-14 rounded-2xl border bg-white px-4 text-base text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)] outline-none transition-all placeholder:text-muted/70 focus:ring-4 ${
          error
            ? "border-danger focus:border-danger focus:ring-danger/10"
            : "border-border focus:border-primary focus:ring-primary/10"
        }`}
      />
      <FieldError message={error} />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  error,
  onChange,
}: {
  label: string;
  value: string;
  options: PatientSelectOption[];
  error?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <label className="flex flex-col gap-2.5">
      <FieldLabel>{label}</FieldLabel>
      <select
        value={value}
        onChange={onChange}
        className={`min-h-14 rounded-2xl border bg-white px-4 text-base text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)] outline-none transition-all focus:ring-4 ${
          error
            ? "border-danger focus:border-danger focus:ring-danger/10"
            : "border-border focus:border-primary focus:ring-primary/10"
        }`}
      >
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldError message={error} />
    </label>
  );
}

function TextAreaField({
  label,
  placeholder,
  value,
  error,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <label className="flex flex-col gap-2.5">
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className={`rounded-2xl border bg-white px-4 py-3 text-base text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)] outline-none transition-all placeholder:text-muted/70 focus:ring-4 ${
          error
            ? "border-danger focus:border-danger focus:ring-danger/10"
            : "border-border focus:border-primary focus:ring-primary/10"
        }`}
      />
      <FieldError message={error} />
    </label>
  );
}

export default function NovoPacientePage() {
  const [form, setForm] = useState<NewPatientFormData>(getNewPatientInitialData());
  const [errors, setErrors] = useState<NewPatientFormErrors>({});
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unitOptions, setUnitOptions] = useState<PatientSelectOption[]>([{ value: "", label: "Selecionar" }]);
  const sexOptions = getPatientSexOptions();

  useEffect(() => {
    let isMounted = true;

    async function loadUnitOptions() {
      const options = await getPatientFormUnitOptions();
      if (isMounted) {
        setUnitOptions(options);
      }
    }

    void loadUnitOptions();

    return () => {
      isMounted = false;
    };
  }, []);

  function updateField<Key extends keyof NewPatientFormData>(key: Key, value: NewPatientFormData[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setFeedback("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const result = await submitNewPatient(form);

    setErrors(result.errors);
    setFeedback(result.message);
    setIsSubmitting(false);

    if (result.ok) {
      setForm(getNewPatientInitialData());
    }
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <AppScreen className="space-y-6">
      <section className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-foreground">Novo paciente</h1>
          <p className="text-base leading-6 text-muted">
            Cadastre os dados principais do paciente para iniciar o acompanhamento.
          </p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]">
          <div className="space-y-4">
            <TextInput
              label="Nome completo *"
              placeholder="Digite o nome do paciente"
              value={form.fullName}
              error={errors.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextInput
                label="Prontuário / CNS *"
                placeholder="Informe o prontuário"
                value={form.recordId}
                error={errors.recordId}
                onChange={(event) => updateField("recordId", event.target.value)}
              />
              <SelectField
                label="Sexo *"
                value={form.sex}
                options={sexOptions}
                error={errors.sex}
                onChange={(event) => updateField("sex", event.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextInput
                label="Leito *"
                placeholder="Ex: 204-B"
                value={form.bed}
                error={errors.bed}
                onChange={(event) => updateField("bed", event.target.value)}
              />
              <TextInput
                label="Setor/Ala *"
                placeholder="Ex: Clínica Médica"
                value={form.sector}
                error={errors.sector}
                onChange={(event) => updateField("sector", event.target.value)}
              />
            </div>

            <DatePickerField
              label="Data de internação *"
              value={form.admissionDate}
              error={errors.admissionDate}
              onChange={(value) => updateField("admissionDate", value)}
            />

            <SelectField
              label="Unidade *"
              value={form.unit}
              options={unitOptions}
              error={errors.unit}
              onChange={(event) => updateField("unit", event.target.value)}
            />

            <TextInput
              label="Alergias"
              placeholder="Ex: Penicilina, Sulfas"
              value={form.allergies}
              error={errors.allergies}
              onChange={(event) => updateField("allergies", event.target.value)}
            />

            <TextAreaField
              label="Observações"
              placeholder="Adicione observações clínicas importantes"
              value={form.notes}
              error={errors.notes}
              onChange={(event) => updateField("notes", event.target.value)}
            />

            <label className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)]">
              <input
                type="checkbox"
                checked={form.isTrainingPatient}
                onChange={(event) => updateField("isTrainingPatient", event.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <span>Paciente fictício (para treino/simulação)</span>
            </label>
          </div>
        </section>

        {feedback ? (
          <p className={`text-sm font-medium ${hasErrors ? "text-danger" : "text-success"}`}>
            {feedback}
          </p>
        ) : null}

        <div className="space-y-3">
          <PrimaryButton>{isSubmitting ? "Salvando..." : "Cadastrar paciente"}</PrimaryButton>
          <Link href="/pacientes" className="block text-center text-sm font-semibold text-muted">
            Cancelar
          </Link>
        </div>
      </form>
    </AppScreen>
  );
}

