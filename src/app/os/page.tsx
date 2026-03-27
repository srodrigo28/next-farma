import { SectionOverviewController } from "@/modules/workspace/controllers/SectionOverviewController";

export default function OsPage() {
  return (
    <SectionOverviewController
      eyebrow="OS"
      title="Solicitações operacionais"
      description="Aqui entram ordens de serviço, chamados internos e o acompanhamento do que a unidade precisa resolver no plantão."
      icon="operations"
      cards={[
        {
          title: "Chamados da unidade",
          text: "Registro de manutenção, equipamentos, transporte e apoio.",
          icon: "operations",
        },
        {
          title: "Fila priorizada",
          text: "Separação por urgência, setor responsável e SLA interno.",
          icon: "alert",
        },
      ]}
    />
  );
}
