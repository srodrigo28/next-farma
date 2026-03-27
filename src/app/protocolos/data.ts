import { ProtocolFilterOption, ProtocolItem } from "./types";

export function getProtocolThemeOptions(): ProtocolFilterOption[] {
  return [
    { value: "all", label: "Todas", selected: true },
    { value: "emergency", label: "Urgência" },
    { value: "maternity", label: "Maternidade" },
  ];
}

export function getProtocolStatusOptions(): ProtocolFilterOption[] {
  return [
    { value: "active", label: "Vigente", selected: true },
    { value: "review", label: "Em revisão" },
    { value: "archived", label: "Arquivado" },
  ];
}

export function getProtocols(): ProtocolItem[] {
  return [
    {
      id: "avc-ativacao",
      badge: "EM",
      category: "AVC",
      title: "AVC — Reconhecimento e Protocolo de Ativação",
      subtitle: "Linha de Cuidado AVC — MS 2012",
      views: 0,
      revision: "01/2021",
    },
    {
      id: "pcr-bls-acls",
      badge: "CFM",
      category: "PCR",
      title: "PCR — Suporte Básico e Avançado de Vida (BLS/ACLS)",
      subtitle: "Diretrizes AHA 2020 — adaptadas ILCOR",
      views: 0,
      revision: "11/2023",
    },
    {
      id: "curativo-ferida-cirurgica",
      badge: "COFEN",
      category: "Curativos",
      title: "Cuidados com Curativo de Ferida Cirúrgica",
      subtitle: "Resolução COFEN 567/2018",
      views: 0,
      revision: "05/2024",
    },
  ];
}
