import { apiRequest } from "@/shared/lib/api";
import { ApiErrorResponse } from "@/shared/types/api";
import { LoginCredentials, LoginErrors } from "./types";

interface LoginSuccessData {
  user: {
    id: number;
    name: string;
    email: string;
  };
  access_token: string;
  refresh_token: string;
}

type SubmitLoginResult =
  | {
      ok: false;
      errors: LoginErrors;
      message: string;
    }
  | {
      ok: true;
      errors: LoginErrors;
      message: string;
      data: LoginSuccessData;
    };

function validateLoginForm(data: LoginCredentials) {
  const errors: LoginErrors = {};

  if (!data.email.trim()) {
    errors.email = "Informe seu e-mail.";
  }

  if (!data.password.trim()) {
    errors.password = "Informe sua senha.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export async function submitLogin(data: LoginCredentials): Promise<SubmitLoginResult> {
  const result = validateLoginForm(data);
  if (!result.isValid) {
    return {
      ok: false,
      errors: result.errors,
      message: "Revise os campos destacados antes de entrar.",
    };
  }

  const response = await apiRequest<LoginSuccessData>("/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    const payload = response.payload as ApiErrorResponse | null;
    return {
      ok: false,
      errors: {},
      message: payload?.message || "Nao foi possivel entrar agora.",
    };
  }

  return {
    ok: true,
    errors: {},
    message: response.payload.message,
    data: response.payload.data,
  };
}
