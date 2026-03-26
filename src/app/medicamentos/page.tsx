import { SectionOverviewController } from "@/modules/workspace/controllers/SectionOverviewController";

export default function MedicamentosPage() {
  return (
    <SectionOverviewController
      eyebrow="Medicamentos"
      title="Rotina de medicações"
      description="Organize aprazamento, checagem de horário, validação de dose e acompanhamento das administrações."
      cards={[
        {
          title: "Aprazamento",
          text: "Visualize horários por turno e destaque itens com prioridade clínica.",
        },
        {
          title: "Segurança",
          text: "Apoie a validação dos 9 certos, a dupla checagem e os alertas de interação.",
        },
      ]}
    />
  );
}
