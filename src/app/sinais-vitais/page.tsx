import { SectionOverviewController } from "@/modules/workspace/controllers/SectionOverviewController";

export default function SinaisVitaisPage() {
  return (
    <SectionOverviewController
      eyebrow="Sinais vitais"
      title="Monitoramento assistencial"
      description="Preparado para registrar e acompanhar PA, FC, FR, temperatura, saturacao e score de alerta precoce."
      cards={[
        {
          title: "Lancamento rapido",
          text: "Formulario pensado para uso rapido no leito, com foco em mobile.",
        },
        {
          title: "Tendencias",
          text: "Comparacao de valores e alertas quando houver deterioracao clinica.",
        },
      ]}
    />
  );
}
