import { BookIcon, ScaleIcon } from "@/shared/components/AppIcons";
import { AppScreen } from "@/shared/components/AppScreen";
import { WorkspaceShell } from "@/shared/components/WorkspaceShell";
import { getDrawerMenu } from "@/app/dashboard/data";
import { apiGet } from "@/shared/lib/api";

const categories = [
  { id: "all", label: "Todas" },
  { id: "coren", label: "COREN/COFEN" },
  { id: "tecnica", label: "Notas técnicas" },
  { id: "seguranca", label: "Segurança do paciente" },
];

interface ApiLegalDocument {
  id: number;
  category: string;
  title: string;
  summary: string;
  source: string;
  updated_at: string;
}

async function getLegalDocuments() {
  const payload = await apiGet<ApiLegalDocument[]>("/api/v1/legal-documents");
  if (!payload || !Array.isArray(payload.data)) return [];
  return payload.data;
}

export default async function LegislacaoPage() {
  const items = await getLegalDocuments();

  return (
    <AppScreen flush>
      <WorkspaceShell items={getDrawerMenu()}>
        <section className="space-y-5 pb-4">
          <section className="rounded-[30px] bg-white/82 p-5 shadow-[0_18px_36px_rgba(15,31,56,0.08)]">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[20px] bg-primary-soft text-primary-strong shadow-[0_10px_24px_rgba(15,143,176,0.10)]">
              <BookIcon className="h-7 w-7" />
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary-strong">Legislação</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground">Base normativa</h1>
            <p className="mt-3 text-base leading-7 text-muted">
              Centralize resoluções, notas técnicas e referências legais relevantes para o dia a dia assistencial.
            </p>
          </section>

          <div className="flex flex-wrap gap-2 rounded-[24px] border border-white/70 bg-white/85 p-2 shadow-[0_12px_24px_rgba(15,31,56,0.04)]">
            {categories.map((category, index) => (
              <button
                key={category.id}
                type="button"
                className={`rounded-2xl px-4 py-2 text-sm font-semibold transition-colors ${index === 0 ? "bg-foreground text-white shadow-[0_10px_20px_rgba(15,31,56,0.18)]" : "text-muted hover:bg-surface-alt"}`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <section className="space-y-4">
            {items.map((item) => (
              <article key={item.id} className="rounded-[24px] border border-white/70 bg-white/92 p-4 shadow-[0_14px_28px_rgba(15,31,56,0.05)]">
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-secondary-soft px-3 py-1 text-xs font-semibold text-primary-strong">
                    {item.category}
                  </span>
                  <ScaleIcon className="h-5 w-5 text-border" />
                </div>
                <div className="mt-4 space-y-3">
                  <p className="text-lg font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm leading-6 text-muted">{item.summary}</p>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
                    <span>{item.source}</span>
                    <span>{item.updated_at}</span>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </section>
      </WorkspaceShell>
    </AppScreen>
  );
}
