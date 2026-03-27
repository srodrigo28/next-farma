"use client";

import Link from "next/link";
import { useState } from "react";
import { AppScreen } from "@/shared/components/AppScreen";
import { BrandMark } from "@/shared/components/BrandMark";
import { OptionCard } from "@/shared/components/OptionCard";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { StepIndicator } from "@/shared/components/StepIndicator";
import { TextField } from "@/shared/components/TextField";
import { OnboardingStep } from "../types";

export function CadastroPageView({ steps }: { steps: OnboardingStep[] }) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <AppScreen className="space-y-8">
      <section className="flex flex-col items-center gap-4 pt-3 text-center">
        <BrandMark compact />
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Configuração inicial</h1>
          <p className="text-base text-muted">
            Defina seu perfil para personalizar a experiência desde o primeiro acesso.
          </p>
        </div>
      </section>

      <section>
        <div className="rounded-[28px] border border-white/70 bg-white/75 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]">
          <div className="space-y-5">
            <StepIndicator current={currentStep} total={steps.length} />

            <div className="space-y-1 text-center">
              <h2 className="text-3xl font-bold text-foreground">{step.title}</h2>
              <p className="text-base leading-6 text-muted">{step.subtitle}</p>
            </div>

            <div className="space-y-4">
              {step.options.map((option) => (
                <OptionCard key={option.id} option={option} />
              ))}
            </div>

            {step.id === "unit" ? (
              <div className="space-y-4 pt-2">
                <TextField
                  label="Número do COREN (opcional)"
                  placeholder="Ex: COREN-SP 123456 TE"
                />
              </div>
            ) : null}

            <div className="space-y-3 pt-2">
              {isLastStep ? (
                <PrimaryButton href="/dashboard">Concluir configuração</PrimaryButton>
              ) : (
                <PrimaryButton onClick={() => setCurrentStep((value) => value + 1)}>
                  Próximo
                </PrimaryButton>
              )}

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
        </div>
      </section>
    </AppScreen>
  );
}
