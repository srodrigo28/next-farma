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
