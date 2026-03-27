import { DashboardPageView } from "./components/DashboardPageView";
import { getDashboardStats, getDrawerMenu, getQuickAccess } from "./data";

export default function DashboardPage() {
  return (
    <DashboardPageView
      drawerMenu={getDrawerMenu()}
      stats={getDashboardStats()}
      quickAccess={getQuickAccess()}
    />
  );
}
