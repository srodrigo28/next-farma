import { LoginCredentials, LoginOption } from "./types";

export function getDefaultCredentials(): LoginCredentials {
  return {
    email: "",
    password: "",
  };
}

export function getLoginLinks(): LoginOption[] {
  return [
    { label: "Esqueci minha senha", href: "/login" },
    { label: "Criar conta", href: "/cadastro" },
  ];
}

