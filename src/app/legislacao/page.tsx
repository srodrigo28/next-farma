import { SectionOverviewController } from "@/modules/workspace/controllers/SectionOverviewController";

export default function LegislacaoPage() {
  return (
    <SectionOverviewController
      eyebrow="Legislação"
      title="Base normativa"
      description="Área preparada para resoluções, notas técnicas, guias do COREN e referências legais relevantes para o dia a dia."
      cards={[
        {
          title: "Normas e resoluções",
          text: "Repositório para diretrizes oficiais e referências atualizadas.",
        },
        {
          title: "Consulta contextual",
          text: "Relacione regras com procedimento, unidade e perfil profissional.",
        },
      ]}
    />
  );
}
