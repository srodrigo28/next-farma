import { PassagemPlantaoPageView } from "./components/PassagemPlantaoPageView";
import { getHandoffRecords } from "./data";

export default function PassagemPlantaoPage() {
  return <PassagemPlantaoPageView records={getHandoffRecords()} />;
}
