import { TarefasPageView } from "./components/TarefasPageView";
import { getTasks } from "./data";

export default async function TarefasPage() {
  const tasks = await getTasks();
  return <TarefasPageView tasks={tasks} />;
}
