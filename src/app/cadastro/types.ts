export type OptionIconName =
  | "shield"
  | "wrench"
  | "graduation-cap"
  | "hospital"
  | "home"
  | "heartbeat"
  | "alert-triangle"
  | "syringe"
  | "lungs"
  | "clipboard";

export interface SelectOption {
  id: string;
  title: string;
  description: string;
  icon?: OptionIconName;
  selected?: boolean;
}

export interface OnboardingStep {
  id: string;
  title: string;
  subtitle: string;
  options: SelectOption[];
}

export interface RegisterStep {
  id: string;
  title: string;
  subtitle: string;
  options?: SelectOption[];
}

export interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  coren: string;
  professionalProfile: string;
  workContext: string;
  primaryUnit: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  complement: string;
}

export type RegisterFormErrors = Partial<Record<keyof RegisterFormData, string>>;
