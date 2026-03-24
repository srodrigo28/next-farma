import {
  getDashboardStats,
  getDrawerMenu,
  getQuickAccess,
} from "../models/dashboardModel";

export function getDashboardData() {
  return {
    drawerMenu: getDrawerMenu(),
    stats: getDashboardStats(),
    quickAccess: getQuickAccess(),
  };
}
