import { SectionOverviewController } from "@/modules/workspace/controllers/SectionOverviewController";

export default function ProtocolosPage() {
  return (
    <SectionOverviewController
      eyebrow="Protocolos"
      title="Biblioteca de protocolos"
      description="Agrupe condutas, fluxos institucionais e materiais de apoio para consulta rápida durante o atendimento."
      cards={[
        {
          title: "Protocolos por tema",
          text: "Urgência, maternidade, clínica médica, oncologia e mais.",
        },
        {
          title: "Busca rápida",
          text: "Pesquise por texto e aplique filtros por unidade, perfil ou contexto clínico.",
        },
      ]}
    />
  );
}
