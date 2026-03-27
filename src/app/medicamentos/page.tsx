import { MedicamentosPageView } from "./components/MedicamentosPageView";
import { getMedicationSchedules, getMedicationTabs } from "./data";

export default function MedicamentosPage() {
  return <MedicamentosPageView tabs={getMedicationTabs()} schedules={getMedicationSchedules()} />;
}
