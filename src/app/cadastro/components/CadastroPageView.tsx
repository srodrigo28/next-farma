"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangleIcon, BrandPillIcon, CheckIcon, SearchIcon } from "@/shared/components/AppIcons";
import { AppScreen } from "@/shared/components/AppScreen";
import { OptionCard } from "@/shared/components/OptionCard";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { StepIndicator } from "@/shared/components/StepIndicator";
import { TextField } from "@/shared/components/TextField";
import { getAuthSession } from "@/shared/lib/auth";
import { submitRegister } from "../actions";
import { getInitialRegisterFormData } from "../data";
import { RegisterFormData, RegisterFormErrors, RegisterStep } from "../types";

interface ViaCepPayload {
  cep?: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  cidade?: string;
  uf?: string;
  estado?: string;
  erro?: boolean;
}

const CHOICE_AUTO_ADVANCE_MS = 4000;

function updateSelectedOption(steps: RegisterStep[], stepId: string, optionId: string) {
  return steps.map((step) => {
    if (step.id !== stepId || !step.options) return step;
    return {
      ...step,
      options: step.options.map((option) => ({
        ...option,
        selected: option.id === optionId,
      })),
    };
  });
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatCep(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function isValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value.trim());
}

function validateAccountStep(data: RegisterFormData) {
  const errors: RegisterFormErrors = {};
  const phoneDigits = data.phone.replace(/\D/g, "");

  if (!data.name.trim()) {
    errors.name = "Informe seu nome completo.";
  }

  if (!data.email.trim()) {
    errors.email = "Informe seu e-mail.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!phoneDigits) {
    errors.phone = "Informe seu telefone.";
  } else if (phoneDigits.length < 10) {
    errors.phone = "Informe um telefone válido.";
  }

  if (!data.password.trim()) {
    errors.password = "Informe uma senha.";
  } else if (data.password.trim().length < 8) {
    errors.password = "A senha deve ter pelo menos 8 caracteres.";
  }

  if (!data.confirmPassword.trim()) {
    errors.confirmPassword = "Confirme sua senha.";
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "As senhas precisam ser iguais.";
  }

  return errors;
}

function validateAddressStep(data: RegisterFormData) {
  const errors: RegisterFormErrors = {};
  const cepDigits = data.cep.replace(/\D/g, "");

  if (!cepDigits) {
    errors.cep = "Informe o CEP.";
  } else if (cepDigits.length !== 8) {
    errors.cep = "Informe um CEP válido.";
  }

  if (!data.street.trim()) {
    errors.street = "Informe a rua.";
  }
  if (!data.number.trim()) {
    errors.number = "Informe o número.";
  }
  if (!data.neighborhood.trim()) {
    errors.neighborhood = "Informe o bairro.";
  }
  if (!data.city.trim()) {
    errors.city = "Informe a cidade.";
  }
  if (!data.state.trim()) {
    errors.state = "Informe a UF.";
  } else if (data.state.trim().length !== 2) {
    errors.state = "Informe uma UF válida.";
  }

  return errors;
}

function getFieldValidity(field: keyof RegisterFormData, form: RegisterFormData) {
  switch (field) {
    case "name":
      return form.name.trim().length >= 3;
    case "email":
      return isValidEmail(form.email);
    case "phone":
      return form.phone.replace(/\D/g, "").length >= 10;
    case "password":
      return form.password.trim().length >= 8;
    case "confirmPassword":
      return form.confirmPassword.trim() !== "" && form.confirmPassword === form.password;
    case "coren":
      return form.coren.trim().length >= 4;
    case "cep":
      return form.cep.replace(/\D/g, "").length === 8;
    case "street":
      return form.street.trim().length >= 3;
    case "number":
      return form.number.trim().length >= 1;
    case "neighborhood":
      return form.neighborhood.trim().length >= 2;
    case "city":
      return form.city.trim().length >= 2;
    case "state":
      return form.state.trim().length === 2;
    case "complement":
      return form.complement.trim().length >= 2;
    default:
      return false;
  }
}

function ValidationIcon({
  valid,
  invalid,
  loading = false,
}: {
  valid: boolean;
  invalid: boolean;
  loading?: boolean;
}) {
  if (loading) {
    return <SearchIcon className="h-4 w-4 animate-pulse text-primary" />;
  }

  if (valid) {
    return <CheckIcon className="h-4 w-4 animate-pulse text-[#159a74]" />;
  }

  if (invalid) {
    return <AlertTriangleIcon className="h-4 w-4 text-[#c65349]" />;
  }

  return null;
}

export function CadastroPageView({ steps }: { steps: RegisterStep[] }) {
  const router = useRouter();
  const autoAdvanceTimeoutRef = useRef<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardSteps, setWizardSteps] = useState(steps);
  const [form, setForm] = useState<RegisterFormData>(getInitialRegisterFormData());
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof RegisterFormData, boolean>>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [messageTone, setMessageTone] = useState<"error" | "success">("error");
  const [cepStatus, setCepStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [lastCepLookup, setLastCepLookup] = useState("");
  const [autoAdvanceOptionId, setAutoAdvanceOptionId] = useState<string | null>(null);
  const step = wizardSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === wizardSteps.length - 1;
  const isChoiceStep = Boolean(step.options?.length);
  const isAccountStep = step.id === "account";
  const isAddressStep = step.id === "address";

  useEffect(() => {
    if (getAuthSession()) {
      router.replace("/dashboard");
    }
  }, [router]);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimeoutRef.current) {
        window.clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const cepDigits = form.cep.replace(/\D/g, "");
    if (!isAddressStep || cepDigits.length !== 8 || cepDigits === lastCepLookup) {
      return;
    }

    let active = true;

    async function lookupCep() {
      setCepStatus("loading");

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`);
        const payload = (await response.json()) as ViaCepPayload;
        if (!active) return;

        if (!response.ok || payload.erro) {
          setCepStatus("error");
          setErrors((current) => ({ ...current, cep: "Não encontramos esse CEP." }));
          return;
        }

        const cepCity = payload.localidade || payload.cidade || "";
        const cepState = payload.uf || payload.estado || "";

        setForm((current) => ({
          ...current,
          cep: formatCep(payload.cep || cepDigits),
          street: payload.logradouro || current.street,
          neighborhood: payload.bairro || current.neighborhood,
          city: cepCity || (current.city === current.state ? "" : current.city),
          state: (cepState || current.state).toUpperCase(),
        }));
        setErrors((current) => ({
          ...current,
          cep: undefined,
          street: undefined,
          neighborhood: undefined,
          city: undefined,
          state: undefined,
        }));
        setTouched((current) => ({
          ...current,
          cep: true,
          street: true,
          neighborhood: true,
          city: true,
          state: true,
        }));
        setCepStatus("success");
        setLastCepLookup(cepDigits);
      } catch {
        if (!active) return;
        setCepStatus("error");
        setErrors((current) => ({ ...current, cep: "Não foi possível consultar o CEP agora." }));
      }
    }

    void lookupCep();

    return () => {
      active = false;
    };
  }, [form.cep, isAddressStep, lastCepLookup]);

  function markTouched(fields: Array<keyof RegisterFormData>) {
    setTouched((current) => ({
      ...current,
      ...Object.fromEntries(fields.map((field) => [field, true])),
    }));
  }

  function handleSelect(optionId: string) {
    const formFieldByStep: Record<string, keyof RegisterFormData> = {
      profile: "professionalProfile",
      context: "workContext",
      unit: "primaryUnit",
    };
    const fieldName = formFieldByStep[step.id];

    if (autoAdvanceTimeoutRef.current) {
      window.clearTimeout(autoAdvanceTimeoutRef.current);
    }

    setMessageTone("success");
    setMessage("Opção selecionada. Avançando automaticamente em 4 segundos...");
    setWizardSteps((current) => updateSelectedOption(current, step.id, optionId));
    setAutoAdvanceOptionId(optionId);

    if (fieldName) {
      setForm((current) => ({
        ...current,
        [fieldName]: optionId,
      }));
    }

    autoAdvanceTimeoutRef.current = window.setTimeout(() => {
      setMessage(null);
      setAutoAdvanceOptionId(null);
      setCurrentStep((value) => value + 1);
      autoAdvanceTimeoutRef.current = null;
    }, CHOICE_AUTO_ADVANCE_MS);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const fieldName = name as keyof RegisterFormData;
    let nextValue = value;

    if (fieldName === "phone") {
      nextValue = formatPhone(value);
    }
    if (fieldName === "cep") {
      nextValue = formatCep(value);
      setCepStatus("idle");
      setLastCepLookup("");
    }
    if (fieldName === "state") {
      nextValue = value.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase();
    }

    setForm((current) => ({ ...current, [fieldName]: nextValue }));
    setErrors((current) => ({ ...current, [fieldName]: undefined }));
    setTouched((current) => ({ ...current, [fieldName]: true }));
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const fieldName = event.target.name as keyof RegisterFormData;
    setTouched((current) => ({ ...current, [fieldName]: true }));
  }

  const accountFields = useMemo(
    () => ["name", "email", "phone", "password", "confirmPassword"] as Array<keyof RegisterFormData>,
    [],
  );
  const addressFields = useMemo(
    () => ["cep", "street", "number", "neighborhood", "city", "state"] as Array<keyof RegisterFormData>,
    [],
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isChoiceStep) {
      return;
    }

    if (isAccountStep) {
      const stepErrors = validateAccountStep(form);
      markTouched(accountFields);

      if (Object.keys(stepErrors).length > 0) {
        setErrors((current) => ({ ...current, ...stepErrors }));
        setMessageTone("error");
        setMessage("Preencha os campos obrigatórios para continuar.");
        return;
      }

      setMessage(null);
      setCurrentStep((value) => value + 1);
      return;
    }

    if (isAddressStep) {
      const stepErrors = validateAddressStep(form);
      markTouched(addressFields);

      if (Object.keys(stepErrors).length > 0) {
        setErrors((current) => ({ ...current, ...stepErrors }));
        setMessageTone("error");
        setMessage("Revise os campos destacados antes de concluir.");
        return;
      }
    }

    setMessage(null);
    startTransition(async () => {
      const result = await submitRegister(form);
      if (!result.ok) {
        setErrors(result.errors);
        setMessageTone("error");
        setMessage(result.message);
        return;
      }

      setMessageTone("success");
      setMessage("Cadastro concluído com sucesso. Redirecionando...");
      router.push("/login");
    });
  }

  function getAdornment(field: keyof RegisterFormData) {
    const touchedField = Boolean(touched[field]);
    const hasValue = form[field].trim() !== "";
    const valid = getFieldValidity(field, form);
    const invalid = touchedField && hasValue && !valid;
    const loading = field === "cep" && cepStatus === "loading";

    if (!hasValue && !touchedField) return undefined;

    return (
      <ValidationIcon
        valid={valid || (field === "cep" && cepStatus === "success")}
        invalid={invalid || (field === "cep" && cepStatus === "error")}
        loading={loading}
      />
    );
  }

  return (
    <AppScreen className="space-y-8">
      <section className="flex flex-col items-center gap-4 pt-3 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-linear-to-br from-primary to-primary-strong text-white shadow-[0_18px_28px_rgba(15,143,176,0.22)]">
          <BrandPillIcon className="h-8 w-8" />
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Nurse Assist Brasil</h1>
          <p className="text-base text-muted">Configuração inicial da conta</p>
        </div>
      </section>

      <section>
        <form
          onSubmit={handleSubmit}
          className="rounded-[28px] border border-white/70 bg-white/75 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]"
        >
          <div className="space-y-5">
            <StepIndicator current={currentStep} total={wizardSteps.length} />

            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="space-y-5"
              >
                <div className="space-y-1 text-center">
                  <h2 className="text-3xl font-bold text-foreground">{step.title}</h2>
                  <p className="text-base leading-6 text-muted">{step.subtitle}</p>
                </div>

                {isChoiceStep ? (
                  <div className="space-y-4">
                    {step.options?.map((option) => (
                      <OptionCard
                        key={option.id}
                        option={option}
                        onSelect={handleSelect}
                        isAdvancing={autoAdvanceOptionId === option.id}
                        advanceDurationMs={CHOICE_AUTO_ADVANCE_MS}
                      />
                    ))}
                  </div>
                ) : null}

                {step.id === "unit" ? (
                  <div className="space-y-4 pt-2">
                    <TextField
                      label="Número do COREN (opcional)"
                      name="coren"
                      placeholder="Ex: COREN-SP 123456 TE"
                      value={form.coren}
                      error={errors.coren}
                      rightAdornment={getAdornment("coren")}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                ) : null}

                {isAccountStep ? (
                  <div className="space-y-4 pt-2">
                    <TextField
                      label="Nome completo"
                      name="name"
                      placeholder="Seu nome"
                      value={form.name}
                      error={errors.name}
                      autoComplete="name"
                      rightAdornment={getAdornment("name")}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      label="E-mail"
                      name="email"
                      type="email"
                      placeholder="voce@nextfarma.com"
                      value={form.email}
                      error={errors.email}
                      autoComplete="email"
                      rightAdornment={getAdornment("email")}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      label="Telefone"
                      name="phone"
                      placeholder="(11) 99999-9999"
                      value={form.phone}
                      error={errors.phone}
                      autoComplete="tel"
                      inputMode="tel"
                      maxLength={15}
                      rightAdornment={getAdornment("phone")}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="grid gap-4 min-[360px]:grid-cols-2">
                      <TextField
                        label="Senha"
                        name="password"
                        type="password"
                        placeholder="Mínimo de 8 caracteres"
                        value={form.password}
                        error={errors.password}
                        autoComplete="new-password"
                        rightAdornment={getAdornment("password")}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <TextField
                        label="Confirmar senha"
                        name="confirmPassword"
                        type="password"
                        placeholder="Repita a senha"
                        value={form.confirmPassword}
                        error={errors.confirmPassword}
                        autoComplete="new-password"
                        rightAdornment={getAdornment("confirmPassword")}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                ) : null}

                {isAddressStep ? (
                  <div className="space-y-4 pt-2">
                    <TextField
                      label="CEP"
                      name="cep"
                      placeholder="00000-000"
                      value={form.cep}
                      error={errors.cep}
                      inputMode="numeric"
                      maxLength={9}
                      rightAdornment={getAdornment("cep")}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      label="Rua"
                      name="street"
                      placeholder="Rua, avenida ou travessa"
                      value={form.street}
                      error={errors.street}
                      autoComplete="address-line1"
                      rightAdornment={getAdornment("street")}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="grid gap-4 min-[360px]:grid-cols-[1fr_1fr]">
                      <TextField
                        label="Número"
                        name="number"
                        placeholder="123"
                        value={form.number}
                        error={errors.number}
                        inputMode="numeric"
                        rightAdornment={getAdornment("number")}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <TextField
                        label="Complemento"
                        name="complement"
                        placeholder="Apto, bloco, referência"
                        value={form.complement}
                        error={errors.complement}
                        rightAdornment={getAdornment("complement")}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <TextField
                      label="Bairro"
                      name="neighborhood"
                      placeholder="Seu bairro"
                      value={form.neighborhood}
                      error={errors.neighborhood}
                      autoComplete="address-level2"
                      rightAdornment={getAdornment("neighborhood")}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="grid gap-4 min-[360px]:grid-cols-[1.4fr_0.8fr]">
                      <TextField
                        label="Cidade"
                        name="city"
                        placeholder="Sua cidade"
                        value={form.city}
                        error={errors.city}
                        autoComplete="address-level1"
                        rightAdornment={getAdornment("city")}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <TextField
                        label="UF"
                        name="state"
                        placeholder="SP"
                        value={form.state}
                        error={errors.state}
                        autoComplete="address-level1"
                        maxLength={2}
                        rightAdornment={getAdornment("state")}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>

            {message ? (
              <p className={`text-sm font-medium ${messageTone === "success" ? "text-[#159a74]" : "text-[#c65349]"}`}>
                {message}
              </p>
            ) : null}

            <div className="space-y-3 pt-2">
              {!isChoiceStep ? (
                <PrimaryButton type="submit" disabled={isPending}>
                  {isLastStep
                    ? isPending
                      ? "Concluindo..."
                      : "Concluir configuração"
                    : "Próximo"}
                </PrimaryButton>
              ) : null}

              {!isFirstStep ? (
                <PrimaryButton
                  variant="ghost"
                  onClick={() => {
                    setMessage(null);
                    setCurrentStep((value) => value - 1);
                  }}
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
