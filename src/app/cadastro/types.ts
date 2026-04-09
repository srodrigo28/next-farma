export interface SelectOption {
  id: string;
  title: string;
  description: string;
  selected?: boolean;
}

export interface OnboardingStep {
  id: string;
  title: string;
  subtitle: string;
  options: SelectOption[];
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  coren: string;
}

export type RegisterFormErrors = Partial<Record<keyof RegisterFormData, string>>;
