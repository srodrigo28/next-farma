import { AlertasPageView } from "./components/AlertasPageView";
import { getAlerts } from "./data";

export default function AlertasPage() {
  return <AlertasPageView alerts={getAlerts()} />;
}
