import { CadastroPageView } from "./components/CadastroPageView";
import { getOnboardingSteps } from "./data";

export default function CadastroPage() {
  return <CadastroPageView steps={getOnboardingSteps()} />;
}
