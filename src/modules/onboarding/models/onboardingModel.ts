import { OnboardingStep } from "@/shared/types";

export function getOnboardingSteps(): OnboardingStep[] {
  return [
    {
      id: "profile",
      title: "Qual é o seu perfil profissional?",
      subtitle: "Selecione o perfil que melhor representa sua rotina de trabalho.",
      options: [
        {
          id: "enfermeiro",
          title: "Enfermeiro(a)",
          description: "COREN ativo e acesso completo aos fluxos clínicos.",
        },
        {
          id: "tecnico",
          title: "Técnico(a) de Enfermagem",
          description: "Rotinas operacionais, medicações e checklist assistencial.",
        },
        {
          id: "estudante",
          title: "Estudante",
          description: "Treinamento, protocolos e simulações guiadas.",
        },
      ],
    },
    {
      id: "context",
      title: "Onde você atua com mais frequência?",
      subtitle: "Esse contexto ajuda a personalizar o painel e os atalhos iniciais.",
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
      title: "Selecione a unidade ou setor",
      subtitle: "Escolha o ambiente principal para destacar fluxos e prioridades.",
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
          selected: true,
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
