"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { AppScreen } from "@/shared/components/AppScreen";
import { DatePickerField } from "@/shared/components/DatePickerField";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { submitNewTask } from "../actions";
import {
  getNewTaskInitialData,
  getTaskCategoryOptions,
  getTaskPatientOptions,
  getTaskUnitOptions,
} from "../data";
import { NewTaskFormData, NewTaskFormErrors, TaskSelectOption } from "../types";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-semibold tracking-[0.01em] text-foreground">{children}</span>;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="text-sm font-medium text-danger">{message}</span>;
}

function SelectField({ label, value, options, error, onChange }: { label: string; value: string; options: TaskSelectOption[]; error?: string; onChange: (event: ChangeEvent<HTMLSelectElement>) => void; }) {
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

export default function NovaTarefaPage() {
  const [form, setForm] = useState<NewTaskFormData>(getNewTaskInitialData());
  const [errors, setErrors] = useState<NewTaskFormErrors>({});
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<Key extends keyof NewTaskFormData>(key: Key, value: NewTaskFormData[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setFeedback("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const result = await submitNewTask(form);
    setErrors(result.errors);
    setFeedback(result.message);
    setIsSubmitting(false);
    if (result.ok) setForm(getNewTaskInitialData());
  }

  return (
    <AppScreen className="space-y-6">
      <section className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-foreground">Nova tarefa</h1>
          <p className="text-base leading-6 text-muted">Organize pendências do turno e acompanhe ações prioritárias da equipe.</p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]">
          <div className="space-y-4">
            <label className="flex flex-col gap-2.5">
              <FieldLabel>Título *</FieldLabel>
              <input
                type="text"
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="Ex.: Reavaliar dor após analgesia"
                className={`min-h-14 rounded-2xl border bg-white px-4 text-base text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)] outline-none transition-all placeholder:text-muted/70 focus:ring-4 ${errors.title ? "border-danger focus:border-danger focus:ring-danger/10" : "border-border focus:border-primary focus:ring-primary/10"}`}
              />
              <FieldError message={errors.title} />
            </label>

            <SelectField label="Categoria" value={form.category} options={getTaskCategoryOptions()} error={errors.category} onChange={(event) => updateField("category", event.target.value)} />
            <SelectField label="Paciente" value={form.patientId} options={getTaskPatientOptions()} onChange={(event) => updateField("patientId", event.target.value)} />
            <SelectField label="Unidade" value={form.unit} options={getTaskUnitOptions()} error={errors.unit} onChange={(event) => updateField("unit", event.target.value)} />

            <DatePickerField
              label="Data e hora limite *"
              mode="datetime"
              value={form.dueAt}
              error={errors.dueAt}
              onChange={(value) => updateField("dueAt", value)}
            />

            <label className="flex flex-col gap-2.5">
              <FieldLabel>Notas</FieldLabel>
              <textarea
                value={form.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                rows={5}
                placeholder="Contexto, observações clínicas e orientações para o turno..."
                className="rounded-2xl border border-border bg-white px-4 py-3 text-base text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)] outline-none transition-all placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>
          </div>
        </section>

        {feedback ? (
          <p className={`text-sm font-medium ${Object.keys(errors).length ? "text-danger" : "text-success"}`}>{feedback}</p>
        ) : null}

        <div className="space-y-3">
          <PrimaryButton type="submit" disabled={isSubmitting}>{isSubmitting ? "Criando..." : "Criar tarefa"}</PrimaryButton>
          <Link href="/tarefas" className="block text-center text-sm font-semibold text-muted">Cancelar</Link>
        </div>
      </form>
    </AppScreen>
  );
}


