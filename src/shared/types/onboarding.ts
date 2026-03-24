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
