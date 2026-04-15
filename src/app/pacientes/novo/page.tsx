"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AppScreen } from "@/shared/components/AppScreen";
import { CheckIcon, PatientsIcon } from "@/shared/components/AppIcons";
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

function SuccessRedirectCard({ seconds }: { seconds: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl border border-[#bdeedc] bg-[#f2fff9] p-4 shadow-[0_14px_28px_rgba(21,154,116,0.12)]"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ scale: 0.72, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#159a74] text-white shadow-[0_12px_22px_rgba(21,154,116,0.28)]"
        >
          <motion.span
            className="absolute inset-0 rounded-2xl border border-[#159a74]/30"
            animate={{ scale: [1, 1.28], opacity: [0.45, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          />
          <CheckIcon className="h-7 w-7" />
        </motion.div>

        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-bold text-[#0d6f55]">Paciente cadastrado com sucesso.</p>
          <p className="text-sm leading-5 text-[#245b4d]">Abrindo a lista de pacientes em {seconds}s.</p>
        </div>

        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#159a74] ring-1 ring-[#ccefe3] min-[360px]:flex"
        >
          <PatientsIcon className="h-5 w-5" />
        </motion.div>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#d7f5ec]">
        <motion.div
          className="h-full rounded-full bg-[#159a74]"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 4, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

export default function NovoPacientePage() {
  const router = useRouter();
  const [form, setForm] = useState<NewPatientFormData>(getNewPatientInitialData());
  const [errors, setErrors] = useState<NewPatientFormErrors>({});
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectSeconds, setRedirectSeconds] = useState(4);
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

  useEffect(() => {
    if (!isRedirecting) return;

    const intervalId = window.setInterval(() => {
      setRedirectSeconds((current) => Math.max(current - 1, 0));
    }, 1000);
    const timeoutId = window.setTimeout(() => {
      router.push("/pacientes");
    }, 4000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [isRedirecting, router]);

  function updateField<Key extends keyof NewPatientFormData>(key: Key, value: NewPatientFormData[Key]) {
    if (isRedirecting) return;

    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setFeedback("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting || isRedirecting) return;

    setIsSubmitting(true);

    const result = await submitNewPatient(form);

    setErrors(result.errors);
    setFeedback(result.message);
    setIsSubmitting(false);

    if (result.ok) {
      setRedirectSeconds(4);
      setIsRedirecting(true);
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

        {isRedirecting ? (
          <SuccessRedirectCard seconds={redirectSeconds} />
        ) : feedback ? (
          <p className={`text-sm font-medium ${hasErrors ? "text-danger" : "text-success"}`}>
            {feedback}
          </p>
        ) : null}

        <div className="space-y-3">
          <PrimaryButton type="submit" disabled={isSubmitting || isRedirecting}>
            {isSubmitting ? "Salvando..." : isRedirecting ? "Redirecionando..." : "Cadastrar paciente"}
          </PrimaryButton>
          <Link href="/pacientes" className="block text-center text-sm font-semibold text-muted">
            Cancelar
          </Link>
        </div>
      </form>
    </AppScreen>
  );
}

