import { DashboardPageView } from "./components/DashboardPageView";
import { getDashboardStats, getDrawerMenu, getQuickAccess } from "./data";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <DashboardPageView
      drawerMenu={getDrawerMenu()}
      stats={stats}
      quickAccess={getQuickAccess()}
    />
  );
}
