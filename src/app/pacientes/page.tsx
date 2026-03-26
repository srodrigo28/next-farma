import { SectionOverviewController } from "@/modules/workspace/controllers/SectionOverviewController";

export default function PacientesPage() {
  return (
    <SectionOverviewController
      eyebrow="Pacientes"
      title="Gestão de pacientes"
      description="Visualize pacientes internados, filtros de risco e atalhos para uma rotina assistencial mais segura."
      cards={[
        {
          title: "Lista assistencial",
          text: "Organize pacientes por leito, prioridade, unidade e status clínico.",
        },
        {
          title: "Risco e observações",
          text: "Destaque alergias, pendências e alertas de segurança do paciente.",
        },
      ]}
    />
  );
}
