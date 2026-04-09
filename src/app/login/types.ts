export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginOption {
  label: string;
  href: string;
}

export type LoginErrors = Partial<Record<keyof LoginCredentials, string>>;
