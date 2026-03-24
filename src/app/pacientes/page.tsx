import { SectionOverviewController } from "@/modules/workspace/controllers/SectionOverviewController";

export default function PacientesPage() {
  return (
    <SectionOverviewController
      eyebrow="Pacientes"
      title="Gestao de pacientes"
      description="Area pronta para listar pacientes internados, filtros de risco e atalhos para evolucao e administracao segura."
      cards={[
        {
          title: "Lista assistencial",
          text: "Organize internados por leito, prioridade, unidade e status clinico.",
        },
        {
          title: "Risco e observacao",
          text: "Destacar alergias, pendencias e alertas de seguranca do paciente.",
        },
      ]}
    />
  );
}
