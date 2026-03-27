import { LegislacaoPageView } from "./components/LegislacaoPageView";
import { getLegalReferences } from "./data";

export default function LegislacaoPage() {
  return <LegislacaoPageView items={getLegalReferences()} />;
}
