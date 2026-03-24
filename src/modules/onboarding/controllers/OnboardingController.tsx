import { getOnboardingData } from "../services/onboardingService";
import { OnboardingView } from "../views/OnboardingView";

export function OnboardingController() {
  const steps = getOnboardingData();

  return <OnboardingView steps={steps} />;
}
