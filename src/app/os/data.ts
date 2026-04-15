import { apiGet } from "@/shared/lib/api";
import { ServiceOrderFilterOption, ServiceOrderItem } from "./types";

interface ApiServiceOrder {
  id: number;
  title: string;
  sector: string;
  priority: "Alta" | "Média" | "Media" | "Baixa";
  owner: string;
  status: string;
  opened_at: string;
}

export function getServiceOrderFilters(): ServiceOrderFilterOption[] {
  return [
    { id: "all", label: "Todas" },
    { id: "high", label: "Alta prioridade" },
    { id: "maintenance", label: "Manutenção" },
    { id: "support", label: "Apoio" },
  ];
}

function normalizePriority(priority: ApiServiceOrder["priority"]): ServiceOrderItem["priority"] {
  if (priority === "Alta" || priority === "Baixa") return priority;
  return "Média";
}

export async function getServiceOrders(): Promise<ServiceOrderItem[]> {
  const payload = await apiGet<ApiServiceOrder[]>("/api/v1/service-orders");
  if (!payload || !Array.isArray(payload.data)) return [];

  return payload.data.map((item) => ({
    id: String(item.id),
    title: item.title,
    sector: item.sector,
    priority: normalizePriority(item.priority),
    owner: item.owner,
    status: item.status,
    openedAt: item.opened_at,
  }));
}
