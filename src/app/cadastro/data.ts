import { OnboardingStep, RegisterFormData } from "./types";

export function getOnboardingSteps(): OnboardingStep[] {
  return [
    {
      id: "profile",
      title: "Qual e o seu perfil profissional?",
      subtitle: "Selecione o perfil que melhor representa sua rotina de trabalho.",
      options: [
        {
          id: "enfermeiro",
          title: "Enfermeiro(a)",
          description: "COREN ativo e acesso completo aos fluxos clinicos.",
        },
        {
          id: "tecnico",
          title: "Tecnico(a) de Enfermagem",
          description: "Rotinas operacionais, medicacoes e checklist assistencial.",
        },
        {
          id: "estudante",
          title: "Estudante",
          description: "Treinamento, protocolos e simulacoes guiadas.",
        },
      ],
    },
    {
      id: "context",
      title: "Onde voce atua com mais frequencia?",
      subtitle: "Esse contexto ajuda a personalizar o painel e os atalhos iniciais.",
      options: [
        {
          id: "hospital",
          title: "Hospital / UTI / Urgencia",
          description: "Internacao, UTI, pronto-socorro e setores criticos.",
        },
        {
          id: "aps",
          title: "Atencao Primaria / Domicilio",
          description: "UBS, ESF, visitas domiciliares e acompanhamento local.",
        },
      ],
    },
    {
      id: "unit",
      title: "Selecione a unidade ou setor",
      subtitle: "Escolha o ambiente principal para destacar fluxos e prioridades.",
      options: [
        {
          id: "maternidade",
          title: "Maternidade",
          description: "Obstetricia e neonatologia.",
        },
        {
          id: "pronto-socorro",
          title: "Pronto-Socorro",
          description: "Atendimento de urgencia e emergencia.",
          selected: true,
        },
        {
          id: "oncologia",
          title: "Oncologia",
          description: "Internacao oncologica e protocolos especializados.",
        },
        {
          id: "uti-adulto",
          title: "UTI Adulto",
          description: "Unidade de Terapia Intensiva para adultos.",
        },
        {
          id: "clinica-medica",
          title: "Clinica Medica",
          description: "Internacao clinica geral e acompanhamento continuo.",
        },
      ],
    },
  ];
}

export function getInitialRegisterFormData(): RegisterFormData {
  return {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    coren: "",
  };
}
