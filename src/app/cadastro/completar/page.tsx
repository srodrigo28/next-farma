"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangleIcon, BrandPillIcon, CheckIcon, SearchIcon } from "@/shared/components/AppIcons";
import { AppScreen } from "@/shared/components/AppScreen";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { StepIndicator } from "@/shared/components/StepIndicator";
import { TextField } from "@/shared/components/TextField";
import { apiGet, apiRequest, getApiBaseUrl } from "@/shared/lib/api";
import { clearAuthSession, getAuthSession, needsProfileCompletion, saveAuthSession } from "@/shared/lib/auth";

interface CompletionFormData {
  name: string;
  phone: string;
  coren: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  complement: string;
}

type CompletionFormErrors = Partial<Record<keyof CompletionFormData, string>>;

interface CompletionStep {
  id: "profile" | "address";
  title: string;
  subtitle: string;
}

interface AuthUserPayload extends CompletionFormData {
  id: number;
  email: string;
}

interface ApiErrorPayload {
  message?: string;
  errors?: CompletionFormErrors;
}

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

function getCompletionSteps(): CompletionStep[] {
  return [
    {
      id: "profile",
      title: "Complete seu cadastro",
      subtitle: "Confirme nome completo e telefone para continuar.",
    },
    {
      id: "address",
      title: "Seu endereço",
      subtitle: "Preencha o CEP e confirme os dados finais antes de entrar no painel.",
    },
  ];
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

function validateProfileStep(data: CompletionFormData) {
  const errors: CompletionFormErrors = {};
  const phoneDigits = data.phone.replace(/\D/g, "");

  if (!data.name.trim()) {
    errors.name = "Informe seu nome completo.";
  }
  if (!phoneDigits) {
    errors.phone = "Informe seu telefone.";
  } else if (phoneDigits.length < 10) {
    errors.phone = "Informe um telefone válido.";
  }

  return errors;
}

function validateAddressStep(data: CompletionFormData) {
  const errors: CompletionFormErrors = {};
  const cepDigits = data.cep.replace(/\D/g, "");

  if (!cepDigits) {
    errors.cep = "Informe o CEP.";
  } else if (cepDigits.length !== 8) {
    errors.cep = "Informe um CEP válido.";
  }
  if (!data.street.trim()) errors.street = "Informe a rua.";
  if (!data.number.trim()) errors.number = "Informe o número.";
  if (!data.neighborhood.trim()) errors.neighborhood = "Informe o bairro.";
  if (!data.city.trim()) errors.city = "Informe a cidade.";
  if (!data.state.trim()) errors.state = "Informe a UF.";
  else if (data.state.trim().length !== 2) errors.state = "Informe uma UF válida.";

  return errors;
}

function isFieldValid(field: keyof CompletionFormData, data: CompletionFormData) {
  switch (field) {
    case "name":
      return data.name.trim().length >= 3;
    case "phone":
      return data.phone.replace(/\D/g, "").length >= 10;
    case "coren":
      return data.coren.trim().length >= 4;
    case "cep":
      return data.cep.replace(/\D/g, "").length === 8;
    case "street":
      return data.street.trim().length >= 3;
    case "number":
      return data.number.trim().length >= 1;
    case "neighborhood":
      return data.neighborhood.trim().length >= 2;
    case "city":
      return data.city.trim().length >= 2;
    case "state":
      return data.state.trim().length === 2;
    case "complement":
      return data.complement.trim().length >= 2;
    default:
      return false;
  }
}

function ValidationIcon({ valid, invalid, loading = false }: { valid: boolean; invalid: boolean; loading?: boolean }) {
  if (loading) return <SearchIcon className="h-4 w-4 animate-pulse text-primary" />;
  if (valid) return <CheckIcon className="h-4 w-4 animate-pulse text-[#159a74]" />;
  if (invalid) return <AlertTriangleIcon className="h-4 w-4 text-[#c65349]" />;
  return null;
}

export default function CompleteCadastroPage() {
  const router = useRouter();
  const steps = useMemo(() => getCompletionSteps(), []);
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<CompletionFormData>({
    name: "",
    phone: "",
    coren: "",
    cep: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    complement: "",
  });
  const [errors, setErrors] = useState<CompletionFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof CompletionFormData, boolean>>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [messageTone, setMessageTone] = useState<"error" | "success">("error");
  const [cepStatus, setCepStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [lastCepLookup, setLastCepLookup] = useState("");
  const isLastStep = currentStep === steps.length - 1;

  useEffect(() => {
    let active = true;

    async function loadUser() {
      const session = getAuthSession();
      if (!session) {
        router.replace("/login");
        return;
      }

      const payload = await apiGet<AuthUserPayload>("/api/v1/auth/me", undefined, true);
      if (!active) return;

      if (!payload) {
        clearAuthSession();
        router.replace("/login");
        return;
      }

      saveAuthSession(session.accessToken, payload.data);

      if (!needsProfileCompletion(payload.data)) {
        router.replace("/dashboard");
        return;
      }

      setForm({
        name: payload.data.name || "",
        phone: payload.data.phone || "",
        coren: payload.data.coren || "",
        cep: payload.data.cep || "",
        street: payload.data.street || "",
        number: payload.data.number || "",
        neighborhood: payload.data.neighborhood || "",
        city: payload.data.city || "",
        state: payload.data.state || "",
        complement: payload.data.complement || "",
      });
      setIsLoading(false);
    }

    void loadUser();

    return () => {
      active = false;
    };
  }, [router]);

  useEffect(() => {
    const cepDigits = form.cep.replace(/\D/g, "");
    if (currentStep !== 1 || cepDigits.length !== 8 || cepDigits === lastCepLookup) return;

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
        setErrors((current) => ({ ...current, cep: undefined, street: undefined, neighborhood: undefined, city: undefined, state: undefined }));
        setTouched((current) => ({ ...current, cep: true, street: true, neighborhood: true, city: true, state: true }));
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
  }, [currentStep, form.cep, lastCepLookup]);

  function markTouched(fields: Array<keyof CompletionFormData>) {
    setTouched((current) => ({ ...current, ...Object.fromEntries(fields.map((field) => [field, true])) }));
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const fieldName = name as keyof CompletionFormData;
    let nextValue = value;

    if (fieldName === "phone") nextValue = formatPhone(value);
    if (fieldName === "cep") {
      nextValue = formatCep(value);
      setCepStatus("idle");
      setLastCepLookup("");
    }
    if (fieldName === "state") nextValue = value.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase();

    setForm((current) => ({ ...current, [fieldName]: nextValue }));
    setErrors((current) => ({ ...current, [fieldName]: undefined }));
    setTouched((current) => ({ ...current, [fieldName]: true }));
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const fieldName = event.target.name as keyof CompletionFormData;
    setTouched((current) => ({ ...current, [fieldName]: true }));
  }

  function getAdornment(field: keyof CompletionFormData) {
    const hasValue = form[field].trim() !== "";
    const touchedField = Boolean(touched[field]);
    if (!hasValue && !touchedField) return undefined;

    return (
      <ValidationIcon
        valid={isFieldValid(field, form) || (field === "cep" && cepStatus === "success")}
        invalid={(touchedField && hasValue && !isFieldValid(field, form)) || (field === "cep" && cepStatus === "error")}
        loading={field === "cep" && cepStatus === "loading"}
      />
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (currentStep === 0) {
      const stepErrors = validateProfileStep(form);
      markTouched(["name", "phone"]);

      if (Object.keys(stepErrors).length > 0) {
        setErrors((current) => ({ ...current, ...stepErrors }));
        setMessageTone("error");
        setMessage("Preencha os campos obrigatórios para continuar.");
        return;
      }

      setMessage(null);
      setCurrentStep(1);
      return;
    }

    const stepErrors = validateAddressStep(form);
    markTouched(["cep", "street", "number", "neighborhood", "city", "state"]);
    if (Object.keys(stepErrors).length > 0) {
      setErrors((current) => ({ ...current, ...stepErrors }));
      setMessageTone("error");
      setMessage("Revise os campos destacados antes de concluir.");
      return;
    }

    setMessage(null);
    startTransition(async () => {
      const response = await apiRequest<AuthUserPayload>(
        "/api/v1/users/me/profile",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
        true,
      );

      if (!response.ok) {
        const payload = response.payload as ApiErrorPayload | null;
        setErrors(payload?.errors || {});
        setMessageTone("error");
        setMessage(payload?.message || `Não foi possível concluir seu cadastro. Verifique a API configurada em ${getApiBaseUrl()}.`);
        return;
      }

      const session = getAuthSession();
      if (session) {
        saveAuthSession(session.accessToken, response.payload.data);
      }

      setMessageTone("success");
      setMessage("Cadastro complementar concluído. Redirecionando...");
      router.push("/dashboard");
    });
  }

  if (isLoading) {
    return (
      <AppScreen className="flex items-center justify-center text-sm font-semibold text-muted">
        Carregando seus dados...
      </AppScreen>
    );
  }

  return (
    <AppScreen className="space-y-8">
      <section className="flex flex-col items-center gap-4 pt-3 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-linear-to-br from-primary to-primary-strong text-white shadow-[0_18px_28px_rgba(15,143,176,0.22)]">
          <BrandPillIcon className="h-8 w-8" />
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Complete seu acesso</h1>
          <p className="text-base text-muted">Faltam alguns dados antes de entrar no painel.</p>
        </div>
      </section>

      <section>
        <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/70 bg-white/75 p-5 shadow-[0_16px_32px_rgba(16,33,62,0.06)]">
          <div className="space-y-5">
            <StepIndicator current={currentStep} total={steps.length} />

            <div className="space-y-1 text-center">
              <h2 className="text-3xl font-bold text-foreground">{steps[currentStep].title}</h2>
              <p className="text-base leading-6 text-muted">{steps[currentStep].subtitle}</p>
            </div>

            {currentStep === 0 ? (
              <div className="space-y-4 pt-2">
                <TextField label="Nome completo" name="name" placeholder="Seu nome" value={form.name} error={errors.name} rightAdornment={getAdornment("name")} onChange={handleChange} onBlur={handleBlur} />
                <TextField label="Telefone" name="phone" placeholder="(11) 99999-9999" value={form.phone} error={errors.phone} inputMode="tel" maxLength={15} rightAdornment={getAdornment("phone")} onChange={handleChange} onBlur={handleBlur} />
                <TextField label="Número do COREN (opcional)" name="coren" placeholder="Ex: COREN-SP 123456 TE" value={form.coren} error={errors.coren} rightAdornment={getAdornment("coren")} onChange={handleChange} onBlur={handleBlur} />
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                <TextField label="CEP" name="cep" placeholder="00000-000" value={form.cep} error={errors.cep} inputMode="numeric" maxLength={9} rightAdornment={getAdornment("cep")} onChange={handleChange} onBlur={handleBlur} />
                <TextField label="Rua" name="street" placeholder="Rua, avenida ou travessa" value={form.street} error={errors.street} rightAdornment={getAdornment("street")} onChange={handleChange} onBlur={handleBlur} />
                <div className="grid gap-4 min-[360px]:grid-cols-[1fr_1fr]">
                  <TextField label="Número" name="number" placeholder="123" value={form.number} error={errors.number} inputMode="numeric" rightAdornment={getAdornment("number")} onChange={handleChange} onBlur={handleBlur} />
                  <TextField label="Complemento" name="complement" placeholder="Apto, bloco, referência" value={form.complement} error={errors.complement} rightAdornment={getAdornment("complement")} onChange={handleChange} onBlur={handleBlur} />
                </div>
                <TextField label="Bairro" name="neighborhood" placeholder="Seu bairro" value={form.neighborhood} error={errors.neighborhood} rightAdornment={getAdornment("neighborhood")} onChange={handleChange} onBlur={handleBlur} />
                <div className="grid gap-4 min-[360px]:grid-cols-[1.4fr_0.8fr]">
                  <TextField label="Cidade" name="city" placeholder="Sua cidade" value={form.city} error={errors.city} rightAdornment={getAdornment("city")} onChange={handleChange} onBlur={handleBlur} />
                  <TextField label="UF" name="state" placeholder="SP" value={form.state} error={errors.state} maxLength={2} rightAdornment={getAdornment("state")} onChange={handleChange} onBlur={handleBlur} />
                </div>
              </div>
            )}

            {message ? <p className={`text-sm font-medium ${messageTone === "success" ? "text-[#159a74]" : "text-[#c65349]"}`}>{message}</p> : null}

            <div className="space-y-3 pt-2">
              <PrimaryButton type="submit" disabled={isPending}>
                {isLastStep ? (isPending ? "Concluindo..." : "Concluir cadastro") : "Próximo"}
              </PrimaryButton>
              {currentStep > 0 ? (
                <PrimaryButton variant="ghost" onClick={() => setCurrentStep((value) => value - 1)}>
                  Voltar
                </PrimaryButton>
              ) : null}
            </div>
          </div>
        </form>
      </section>
    </AppScreen>
  );
}
