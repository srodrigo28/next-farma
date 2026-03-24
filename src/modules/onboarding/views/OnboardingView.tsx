import Link from "next/link";
import { AppScreen } from "@/shared/components/AppScreen";
import { BrandMark } from "@/shared/components/BrandMark";
import { OptionCard } from "@/shared/components/OptionCard";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { StepIndicator } from "@/shared/components/StepIndicator";
import { TextField } from "@/shared/components/TextField";
import { OnboardingStep } from "@/shared/types";

export function OnboardingView({ steps }: { steps: OnboardingStep[] }) {
  return (
    <AppScreen className="space-y-8">
      <section className="flex flex-col items-center gap-4 pt-3 text-center">
        <BrandMark compact />
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-foreground">Cadastro inicial</h1>
          <p className="text-base text-muted">
            Base modular pronta para crescer com autenticacao e API Flask.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="rounded-[28px] border border-white/70 bg-white/75 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]"
          >
            <div className="space-y-5">
              <StepIndicator current={index} total={steps.length} />
              <div className="space-y-1 text-center">
                <h2 className="text-3xl font-extrabold text-foreground">{step.title}</h2>
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
                    label="Numero COREN (opcional)"
                    placeholder="Ex: COREN-SP 123456 TE"
                  />
                  <PrimaryButton href="/dashboard">Comecar a usar</PrimaryButton>
                </div>
              ) : null}

              {step.id === "context" ? (
                <div className="pt-2 text-center text-sm font-bold text-muted">
                  <Link href="/login">Voltar ao login</Link>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </section>
    </AppScreen>
  );
}
