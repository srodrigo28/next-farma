import { AlertasPageView } from "./components/AlertasPageView";
import { getAlerts } from "./data";

export default async function AlertasPage() {
  const alerts = await getAlerts();

  return <AlertasPageView alerts={alerts} />;
}
