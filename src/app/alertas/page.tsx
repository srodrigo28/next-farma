import { SectionOverviewController } from "@/modules/workspace/controllers/SectionOverviewController";

export default function AlertasPage() {
  return (
    <SectionOverviewController
      eyebrow="Alertas"
      title="Central de alertas"
      description="Acompanhe vencimentos, itens críticos, lembretes do plantão e eventos que exigem ação imediata."
      cards={[
        {
          title: "Notificações críticas",
          text: "Veja vencimentos de medicação, risco de atraso e tarefas sensíveis ao tempo.",
        },
        {
          title: "Triagem inteligente",
          text: "Separe por criticidade, unidade e tipo de ocorrência para agir rápido.",
        },
      ]}
    />
  );
}
