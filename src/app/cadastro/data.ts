import { OnboardingStep, RegisterFormData, RegisterStep, SelectOption } from "./types";

export interface CadastroUnit {
  name: string;
  slug: string;
  icon?: string | null;
}

const unitOptionMetadata: Record<string, Pick<SelectOption, "description" | "icon">> = {
  "unidade-emergencia": {
    description: "Atendimento imediato, urgência e emergência.",
    icon: "hospital",
  },
  "unidade-internacao": {
    description: "Leitos clínicos, cirúrgicos e acompanhamento contínuo.",
    icon: "clipboard",
  },
  "unidade-terapia-intensiva": {
    description: "Cuidados intensivos e monitorização contínua.",
    icon: "heartbeat",
  },
  "unidade-consulta-externa": {
    description: "Ambulatório, consultas e acompanhamento programado.",
    icon: "shield",
  },
  "unidade-saude-mental": {
    description: "Atenção psicossocial e cuidado em saúde mental.",
    icon: "graduation-cap",
  },
  "maternidade-uti-neonatal": {
    description: "Obstetrícia, neonatologia e cuidado neonatal intensivo.",
    icon: "heartbeat",
  },
  "centro-cirurgico": {
    description: "Centro operatório, recuperação e apoio cirúrgico.",
    icon: "wrench",
  },
};

const fallbackUnits: CadastroUnit[] = [
  { slug: "unidade-emergencia", name: "Unidade de Emergência", icon: "🏥" },
  { slug: "unidade-internacao", name: "Unidade de Internação", icon: "🛏️" },
  { slug: "unidade-terapia-intensiva", name: "Unidade de Terapia Intensiva (UTI)", icon: "❤️" },
  { slug: "unidade-consulta-externa", name: "Unidade de Consulta Externa", icon: "👩‍⚕️" },
  { slug: "unidade-saude-mental", name: "Unidade de Saúde Mental", icon: "🧠" },
  { slug: "maternidade-uti-neonatal", name: "Maternidade e U.T.I neonatal", icon: "👶" },
  { slug: "centro-cirurgico", name: "Centro Cirúrgico", icon: "🧑‍⚕️" },
];

function buildUnitOptions(units?: CadastroUnit[]): SelectOption[] {
  const source = units?.length ? units : fallbackUnits;

  return source.map((unit) => {
    const metadata = unitOptionMetadata[unit.slug];

    return {
      id: unit.slug,
      title: `${unit.icon ? `${unit.icon} ` : ""}${unit.name}`,
      description: metadata?.description ?? "Unidade cadastrada para seleção no perfil.",
      icon: metadata?.icon ?? "hospital",
    };
  });
}

export function getOnboardingSteps(units?: CadastroUnit[]): OnboardingStep[] {
  return [
    {
      id: "profile",
      title: "Bem-vindo(a)!",
      subtitle: "Qual é o seu perfil profissional?",
      options: [
        {
          id: "enfermeiro",
          title: "Enfermeiro(a)",
          description: "COREN ativo e acesso completo aos fluxos clínicos.",
          icon: "shield",
        },
        {
          id: "tecnico",
          title: "Técnico(a) de Enfermagem",
          description: "Registro operacional de cuidados e rotinas assistenciais.",
          icon: "wrench",
        },
        {
          id: "estudante",
          title: "Estudante",
          description: "Protocolos, simulação e apoio ao aprendizado supervisionado.",
          icon: "graduation-cap",
        },
      ],
    },
    {
      id: "context",
      title: "Contexto de trabalho",
      subtitle: "Onde você atua habitualmente?",
      options: [
        {
          id: "hospital",
          title: "Hospital / UTI / Urgência",
          description: "Internação, UTI, pronto-socorro e setores críticos.",
          icon: "hospital",
        },
        {
          id: "aps",
          title: "Atenção Primária / Domicílio",
          description: "UBS, ESF, visitas domiciliares e acompanhamento local.",
          icon: "home",
        },
      ],
    },
    {
      id: "unit",
      title: "Sua unidade",
      subtitle: "Selecione a unidade ou o setor",
      options: buildUnitOptions(units),
    },
  ];
}

export function getRegisterSteps(units?: CadastroUnit[]): RegisterStep[] {
  return [
    ...getOnboardingSteps(units),
    {
      id: "account",
      title: "Crie sua conta",
      subtitle: "Informe seus dados de acesso e contato para continuar.",
    },
    {
      id: "address",
      title: "Seu endereço",
      subtitle: "Digite o CEP para completar o endereço e finalizar seu cadastro.",
    },
  ];
}

export function getInitialRegisterFormData(): RegisterFormData {
  return {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    coren: "",
    professionalProfile: "",
    workContext: "",
    primaryUnit: "",
    cep: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    complement: "",
  };
}
