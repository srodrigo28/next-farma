import { SectionOverviewController } from "@/modules/workspace/controllers/SectionOverviewController";

export default function AlertasPage() {
  return (
    <SectionOverviewController
      eyebrow="Alertas"
      title="Central de alertas"
      description="Canal central para vencimentos, itens criticos, lembretes de plantao e eventos que exigem acao imediata."
      cards={[
        {
          title: "Notificacoes criticas",
          text: "Vencimento de medicacao, risco de atraso e tarefas sensiveis ao tempo.",
        },
        {
          title: "Triagem inteligente",
          text: "Separar por criticidade, unidade e tipo de ocorrencia para agir rapido.",
        },
      ]}
    />
  );
}
