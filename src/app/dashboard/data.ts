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
      label: "Medicações em 2h",
      value: 0,
      helper: "Próximas administrações",
      tone: "primary",
    },
    {
      id: "prescricoes",
      label: "Prescrições",
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
      label: "Medicações em 2h",
      value: schedulePayload.data.items.length,
      helper: "Próximas administrações",
      tone: "primary",
    },
    {
      id: "prescricoes",
      label: "Prescrições",
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
      id: "onboarding",
      label: "Meu onboarding",
      description: "Perfil, contexto e unidade principal salvos.",
      href: "/onboarding",
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
    {
      id: "tasks",
      label: "Tarefas",
      description: "Pendências operacionais e assistenciais da equipe.",
      href: "/tarefas",
    },
  ];
}
