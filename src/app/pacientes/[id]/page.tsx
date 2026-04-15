"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, use, useEffect, useState } from "react";
import { AppScreen } from "@/shared/components/AppScreen";
import { CloseIcon } from "@/shared/components/AppIcons";
import { DatePickerField } from "@/shared/components/DatePickerField";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { getPatientFormUnitOptions, getPatientSexOptions } from "../data";
import { deletePatient, getPatientById, updatePatient } from "../actions";
import { NewPatientFormData, NewPatientFormErrors, PatientSelectOption } from "../types";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-semibold tracking-[0.01em] text-foreground">{children}</span>;
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

function DeleteConfirmation({
  patientName,
  isDeleting,
  onCancel,
  onConfirm,
}: {
  patientName: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <section className="rounded-[24px] border border-[#f1c7c2] bg-[#fff6f5] p-5 shadow-[0_14px_28px_rgba(198,83,73,0.08)]">
      <div className="space-y-3 text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-[#9f342c]">Excluir paciente?</p>
        <p className="text-2xl font-bold leading-tight text-[#321817]">{patientName || "Paciente selecionado"}</p>
        <p className="mx-auto max-w-[270px] text-sm leading-6 text-[#7a4a45]">
          Esta ação removerá o cadastro da lista de pacientes. Confirme apenas se deseja apagar esses dados.
        </p>
      </div>
      <div className="mt-5 grid gap-3 min-[360px]:grid-cols-2">
        <button
          type="button"
          onClick={onConfirm}
          disabled={isDeleting}
          className="min-h-11 rounded-lg bg-[#c65349] px-4 text-sm font-bold text-white shadow-[0_12px_22px_rgba(198,83,73,0.18)] transition hover:bg-[#ad4038] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDeleting ? "Excluindo..." : "Excluir paciente"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isDeleting}
          className="min-h-11 rounded-lg border border-[#f1c7c2] bg-white px-4 text-sm font-bold text-[#7a4a45] transition hover:bg-[#fffafa] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancelar
        </button>
      </div>
    </section>
  );
}

const emptyPatientForm: NewPatientFormData = {
  fullName: "",
  recordId: "",
  sex: "",
  bed: "",
  sector: "",
  admissionDate: "",
  unit: "",
  allergies: "",
  notes: "",
  isTrainingPatient: false,
};

export default function EditarPacientePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [form, setForm] = useState<NewPatientFormData>(emptyPatientForm);
  const [errors, setErrors] = useState<NewPatientFormErrors>({});
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [unitOptions, setUnitOptions] = useState<PatientSelectOption[]>([{ value: "", label: "Selecionar" }]);
  const sexOptions = getPatientSexOptions();

  useEffect(() => {
    let isMounted = true;

    async function loadPageData() {
      const [patient, units] = await Promise.all([getPatientById(id), getPatientFormUnitOptions()]);
      if (!isMounted) return;

      setUnitOptions(units);
      if (patient) {
        setForm(patient);
      } else {
        setFeedback("Paciente não encontrado.");
      }
      setIsLoading(false);
    }

    void loadPageData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  function updateField<Key extends keyof NewPatientFormData>(key: Key, value: NewPatientFormData[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setFeedback("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSaving || isDeleting) return;

    setIsSaving(true);
    const result = await updatePatient(id, form);

    setErrors(result.errors);
    setFeedback(result.message);
    setIsSaving(false);

    if (result.ok) {
      window.setTimeout(() => router.push("/pacientes"), 900);
    }
  }

  async function handleDelete() {
    if (isDeleting) return;

    setIsDeleting(true);
    const result = await deletePatient(id);
    setFeedback(result.message);
    setIsDeleting(false);

    if (result.ok) {
      router.push("/pacientes");
    }
  }

  const isPatientMissing = feedback === "Paciente não encontrado.";
  const hasErrors = Object.keys(errors).length > 0 || isPatientMissing;

  return (
    <AppScreen className="space-y-6">
      <section className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]">
        <div className="relative space-y-2 text-center">
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isLoading || isPatientMissing}
            className="absolute right-0 top-0 flex h-9 w-9 items-center justify-center rounded-xl border border-[#f1c7c2] bg-white text-[#c65349] shadow-[0_8px_18px_rgba(198,83,73,0.08)] transition-all hover:-translate-y-0.5 hover:border-[#df8a81] hover:bg-[#fff6f5] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c65349]/15 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            aria-label="Excluir paciente"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
          <h1 className="text-3xl font-bold text-foreground">Editar paciente</h1>
          <p className="text-base leading-6 text-muted">Atualize os dados principais do paciente.</p>
        </div>
      </section>

      {showDeleteConfirm ? (
        <DeleteConfirmation
          patientName={form.fullName}
          isDeleting={isDeleting}
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
        />
      ) : isLoading ? (
        <section className="rounded-[28px] border border-white/70 bg-white/85 p-5 text-sm font-semibold text-muted shadow-[0_16px_32px_rgba(16,33,62,0.06)]">
          Carregando dados do paciente...
        </section>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]">
            <div className="space-y-4">
              <TextInput label="Nome completo *" placeholder="Digite o nome do paciente" value={form.fullName} error={errors.fullName} onChange={(event) => updateField("fullName", event.target.value)} />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextInput label="Prontuário / CNS *" placeholder="Informe o prontuário" value={form.recordId} error={errors.recordId} onChange={(event) => updateField("recordId", event.target.value)} />
                <SelectField label="Sexo *" value={form.sex} options={sexOptions} error={errors.sex} onChange={(event) => updateField("sex", event.target.value)} />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextInput label="Leito *" placeholder="Ex: 204-B" value={form.bed} error={errors.bed} onChange={(event) => updateField("bed", event.target.value)} />
                <TextInput label="Setor/Ala *" placeholder="Ex: Clínica Médica" value={form.sector} error={errors.sector} onChange={(event) => updateField("sector", event.target.value)} />
              </div>

              <DatePickerField label="Data de internação *" value={form.admissionDate} error={errors.admissionDate} onChange={(value) => updateField("admissionDate", value)} />

              <SelectField label="Unidade *" value={form.unit} options={unitOptions} error={errors.unit} onChange={(event) => updateField("unit", event.target.value)} />

              <TextInput label="Alergias" placeholder="Ex: Penicilina, Sulfas" value={form.allergies} error={errors.allergies} onChange={(event) => updateField("allergies", event.target.value)} />

              <TextAreaField label="Observações" placeholder="Adicione observações clínicas importantes" value={form.notes} error={errors.notes} onChange={(event) => updateField("notes", event.target.value)} />

              <label className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)]">
                <input type="checkbox" checked={form.isTrainingPatient} onChange={(event) => updateField("isTrainingPatient", event.target.checked)} className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                <span>Paciente fictício (para treino/simulação)</span>
              </label>
            </div>
          </section>

          {feedback ? (
            <p className={`text-sm font-medium ${hasErrors ? "text-danger" : "text-success"}`}>{feedback}</p>
          ) : null}

          <div className="space-y-3">
            <PrimaryButton type="submit" disabled={isSaving || isDeleting || isPatientMissing}>
              {isSaving ? "Salvando..." : "Salvar alterações"}
            </PrimaryButton>
            <Link href="/pacientes" className="block text-center text-sm font-semibold text-muted">Voltar para pacientes</Link>
          </div>
        </form>
      )}
    </AppScreen>
  );
}

