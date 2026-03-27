import { SinaisVitaisPageView } from "./components/SinaisVitaisPageView";
import { getVitalRecords } from "./data";

export default function SinaisVitaisPage() {
  return <SinaisVitaisPageView records={getVitalRecords()} />;
}
