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
        },
        {
          id: "tecnico",
          title: "Técnico(a) de Enfermagem",
          description: "Registro operacional de cuidados e rotinas assistenciais.",
        },
        {
          id: "estudante",
          title: "Estudante",
          description: "Protocolos, simulação e apoio ao aprendizado supervisionado.",
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
        },
        {
          id: "aps",
          title: "Atenção Primária / Domicílio",
          description: "UBS, ESF, visitas domiciliares e acompanhamento local.",
        },
      ],
    },
    {
      id: "unit",
      title: "Sua unidade",
      subtitle: "Selecione a unidade ou o setor",
      options: [
        {
          id: "maternidade",
          title: "Maternidade",
          description: "Obstetrícia e neonatologia.",
        },
        {
          id: "pronto-socorro",
          title: "Pronto-Socorro",
          description: "Atendimento de urgência e emergência.",
        },
        {
          id: "oncologia",
          title: "Oncologia",
          description: "Internação oncológica e protocolos especializados.",
        },
        {
          id: "uti-adulto",
          title: "UTI Adulto",
          description: "Unidade de Terapia Intensiva para adultos.",
        },
        {
          id: "clinica-medica",
          title: "Clínica Médica",
          description: "Internação clínica geral e acompanhamento contínuo.",
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
