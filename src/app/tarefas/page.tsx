import { TarefasPageView } from "./components/TarefasPageView";
import { getTasks } from "./data";

export default function TarefasPage() {
  return <TarefasPageView tasks={getTasks()} />;
}
