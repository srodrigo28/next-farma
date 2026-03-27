import { ServiceOrderFilterOption, ServiceOrderItem } from "./types";

export function getServiceOrderFilters(): ServiceOrderFilterOption[] {
  return [
    { id: "all", label: "Todas" },
    { id: "high", label: "Alta prioridade" },
    { id: "maintenance", label: "Manutenção" },
    { id: "support", label: "Apoio" },
  ];
}

export function getServiceOrders(): ServiceOrderItem[] {
  return [
    {
      id: "os-1",
      title: "Solicitar manutenção do monitor multiparamétrico",
      sector: "UTI adulto",
      priority: "Alta",
      owner: "Engenharia clínica",
      status: "Em aberto",
      openedAt: "Aberta às 07:40",
    },
    {
      id: "os-2",
      title: "Reposição de bombas de infusão na maternidade",
      sector: "Maternidade",
      priority: "Média",
      owner: "Central de equipamentos",
      status: "Em andamento",
      openedAt: "Aberta às 09:10",
    },
  ];
}
