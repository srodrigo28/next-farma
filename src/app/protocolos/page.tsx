import { SectionOverviewController } from "@/modules/workspace/controllers/SectionOverviewController";

export default function ProtocolosPage() {
  return (
    <SectionOverviewController
      eyebrow="Protocolos"
      title="Biblioteca de protocolos"
      description="Sessao pensada para agrupar condutas, fluxos institucionais e material de apoio para consulta rapida durante o atendimento."
      cards={[
        {
          title: "Protocolos por tema",
          text: "Urgencia, maternidade, clinica medica, oncologia e mais.",
        },
        {
          title: "Busca veloz",
          text: "Base ideal para pesquisa textual e filtros por unidade ou perfil.",
        },
      ]}
    />
  );
}
