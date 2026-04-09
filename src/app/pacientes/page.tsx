import { PacientesPageView } from "./components/PacientesPageView";
import { getPatients, getPatientUnits } from "./data";

export default async function PacientesPage() {
  const [patients, units] = await Promise.all([getPatients(), getPatientUnits()]);

  return <PacientesPageView patients={patients} units={units} />;
}
