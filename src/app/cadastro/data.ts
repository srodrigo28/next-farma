import { OnboardingStep, RegisterFormData, RegisterStep } from "./types";

export function getOnboardingSteps(): OnboardingStep[] {
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
      options: [
        {
          id: "unidade-emergencia",
          title: "🏥 Unidade de Emergência",
          description: "Atendimento imediato, urgência e emergência.",
          icon: "hospital",
        },
        {
          id: "unidade-internacao",
          title: "🛏️ Unidade de Internação",
          description: "Leitos clínicos, cirúrgicos e acompanhamento contínuo.",
          icon: "clipboard",
        },
        {
          id: "unidade-terapia-intensiva",
          title: "❤️ Unidade de Terapia Intensiva (UTI)",
          description: "Cuidados intensivos e monitorização contínua.",
          icon: "heartbeat",
        },
        {
          id: "unidade-consulta-externa",
          title: "👩‍⚕️ Unidade de Consulta Externa",
          description: "Ambulatório, consultas e acompanhamento programado.",
          icon: "shield",
        },
        {
          id: "unidade-saude-mental",
          title: "🧠 Unidade de Saúde Mental",
          description: "Atenção psicossocial e cuidado em saúde mental.",
          icon: "graduation-cap",
        },
        {
          id: "maternidade-uti-neonatal",
          title: "👶 Maternidade e U.T.I neonatal",
          description: "Obstetrícia, neonatologia e cuidado neonatal intensivo.",
          icon: "heartbeat",
        },
        {
          id: "centro-cirurgico",
          title: "🧑‍⚕️ Centro Cirúrgico",
          description: "Centro operatório, recuperação e apoio cirúrgico.",
          icon: "wrench",
        },
      ],
    },
  ];
}

export function getRegisterSteps(): RegisterStep[] {
  return [
    ...getOnboardingSteps(),
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
