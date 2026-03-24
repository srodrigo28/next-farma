import Link from "next/link";
import { AppScreen } from "@/shared/components/AppScreen";
import { BrandMark } from "@/shared/components/BrandMark";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { TextField } from "@/shared/components/TextField";
import { LoginCredentials, LoginOption } from "@/shared/types";

export function LoginView({
  credentials,
  links,
}: {
  credentials: LoginCredentials;
  links: LoginOption[];
}) {
  return (
    <AppScreen className="flex flex-col justify-center">
      <section className="flex flex-col gap-8 py-6">
        <div className="flex flex-col items-center gap-5 text-center">
          <BrandMark compact />
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
              Bem-vindo ao Next Farma
            </h1>
            <p className="text-lg text-muted">Entre para continuar seu plantao.</p>
          </div>
        </div>

        <div className="space-y-4">
          <PrimaryButton href="/dashboard" variant="ghost" className="gap-3 font-bold">
            <span className="text-xl">G</span>
            Continuar com Google
          </PrimaryButton>
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.24em] text-muted">
            <span className="h-px flex-1 bg-border" />
            ou
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="space-y-4">
            <TextField label="Email" placeholder={credentials.email} type="email" />
            <TextField
              label="Senha"
              placeholder={credentials.password}
              type="password"
            />
          </div>
        </div>

        <div className="space-y-4">
          <PrimaryButton href="/dashboard">Entrar</PrimaryButton>
          <div className="flex items-center justify-between gap-4 text-sm font-bold text-muted">
            <Link href={links[0].href}>{links[0].label}</Link>
            <Link href={links[1].href}>{links[1].label}</Link>
          </div>
        </div>
      </section>
    </AppScreen>
  );
}
