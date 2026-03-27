import { DashboardStat, DrawerMenuItem, QuickAccessItem } from "./types";

export function getDashboardStats(): DashboardStat[] {
  return [
    {
      id: "medicacoes",
      label: "Medicações em 2h",
      value: 0,
      helper: "Próximas administrações",
      tone: "primary",
    },
    {
      id: "vencidas",
      label: "Medicações vencidas",
      value: 12,
      helper: "Requer atenção imediata",
      tone: "danger",
    },
    {
      id: "pendencias",
      label: "Pendências",
      value: 0,
      helper: "Neste plantão",
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
      title: "Nova prescrição",
      description: "Registre medicamentos, protocolos e observações do cuidado.",
    },
    {
      id: "plantao",
      title: "Passagem de plantão",
      description: "Organize pendências e alinhe o turno com segurança.",
    },
    {
      id: "alertas",
      title: "Alertas clínicos",
      description: "Acompanhe vencimentos, riscos e itens prioritários.",
    },
  ];
}

export function getDrawerMenu(): DrawerMenuItem[] {
  return [
    {
      id: "overview",
      label: "Visão geral",
      description: "Painel principal com prioridades do turno.",
      href: "/dashboard",
    },
    {
      id: "patients",
      label: "Pacientes",
      description: "Internados, triagem e histórico resumido.",
      href: "/pacientes",
    },
    {
      id: "medications",
      label: "Medicamentos",
      description: "Aprazamento, checagem e administração segura.",
      href: "/medicamentos",
    },
    {
      id: "os",
      label: "Ordens de serviço",
      description: "Solicitações operacionais e chamados da unidade.",
      href: "/os",
    },
    {
      id: "vitals",
      label: "Sinais vitais",
      description: "Lançamentos e acompanhamento em tempo real.",
      href: "/sinais-vitais",
    },
    {
      id: "alerts",
      label: "Alertas",
      description: "Ocorrências e itens que exigem atenção imediata.",
      href: "/alertas",
      badge: "3",
    },
    {
      id: "protocols",
      label: "Protocolos",
      description: "Padrões assistenciais e condutas.",
      href: "/protocolos",
    },
    {
      id: "legal",
      label: "Legislação",
      description: "Normas, regras e referências técnicas.",
      href: "/legislacao",
    },
    {
      id: "handoff",
      label: "Passagem de plantão",
      description: "Resumo do turno e comunicação segura da equipe.",
      href: "/passagem-plantao",
    },
  ];
}
