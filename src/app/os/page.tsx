import { SectionOverviewController } from "@/modules/workspace/controllers/SectionOverviewController";

export default function OsPage() {
  return (
    <SectionOverviewController
      eyebrow="OS"
      title="Solicitacoes operacionais"
      description="Aqui entraremos com ordens de servico, chamados internos e acompanhamento do que a unidade precisa resolver no plantao."
      cards={[
        {
          title: "Chamados da unidade",
          text: "Registro de manutencao, equipamentos, transporte e apoio.",
        },
        {
          title: "Fila priorizada",
          text: "Separacao por urgencia, setor responsavel e SLA interno.",
        },
      ]}
    />
  );
}
