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
  href: string;
}
