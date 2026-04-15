"use client";

import Link from "next/link";
import { FormEvent, use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CloseIcon } from "@/shared/components/AppIcons";
import { AppScreen } from "@/shared/components/AppScreen";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { deleteHandoffNote, updateHandoffNote } from "../actions";
import { getHandoffRecordById, getHandoffShiftOptions, getHandoffUnitOptions } from "../data";
import { HandoffRecordItem, NewHandoffNoteErrors, NewHandoffNoteFormData } from "../types";

function getCachedHandoffRecord(id: string) {
  try {
    const cached = window.sessionStorage.getItem(`next-farma.handoff.${id}`);
    return cached ? (JSON.parse(cached) as HandoffRecordItem) : null;
  } catch {
    return null;
  }
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-semibold tracking-[0.01em] text-foreground">{children}</span>;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="text-sm font-medium text-danger">{message}</span>;
}

function DeleteConfirmation({
  record,
  isDeleting,
  onCancel,
  onConfirm,
}: {
  record: HandoffRecordItem;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <section className="rounded-[24px] border border-[#f1c7c2] bg-[#fff6f5] p-5 shadow-[0_14px_28px_rgba(198,83,73,0.08)]">
      <div className="space-y-3 text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-[#9f342c]">Excluir passagem?</p>
        <p className="text-2xl font-bold leading-tight text-[#321817]">{record.shiftLabel}</p>
        <p className="mx-auto max-w-[270px] text-sm leading-6 text-[#7a4a45]">
          Esta ação removerá o registro do dia {record.date}. Confirme apenas se deseja apagar esses dados.
        </p>
      </div>
      <div className="mt-5 grid gap-3 min-[360px]:grid-cols-2">
        <button
          type="button"
          onClick={onConfirm}
          disabled={isDeleting}
          className="min-h-11 rounded-lg bg-[#c65349] px-4 text-sm font-bold text-white shadow-[0_12px_22px_rgba(198,83,73,0.18)] transition hover:bg-[#ad4038] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDeleting ? "Excluindo..." : "Excluir passagem"}
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

export default function EditarPassagemPlantaoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [record, setRecord] = useState<HandoffRecordItem | null>(null);
  const [form, setForm] = useState<NewHandoffNoteFormData>({ unit: "pronto-socorro", shift: "manha", summary: "" });
  const [errors, setErrors] = useState<NewHandoffNoteErrors>({});
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadRecord() {
      const payload = await getHandoffRecordById(id);
      if (!active) return;

      const fallbackRecord = payload || getCachedHandoffRecord(id);

      if (!fallbackRecord) {
        setFeedback("Não foi possível carregar essa passagem de plantão. Atualize a API e tente novamente.");
        setIsLoading(false);
        return;
      }

      setRecord(fallbackRecord);
      setForm({ unit: fallbackRecord.unit, shift: fallbackRecord.shift, summary: fallbackRecord.summary });
      if (!payload) {
        setFeedback("Registro carregado a partir da lista. Se salvar ou excluir falhar, atualize a API online.");
      }
      setIsLoading(false);
    }

    void loadRecord();

    return () => {
      active = false;
    };
  }, [id]);

  function updateField<Key extends keyof NewHandoffNoteFormData>(key: Key, value: NewHandoffNoteFormData[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setFeedback("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting || isDeleting) return;

    setIsSubmitting(true);
    const result = await updateHandoffNote(id, form);
    setErrors(result.errors);
    setFeedback(result.message);
    setIsSubmitting(false);
    if (result.ok) router.push("/passagem-plantao");
  }

  async function handleDelete() {
    if (isDeleting) return;

    setIsDeleting(true);
    const result = await deleteHandoffNote(id);
    setFeedback(result.message);
    setIsDeleting(false);
    if (result.ok) router.push("/passagem-plantao");
  }

  const isMissing = !record && !isLoading;
  const hasErrors = Object.keys(errors).length > 0 || isMissing;

  return (
    <AppScreen className="space-y-6">
      <section className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]">
        <div className="relative space-y-2 text-center">
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isLoading || !record}
            className="absolute right-0 top-0 flex h-9 w-9 items-center justify-center rounded-xl border border-[#f1c7c2] bg-white text-[#c65349] shadow-[0_8px_18px_rgba(198,83,73,0.08)] transition-all hover:-translate-y-0.5 hover:border-[#df8a81] hover:bg-[#fff6f5] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c65349]/15 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            aria-label="Excluir passagem"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
          <h1 className="text-3xl font-bold text-foreground">Editar passagem</h1>
          <p className="text-base leading-6 text-muted">Atualize ou remova o registro selecionado.</p>
        </div>
      </section>

      {showDeleteConfirm && record ? (
        <DeleteConfirmation
          record={record}
          isDeleting={isDeleting}
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
        />
      ) : isLoading ? (
        <section className="rounded-[28px] border border-white/70 bg-white/85 p-5 text-center text-sm font-semibold text-muted shadow-[0_16px_32px_rgba(16,33,62,0.06)]">
          Carregando passagem...
        </section>
      ) : record ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]">
            <div className="space-y-4">
              <label className="flex flex-col gap-2.5">
                <FieldLabel>Unidade</FieldLabel>
                <select
                  value={form.unit}
                  onChange={(event) => updateField("unit", event.target.value)}
                  className={`min-h-14 rounded-2xl border bg-white px-4 text-base text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)] outline-none transition-all focus:ring-4 ${errors.unit ? "border-danger focus:border-danger focus:ring-danger/10" : "border-border focus:border-primary focus:ring-primary/10"}`}
                >
                  {getHandoffUnitOptions().map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <FieldError message={errors.unit} />
              </label>

              <label className="flex flex-col gap-2.5">
                <FieldLabel>Plantão</FieldLabel>
                <select
                  value={form.shift}
                  onChange={(event) => updateField("shift", event.target.value)}
                  className={`min-h-14 rounded-2xl border bg-white px-4 text-base text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)] outline-none transition-all focus:ring-4 ${errors.shift ? "border-danger focus:border-danger focus:ring-danger/10" : "border-border focus:border-primary focus:ring-primary/10"}`}
                >
                  {getHandoffShiftOptions().map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <FieldError message={errors.shift} />
              </label>

              <label className="flex flex-col gap-2.5">
                <FieldLabel>Resumo *</FieldLabel>
                <textarea
                  value={form.summary}
                  onChange={(event) => updateField("summary", event.target.value)}
                  rows={6}
                  className={`rounded-2xl border bg-white px-4 py-3 text-base text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)] outline-none transition-all placeholder:text-muted/70 focus:ring-4 ${errors.summary ? "border-danger focus:border-danger focus:ring-danger/10" : "border-border focus:border-primary focus:ring-primary/10"}`}
                />
                <FieldError message={errors.summary} />
              </label>
            </div>
          </section>

          {feedback ? (
            <p className={`text-sm font-medium ${hasErrors ? "text-danger" : "text-success"}`}>{feedback}</p>
          ) : null}

          <div className="space-y-3">
            <PrimaryButton type="submit" disabled={isSubmitting || isDeleting}>{isSubmitting ? "Salvando..." : "Salvar alterações"}</PrimaryButton>
            <Link href="/passagem-plantao" className="block text-center text-sm font-semibold text-muted">Voltar para passagens</Link>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {feedback ? <p className="text-center text-sm font-medium text-danger">{feedback}</p> : null}
          <Link href="/passagem-plantao" className="block text-center text-sm font-semibold text-muted">Voltar</Link>
        </div>
      )}
    </AppScreen>
  );
}