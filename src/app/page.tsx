"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppScreen } from "@/shared/components/AppScreen";
import { BrandMark } from "@/shared/components/BrandMark";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { getAuthSession, needsProfileCompletion } from "@/shared/lib/auth";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const session = getAuthSession();
    if (!session) return;

    router.replace(needsProfileCompletion(session.user) ? "/cadastro/completar" : "/dashboard");
  }, [router]);

  return (
    <AppScreen className="flex flex-col justify-between gap-10">
      <section className="flex flex-1 flex-col items-center justify-center gap-8 py-6 pb-10 text-center">
        <BrandMark />
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-primary-soft px-4 py-2 text-sm font-bold text-primary-strong">
            📱 Tudo na palma da mão
          </span>
          <h1 className="pt-16 text-3xl font-extrabold leading-tight tracking-tight text-foreground">
            Fluxos clínicos em uma experiência simples.
          </h1>
        </div>
      </section>

      <section className="space-y-4 pb-4">
        <PrimaryButton href="/login">Entrar</PrimaryButton>
        <PrimaryButton href="/cadastro" variant="ghost">
          Ver cadastro inicial
        </PrimaryButton>
      </section>
    </AppScreen>
  );
}
