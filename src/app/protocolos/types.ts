export interface ProtocolFilterOption {
  value: string;
  label: string;
  selected?: boolean;
}

export interface ProtocolItem {
  id: string;
  badge: string;
  category: string;
  title: string;
  subtitle: string;
  views: number;
  revision: string;
  favorite?: boolean;
}
