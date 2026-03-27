import { LegalCategoryOption, LegalReferenceItem } from "./types";

export function getLegalCategories(): LegalCategoryOption[] {
  return [
    { id: "all", label: "Todas" },
    { id: "coren", label: "COREN/COFEN" },
    { id: "tecnica", label: "Notas técnicas" },
    { id: "seguranca", label: "Segurança do paciente" },
  ];
}

export function getLegalReferences(): LegalReferenceItem[] {
  return [
    {
      id: "legal-1",
      category: "COREN/COFEN",
      title: "Exercício profissional e responsabilidades da equipe",
      summary: "Base de consulta para condutas, atribuições e limites técnicos no cuidado assistencial.",
      source: "Conselho Federal de Enfermagem",
      updatedAt: "Atualizado em 12/03/2026",
    },
    {
      id: "legal-2",
      category: "Segurança do paciente",
      title: "Protocolos institucionais e referências regulatórias",
      summary: "Organize normas internas e documentos oficiais usados na rotina da unidade.",
      source: "Núcleo de qualidade",
      updatedAt: "Atualizado em 08/03/2026",
    },
  ];
}
