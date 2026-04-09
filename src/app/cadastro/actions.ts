import { apiRequest } from "@/shared/lib/api";
import { ApiErrorResponse } from "@/shared/types/api";
import { RegisterFormData, RegisterFormErrors } from "./types";

interface RegisterSuccessData {
  id: number;
  name: string;
  email: string;
}

function validateRegisterForm(data: RegisterFormData) {
  const errors: RegisterFormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Informe seu nome.";
  }

  if (!data.email.trim()) {
    errors.email = "Informe seu e-mail.";
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

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export async function submitRegister(data: RegisterFormData) {
  const result = validateRegisterForm(data);
  if (!result.isValid) {
    return {
      ok: false,
      errors: result.errors,
      message: "Revise os campos destacados antes de concluir.",
    };
  }

  const response = await apiRequest<RegisterSuccessData>("/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    const payload = response.payload as ApiErrorResponse | null;
    return {
      ok: false,
      errors: {},
      message: payload?.message || "Nao foi possivel concluir o cadastro.",
    };
  }

  return {
    ok: true,
    errors: {},
    message: "Cadastro realizado com sucesso.",
    data: response.payload.data,
  };
}
