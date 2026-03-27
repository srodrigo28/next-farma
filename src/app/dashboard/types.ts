export interface DashboardStat {
  id: string;
  label: string;
  value: number;
  helper: string;
  tone: "primary" | "danger" | "warning" | "info";
}

export interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
}

export interface DrawerMenuItem {
  id: string;
  label: string;
  description: string;
  href: string;
  active?: boolean;
  badge?: string;
}
