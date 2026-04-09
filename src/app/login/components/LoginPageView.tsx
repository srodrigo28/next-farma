"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AppScreen } from "@/shared/components/AppScreen";
import { GoogleIcon } from "@/shared/components/AppIcons";
import { BrandMark } from "@/shared/components/BrandMark";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { TextField } from "@/shared/components/TextField";
import { getAuthSession, saveAuthSession } from "@/shared/lib/auth";
import { submitLogin } from "../actions";
import { LoginCredentials, LoginErrors, LoginOption } from "../types";

export function LoginPageView({
  credentials,
  links,
}: {
  credentials: LoginCredentials;
  links: LoginOption[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<LoginCredentials>(credentials);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (getAuthSession()) {
      router.replace("/dashboard");
    }
  }, [router]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const result = await submitLogin(form);
      if (!result.ok) {
        setErrors(result.errors);
        setMessage(result.message);
        return;
      }

      saveAuthSession(result.data.access_token, result.data.user);
      router.push("/dashboard");
    });
  }

  return (
    <AppScreen className="flex flex-col justify-center">
      <section className="flex flex-col gap-8 py-6">
        <div className="flex flex-col items-center gap-5 text-center">
          <BrandMark compact />
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Bem-vindo ao Next Farma
            </h1>
            <p className="text-lg text-muted">Entre para continuar seu plantao.</p>
          </div>
        </div>

        <div className="space-y-4">
          <PrimaryButton href="/dashboard" variant="ghost" className="gap-3">
            <GoogleIcon className="h-5 w-5" />
            Continuar com Google
          </PrimaryButton>
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.24em] text-muted">
            <span className="h-px flex-1 bg-border" />
            ou
            <span className="h-px flex-1 bg-border" />
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <TextField
              label="E-mail"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="voce@nextfarma.com"
              value={form.email}
              error={errors.email}
              onChange={handleChange}
            />
            <TextField
              label="Senha"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="12345678"
              value={form.password}
              error={errors.password}
              onChange={handleChange}
            />

            {message ? <p className="text-sm font-medium text-[#c65349]">{message}</p> : null}

            <div className="space-y-4 pt-2">
              <PrimaryButton type="submit" disabled={isPending}>
                {isPending ? "Entrando..." : "Acessar painel"}
              </PrimaryButton>
              <div className="flex items-center justify-between gap-4 text-sm font-bold text-muted">
                <Link href={links[0].href}>{links[0].label}</Link>
                <Link href={links[1].href}>{links[1].label}</Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </AppScreen>
  );
}
