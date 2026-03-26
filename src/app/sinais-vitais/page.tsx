import { SectionOverviewController } from "@/modules/workspace/controllers/SectionOverviewController";

export default function SinaisVitaisPage() {
  return (
    <SectionOverviewController
      eyebrow="Sinais vitais"
      title="Monitoramento assistencial"
      description="Registre e acompanhe PA, FC, FR, temperatura, saturação e score de alerta precoce."
      cards={[
        {
          title: "Lançamento rápido",
          text: "Formulário pensado para uso ágil no leito, com foco em mobile.",
        },
        {
          title: "Tendências",
          text: "Compare valores e receba alertas quando houver deterioração clínica.",
        },
      ]}
    />
  );
}
