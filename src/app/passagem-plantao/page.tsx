import { SectionOverviewController } from "@/modules/workspace/controllers/SectionOverviewController";

export default function PassagemPlantaoPage() {
  return (
    <SectionOverviewController
      eyebrow="Passagem de plantão"
      title="Resumo do turno"
      description="Tela pronta para consolidar pendências, situação dos pacientes, medicações sensíveis e observações importantes entre equipes."
      icon="handoff"
      cards={[
        {
          title: "Pendências do turno",
          text: "Checklist de acompanhamento antes da troca de equipe.",
          icon: "operations",
        },
        {
          title: "Comunicação segura",
          text: "Estrutura para transferir informações importantes com clareza e rastreabilidade.",
          icon: "handoff",
        },
      ]}
    />
  );
}
