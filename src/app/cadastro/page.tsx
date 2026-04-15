import { apiGet } from "@/shared/lib/api";
import { CadastroPageView } from "./components/CadastroPageView";
import { CadastroUnit, getRegisterSteps } from "./data";

interface UnitApiItem {
  name: string;
  slug: string;
  icon?: string | null;
}

async function getCadastroUnits(): Promise<CadastroUnit[] | undefined> {
  const payload = await apiGet<UnitApiItem[]>("/api/v1/units");
  if (!payload?.data?.length) return undefined;

  return payload.data
    .filter((unit) => unit.name && unit.slug)
    .map((unit) => ({
      name: unit.name,
      slug: unit.slug,
      icon: unit.icon,
    }));
}

export default async function CadastroPage() {
  const units = await getCadastroUnits();

  return <CadastroPageView steps={getRegisterSteps(units)} />;
}
