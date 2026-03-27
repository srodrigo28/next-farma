import { PacientesPageView } from "./components/PacientesPageView";
import { getPatients, getPatientUnits } from "./data";

export default function PacientesPage() {
  return <PacientesPageView patients={getPatients()} units={getPatientUnits()} />;
}
