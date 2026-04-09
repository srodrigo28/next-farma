import { PassagemPlantaoPageView } from "./components/PassagemPlantaoPageView";
import { getHandoffRecords } from "./data";

export default async function PassagemPlantaoPage() {
  const records = await getHandoffRecords();

  return <PassagemPlantaoPageView records={records} />;
}
