import { OsPageView } from "./components/OsPageView";
import { getServiceOrders } from "./data";

export default async function OsPage() {
  const items = await getServiceOrders();
  return <OsPageView items={items} />;
}
