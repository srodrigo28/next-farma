import { SectionOverviewController } from "@/modules/workspace/controllers/SectionOverviewController";

export default function MedicamentosPage() {
  return (
    <SectionOverviewController
      eyebrow="Medicamentos"
      title="Rotina de medicacoes"
      description="Espaco preparado para aprazamento, checagem de horario, validacao de dose e acompanhamento de administracoes vencidas."
      cards={[
        {
          title: "Aprazamento",
          text: "Visualize horarios por turno e destaque itens com prioridade clinica.",
        },
        {
          title: "Seguranca",
          text: "Base para validacao de 9 certos, dupla checagem e alertas de interacao.",
        },
      ]}
    />
  );
}
