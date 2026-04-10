import { CadastroPageView } from "./components/CadastroPageView";
import { getRegisterSteps } from "./data";

export default function CadastroPage() {
  return <CadastroPageView steps={getRegisterSteps()} />;
}
