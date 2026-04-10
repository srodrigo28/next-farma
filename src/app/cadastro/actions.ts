import { apiRequest, getApiBaseUrl } from "@/shared/lib/api";
import { ApiErrorResponse } from "@/shared/types/api";
import { RegisterFormData, RegisterFormErrors } from "./types";

interface RegisterSuccessData {
  id: number;
  name: string;
  email: string;
}

function validateRegisterForm(data: RegisterFormData) {
  const errors: RegisterFormErrors = {};
  const phoneDigits = data.phone.replace(/\D/g, "");
  const cepDigits = data.cep.replace(/\D/g, "");

  if (!data.name.trim()) {
    errors.name = "Informe seu nome.";
  }

  if (!data.email.trim()) {
    errors.email = "Informe seu e-mail.";
  }

  if (!phoneDigits) {
    errors.phone = "Informe seu telefone.";
  } else if (phoneDigits.length < 10) {
    errors.phone = "Informe um telefone valido.";
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

  if (!cepDigits) {
    errors.cep = "Informe o CEP.";
  } else if (cepDigits.length !== 8) {
    errors.cep = "Informe um CEP valido.";
  }

  if (!data.street.trim()) {
    errors.street = "Informe a rua.";
  }

  if (!data.number.trim()) {
    errors.number = "Informe o numero.";
  }

  if (!data.neighborhood.trim()) {
    errors.neighborhood = "Informe o bairro.";
  }

  if (!data.city.trim()) {
    errors.city = "Informe a cidade.";
  }

  if (!data.state.trim()) {
    errors.state = "Informe o estado.";
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
      phone: data.phone,
      password: data.password,
      coren: data.coren,
      professional_profile: data.professionalProfile,
      work_context: data.workContext,
      primary_unit: data.primaryUnit,
      cep: data.cep,
      street: data.street,
      number: data.number,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      complement: data.complement,
    }),
  });

  if (!response.ok) {
    const payload = response.payload as ApiErrorResponse | null;
    return {
      ok: false,
      errors: (payload?.errors as RegisterFormErrors | undefined) || {},
      message:
        payload?.message ||
        `Nao foi possivel concluir o cadastro. Verifique a API configurada em ${getApiBaseUrl()}.`,
    };
  }

  return {
    ok: true,
    errors: {},
    message: "Cadastro realizado com sucesso.",
    data: response.payload.data,
  };
}
