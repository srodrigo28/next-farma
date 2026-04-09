import { SinaisVitaisPageView } from "./components/SinaisVitaisPageView";
import { getVitalRecords } from "./data";

export default async function SinaisVitaisPage() {
  const records = await getVitalRecords();

  return <SinaisVitaisPageView records={records} />;
}
