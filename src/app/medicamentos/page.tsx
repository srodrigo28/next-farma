import { MedicamentosPageView } from "./components/MedicamentosPageView";
import { getMedicationSchedules, getMedicationTabs } from "./data";

export default async function MedicamentosPage() {
  const schedules = await getMedicationSchedules();

  return <MedicamentosPageView tabs={getMedicationTabs()} schedules={schedules} />;
}
