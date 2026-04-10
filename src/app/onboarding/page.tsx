import { getDrawerMenu } from "@/app/dashboard/data";
import { getOnboardingSteps } from "@/app/cadastro/data";
import { OnboardingPageView } from "./components/OnboardingPageView";

export default function OnboardingPage() {
  return <OnboardingPageView drawerMenu={getDrawerMenu()} steps={getOnboardingSteps()} />;
}
