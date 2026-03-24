import { LoginCredentials, LoginOption } from "@/shared/types";

export function getDefaultCredentials(): LoginCredentials {
  return {
    email: "voce@nextfarma.com",
    password: "12345678",
  };
}

export function getLoginLinks(): LoginOption[] {
  return [
    { label: "Esqueci minha senha", href: "/login" },
    { label: "Criar conta", href: "/cadastro" },
  ];
}
