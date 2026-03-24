import { DashboardStat, DrawerMenuItem, QuickAccessItem } from "@/shared/types";

export function getDashboardStats(): DashboardStat[] {
  return [
    {
      id: "medicacoes",
      label: "Medicacoes (2h)",
      value: 0,
      helper: "Proximas administracoes",
      tone: "primary",
    },
    {
      id: "vencidas",
      label: "Medicacoes vencidas",
      value: 12,
      helper: "Atencao imediata",
      tone: "danger",
    },
    {
      id: "pendencias",
      label: "Pendentes",
      value: 0,
      helper: "Neste plantao",
      tone: "warning",
    },
    {
      id: "pacientes",
      label: "Pacientes",
      value: 0,
      helper: "Internados",
      tone: "info",
    },
  ];
}

export function getQuickAccess(): QuickAccessItem[] {
  return [
    {
      id: "prescricao",
      title: "Nova prescricao",
      description: "Acesse medicamentos, protocolos e observacoes.",
    },
    {
      id: "plantao",
      title: "Passagem de plantao",
      description: "Registre pendencias e alinhe o turno com a equipe.",
    },
    {
      id: "alertas",
      title: "Alertas clinicos",
      description: "Acompanhe vencimentos, riscos e medicacoes prioritarias.",
    },
  ];
}

export function getDrawerMenu(): DrawerMenuItem[] {
  return [
    {
      id: "overview",
      label: "Nao se trata de uma questao de...",
      description: "Painel principal e prioridades do turno.",
      href: "/dashboard",
    },
    {
      id: "patients",
      label: "Pacientes",
      description: "Internados, triagem e historico rapido.",
      href: "/pacientes",
    },
    {
      id: "medications",
      label: "Medicamentos",
      description: "Aprazamento, checagem e administracao.",
      href: "/medicamentos",
    },
    {
      id: "os",
      label: "OS",
      description: "Solicitacoes operacionais da unidade.",
      href: "/os",
    },
    {
      id: "vitals",
      label: "Sinais Vitais",
      description: "Lancamentos e acompanhamento em tempo real.",
      href: "/sinais-vitais",
    },
    {
      id: "alerts",
      label: "Alertas",
      description: "Ocorrencias e itens que exigem atencao.",
      href: "/alertas",
      badge: "3",
    },
    {
      id: "protocols",
      label: "Protocolos",
      description: "Padroes assistenciais e condutas.",
      href: "/protocolos",
    },
    {
      id: "legal",
      label: "Legislacao",
      description: "Normas, regras e referencias tecnicas.",
      href: "/legislacao",
    },
    {
      id: "handoff",
      label: "Passagem Plantao",
      description: "Resumo do turno e comunicacao segura.",
      href: "/passagem-plantao",
    },
  ];
}
