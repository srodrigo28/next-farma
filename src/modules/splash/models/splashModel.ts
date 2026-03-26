import { SplashContent } from "@/shared/types";

export function splashModel(): SplashContent {
  return {
    eyebrow: "Arquitetura modular pronta para crescer",
    title: "Fluxos clínicos em uma experiência simples, leve e mobile-first.",
    subtitle:
      "Começamos pela splash, autenticação e dashboard para estabelecer uma base MVC organizada por módulos.",
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
