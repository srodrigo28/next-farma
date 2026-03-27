import { OsPageView } from "./components/OsPageView";
import { getServiceOrders } from "./data";

export default function OsPage() {
  return <OsPageView items={getServiceOrders()} />;
}
