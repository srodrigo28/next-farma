import { SplashContent } from "@/shared/types";

export function splashModel(): SplashContent {
  return {
    eyebrow: "Arquitetura modular pronta para crescer",
    title: "Fluxos clinicos em uma experiencia simples, leve e mobile first.",
    subtitle:
      "Comecamos pela splash, autenticacao e dashboard para estabelecer uma base MVC organizada por modulos.",
    primaryAction: {
      label: "Entrar na plataforma",
      href: "/login",
    },
    secondaryAction: {
      label: "Ver cadastro inicial",
      href: "/cadastro",
    },
  };
}
