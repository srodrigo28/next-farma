import { getOnboardingSteps } from "@/app/cadastro/data";
import { getDrawerMenu } from "@/app/dashboard/data";
import { OnboardingPageView } from "@/app/onboarding/components/OnboardingPageView";

export default function PerfilPage() {
  return <OnboardingPageView drawerMenu={getDrawerMenu()} steps={getOnboardingSteps()} />;
}