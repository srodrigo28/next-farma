import { SectionOverviewController } from "@/modules/workspace/controllers/SectionOverviewController";

export default function LegislacaoPage() {
  return (
    <SectionOverviewController
      eyebrow="Legislacao"
      title="Base normativa"
      description="Area preparada para resolucoes, notas tecnicas, guias do COREN e referencias legais relevantes para o dia a dia."
      cards={[
        {
          title: "Normas e resolucoes",
          text: "Repositorio para diretrizes oficiais e referencias atualizadas.",
        },
        {
          title: "Consulta contextual",
          text: "Relacionar regras com procedimento, unidade e perfil profissional.",
        },
      ]}
    />
  );
}
