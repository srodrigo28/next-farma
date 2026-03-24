import { getDashboardData } from "../services/dashboardService";
import { DashboardView } from "../views/DashboardView";

export function DashboardController() {
  const { drawerMenu, stats, quickAccess } = getDashboardData();

  return (
    <DashboardView
      drawerMenu={drawerMenu}
      stats={stats}
      quickAccess={quickAccess}
    />
  );
}
