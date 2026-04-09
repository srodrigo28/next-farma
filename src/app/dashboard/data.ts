import { apiGet } from "@/shared/lib/api";
import { DashboardStat, DrawerMenuItem, QuickAccessItem } from "./types";

interface CountPayload {
  total: number;
}

interface ApiMedicationSchedule {
  window: string;
  items: Array<{
    id: string | number;
  }>;
}

function getFallbackDashboardStats(): DashboardStat[] {
  return [
    {
      id: "medicacoes",
      label: "Medicacoes em 2h",
      value: 0,
      helper: "Proximas administracoes",
      tone: "primary",
    },
    {
      id: "prescricoes",
      label: "Prescricoes",
      value: 0,
      helper: "Ativas no sistema",
      tone: "danger",
    },
    {
      id: "sinais",
      label: "Sinais vitais",
      value: 0,
      helper: "Registros monitorados",
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

export async function getDashboardStats(): Promise<DashboardStat[]> {
  const [schedulePayload, prescriptionsPayload, vitalSignsPayload, patientsPayload] = await Promise.all([
    apiGet<ApiMedicationSchedule>("/api/v1/medications/schedule?window=2h"),
    apiGet<CountPayload>("/api/v1/prescriptions/count"),
    apiGet<CountPayload>("/api/v1/vital-signs/count"),
    apiGet<CountPayload>("/api/v1/patients/count"),
  ]);

  if (!schedulePayload || !prescriptionsPayload || !vitalSignsPayload || !patientsPayload) {
    return getFallbackDashboardStats();
  }

  return [
    {
      id: "medicacoes",
      label: "Medicacoes em 2h",
      value: schedulePayload.data.items.length,
      helper: "Proximas administracoes",
      tone: "primary",
    },
    {
      id: "prescricoes",
      label: "Prescricoes",
      value: prescriptionsPayload.data.total,
      helper: "Ativas no sistema",
      tone: "danger",
    },
    {
      id: "sinais",
      label: "Sinais vitais",
      value: vitalSignsPayload.data.total,
      helper: "Registros monitorados",
      tone: "warning",
    },
    {
      id: "pacientes",
      label: "Pacientes",
      value: patientsPayload.data.total,
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
      description: "Registre medicamentos, protocolos e observacoes do cuidado.",
    },
    {
      id: "plantao",
      title: "Passagem de plantao",
      description: "Organize pendencias e alinhe o turno com seguranca.",
    },
    {
      id: "alertas",
      title: "Alertas clinicos",
      description: "Acompanhe vencimentos, riscos e itens prioritarios.",
    },
  ];
}

export function getDrawerMenu(): DrawerMenuItem[] {
  return [
    {
      id: "overview",
      label: "Visao geral",
      description: "Painel principal com prioridades do turno.",
      href: "/dashboard",
    },
    {
      id: "patients",
      label: "Pacientes",
      description: "Internados, triagem e historico resumido.",
      href: "/pacientes",
    },
    {
      id: "medications",
      label: "Medicamentos",
      description: "Aprazamento, checagem e administracao segura.",
      href: "/medicamentos",
    },
    {
      id: "os",
      label: "Ordens de servico",
      description: "Solicitacoes operacionais e chamados da unidade.",
      href: "/os",
    },
    {
      id: "vitals",
      label: "Sinais vitais",
      description: "Lancamentos e acompanhamento em tempo real.",
      href: "/sinais-vitais",
    },
    {
      id: "alerts",
      label: "Alertas",
      description: "Ocorrencias e itens que exigem atencao imediata.",
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
      label: "Passagem de plantao",
      description: "Resumo do turno e comunicacao segura da equipe.",
      href: "/passagem-plantao",
    },
    {
      id: "tasks",
      label: "Tarefas",
      description: "Pendencias operacionais e assistenciais da equipe.",
      href: "/tarefas",
    },
  ];
}
