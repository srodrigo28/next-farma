"use client";

import { useEffect, useState, useTransition } from "react";
import { AppScreen } from "@/shared/components/AppScreen";
import { OptionCard } from "@/shared/components/OptionCard";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { StepIndicator } from "@/shared/components/StepIndicator";
import { WorkspaceShell } from "@/shared/components/WorkspaceShell";
import { apiGet, apiRequest } from "@/shared/lib/api";
import { DrawerMenuItem, OnboardingStep } from "@/shared/types";

interface OnboardingPayload {
  professional_profile: string | null;
  work_context: string | null;
  primary_unit: string | null;
  onboarding_completed_at: string | null;
}

interface OnboardingErrors {
  professional_profile?: string;
  work_context?: string;
  primary_unit?: string;
}

function syncSelectedOptions(steps: OnboardingStep[], values: OnboardingPayload) {
  const selectedByStep: Record<string, string | null> = {
    profile: values.professional_profile,
    context: values.work_context,
    unit: values.primary_unit,
  };

  return steps.map((step) => ({
    ...step,
    options: step.options.map((option) => ({
      ...option,
      selected: option.id === selectedByStep[step.id],
    })),
  }));
}

function updateSelectedOption(steps: OnboardingStep[], stepId: string, optionId: string) {
  return steps.map((step) => {
    if (step.id !== stepId) return step;
    return {
      ...step,
      options: step.options.map((option) => ({
        ...option,
        selected: option.id === optionId,
      })),
    };
  });
}

function formatCompletedAt(value: string | null) {
  if (!value) return null;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(parsed);
}

export function OnboardingPageView({
  drawerMenu,
  steps,
}: {
  drawerMenu: DrawerMenuItem[];
  steps: OnboardingStep[];
}) {
  const [wizardSteps, setWizardSteps] = useState(steps);
  const [payload, setPayload] = useState<OnboardingPayload>({
    professional_profile: null,
    work_context: null,
    primary_unit: null,
    onboarding_completed_at: null,
  });
  const [errors, setErrors] = useState<OnboardingErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let active = true;

    async function loadOnboarding() {
      const response = await apiGet<OnboardingPayload>("/api/v1/users/me/onboarding", undefined, true);

      if (!active) return;

      if (!response) {
        setMessage("Nao foi possivel carregar seu onboarding agora.");
        setIsLoading(false);
        return;
      }

      setPayload(response.data);
      setWizardSteps(syncSelectedOptions(steps, response.data));
      setIsLoading(false);
    }

    void loadOnboarding();

    return () => {
      active = false;
    };
  }, [steps]);

  function handleSelect(stepId: string, optionId: string) {
    const fieldByStep: Record<string, keyof OnboardingPayload> = {
      profile: "professional_profile",
      context: "work_context",
      unit: "primary_unit",
    };
    const fieldName = fieldByStep[stepId];

    setMessage(null);
    setErrors((current) => ({ ...current, [fieldName]: undefined }));
    setWizardSteps((current) => updateSelectedOption(current, stepId, optionId));
    setPayload((current) => ({
      ...current,
      [fieldName]: optionId,
    }));
  }

  const canSave = Boolean(payload.professional_profile && payload.work_context && payload.primary_unit);

  function handleSave() {
    setMessage(null);
    setErrors({});

    startTransition(async () => {
      const response = await apiRequest<OnboardingPayload>(
        "/api/v1/users/me/onboarding",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            professional_profile: payload.professional_profile,
            work_context: payload.work_context,
            primary_unit: payload.primary_unit,
          }),
        },
        true,
      );

      if (!response.ok) {
        setErrors((response.payload?.errors as OnboardingErrors | undefined) || {});
        setMessage(response.payload?.message || "Nao foi possivel salvar seu onboarding.");
        return;
      }

      setPayload(response.payload.data);
      setWizardSteps(syncSelectedOptions(steps, response.payload.data));
      setMessage("Onboarding atualizado com sucesso.");
    });
  }

  return (
    <AppScreen flush className="space-y-6">
      <WorkspaceShell items={drawerMenu}>
        <section className="rounded-[28px] bg-linear-to-br from-[#eefaf9] via-white to-[#f8fcff] p-5 shadow-[0_18px_32px_rgba(15,31,56,0.07)] ring-1 ring-white/80">
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-strong">
              Preferencias do usuario
            </p>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Meu onboarding</h1>
                <p className="max-w-xl text-sm leading-6 text-muted">
                  Revise seu perfil, contexto de atuacao e unidade principal para manter atalhos e prioridades alinhados com a sua rotina.
                </p>
              </div>
              <div className="rounded-[20px] bg-white/90 px-4 py-3 text-right shadow-[0_10px_24px_rgba(15,31,56,0.05)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">Ultima conclusao</p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {formatCompletedAt(payload.onboarding_completed_at) || "Ainda nao concluido"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="rounded-[28px] border border-white/70 bg-white/88 p-5 shadow-[0_16px_28px_rgba(15,31,56,0.06)]">
            <div className="space-y-5">
              <StepIndicator current={wizardSteps.length - 1} total={wizardSteps.length} />

              {isLoading ? (
                <div className="rounded-[22px] bg-surface-alt px-4 py-8 text-center text-sm font-semibold text-muted">
                  Carregando suas preferencias...
                </div>
              ) : (
                <div className="space-y-6">
                  {wizardSteps.map((step, index) => (
                    <section key={step.id} className="space-y-4">
                      <div className="space-y-1">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-strong">
                          Etapa {index + 1}
                        </p>
                        <h2 className="text-2xl font-bold text-foreground">{step.title}</h2>
                        <p className="text-sm leading-6 text-muted">{step.subtitle}</p>
                      </div>

                      <div className="space-y-3">
                        {step.options.map((option) => (
                          <OptionCard
                            key={option.id}
                            option={option}
                            onSelect={(optionId) => handleSelect(step.id, optionId)}
                          />
                        ))}
                      </div>

                      {step.id === "profile" && errors.professional_profile ? (
                        <p className="text-sm font-medium text-[#c65349]">{errors.professional_profile}</p>
                      ) : null}
                      {step.id === "context" && errors.work_context ? (
                        <p className="text-sm font-medium text-[#c65349]">{errors.work_context}</p>
                      ) : null}
                      {step.id === "unit" && errors.primary_unit ? (
                        <p className="text-sm font-medium text-[#c65349]">{errors.primary_unit}</p>
                      ) : null}
                    </section>
                  ))}
                </div>
              )}

              {message ? <p className="text-sm font-medium text-[#c65349]">{message}</p> : null}

              <div className="flex flex-col gap-3 pt-2">
                <PrimaryButton type="button" onClick={handleSave} disabled={isLoading || isPending || !canSave}>
                  {isPending ? "Salvando preferencias..." : "Salvar onboarding"}
                </PrimaryButton>
                <PrimaryButton href="/dashboard" variant="ghost">
                  Voltar ao painel
                </PrimaryButton>
              </div>
            </div>
          </div>
        </section>
      </WorkspaceShell>
    </AppScreen>
  );
}
