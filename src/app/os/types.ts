export interface ServiceOrderItem {
  id: string;
  title: string;
  sector: string;
  priority: "Alta" | "Média" | "Baixa";
  owner: string;
  status: string;
  openedAt: string;
}

export interface ServiceOrderFilterOption {
  id: string;
  label: string;
}
