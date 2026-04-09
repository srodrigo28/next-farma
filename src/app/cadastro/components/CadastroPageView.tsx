"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AppScreen } from "@/shared/components/AppScreen";
import { BrandMark } from "@/shared/components/BrandMark";
import { OptionCard } from "@/shared/components/OptionCard";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { StepIndicator } from "@/shared/components/StepIndicator";
import { TextField } from "@/shared/components/TextField";
import { getAuthSession } from "@/shared/lib/auth";
import { submitRegister } from "../actions";
import { getInitialRegisterFormData } from "../data";
import { OnboardingStep, RegisterFormData, RegisterFormErrors } from "../types";

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

export function CadastroPageView({ steps }: { steps: OnboardingStep[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardSteps, setWizardSteps] = useState(steps);
  const [form, setForm] = useState<RegisterFormData>(getInitialRegisterFormData());
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const step = wizardSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === wizardSteps.length - 1;

  useEffect(() => {
    if (getAuthSession()) {
      router.replace("/dashboard");
    }
  }, [router]);

  function handleSelect(optionId: string) {
    setWizardSteps((current) => updateSelectedOption(current, step.id, optionId));
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isLastStep) {
      setCurrentStep((value) => value + 1);
      return;
    }

    setMessage(null);
    startTransition(async () => {
      const result = await submitRegister(form);
      if (!result.ok) {
        setErrors(result.errors);
        setMessage(result.message);
        return;
      }

      router.push("/login");
    });
  }

  return (
    <AppScreen className="space-y-8">
      <section className="flex flex-col items-center gap-4 pt-3 text-center">
        <BrandMark compact />
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Configuracao inicial</h1>
          <p className="text-base text-muted">
            Defina seu perfil para personalizar a experiencia desde o primeiro acesso.
          </p>
        </div>
      </section>

      <section>
        <form
          onSubmit={handleSubmit}
          className="rounded-[28px] border border-white/70 bg-white/75 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]"
        >
          <div className="space-y-5">
            <StepIndicator current={currentStep} total={wizardSteps.length} />

            <div className="space-y-1 text-center">
              <h2 className="text-3xl font-bold text-foreground">{step.title}</h2>
              <p className="text-base leading-6 text-muted">{step.subtitle}</p>
            </div>

            <div className="space-y-4">
              {step.options.map((option) => (
                <OptionCard key={option.id} option={option} onSelect={handleSelect} />
              ))}
            </div>

            {step.id === "unit" ? (
              <div className="space-y-4 pt-2">
                <TextField
                  label="Numero do COREN (opcional)"
                  name="coren"
                  placeholder="Ex: COREN-SP 123456 TE"
                  value={form.coren}
                  error={errors.coren}
                  onChange={handleChange}
                />
                <TextField
                  label="Nome completo"
                  name="name"
                  placeholder="Seu nome"
                  value={form.name}
                  error={errors.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
                <TextField
                  label="E-mail"
                  name="email"
                  type="email"
                  placeholder="voce@nextfarma.com"
                  value={form.email}
                  error={errors.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
                <TextField
                  label="Senha"
                  name="password"
                  type="password"
                  placeholder="Minimo de 8 caracteres"
                  value={form.password}
                  error={errors.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <TextField
                  label="Confirmar senha"
                  name="confirmPassword"
                  type="password"
                  placeholder="Digite novamente sua senha"
                  value={form.confirmPassword}
                  error={errors.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>
            ) : null}

            {message ? <p className="text-sm font-medium text-[#c65349]">{message}</p> : null}

            <div className="space-y-3 pt-2">
              <PrimaryButton type="submit" disabled={isPending}>
                {isLastStep ? (isPending ? "Concluindo..." : "Concluir configuracao") : "Proximo"}
              </PrimaryButton>

              {!isFirstStep ? (
                <PrimaryButton
                  variant="ghost"
                  onClick={() => setCurrentStep((value) => value - 1)}
                >
                  Voltar
                </PrimaryButton>
              ) : (
                <div className="pt-1 text-center text-sm font-bold text-muted">
                  <Link href="/login">Voltar ao login</Link>
                </div>
              )}
            </div>
          </div>
        </form>
      </section>
    </AppScreen>
  );
}
