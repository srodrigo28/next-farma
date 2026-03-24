import { SectionOverviewController } from "@/modules/workspace/controllers/SectionOverviewController";

export default function PassagemPlantaoPage() {
  return (
    <SectionOverviewController
      eyebrow="Passagem de plantao"
      title="Resumo do turno"
      description="Tela pronta para consolidar pendencias, situacao dos pacientes, medicacoes sensiveis e observacoes importantes entre equipes."
      cards={[
        {
          title: "Pendencias do turno",
          text: "Checklist de acompanhamento antes da troca de equipe.",
        },
        {
          title: "Comunicacao segura",
          text: "Estrutura para transferir informacoes importantes com clareza e rastreabilidade.",
        },
      ]}
    />
  );
}
