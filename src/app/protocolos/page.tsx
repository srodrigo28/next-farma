import { SearchIcon } from "@/shared/components/AppIcons";
import { AppScreen } from "@/shared/components/AppScreen";
import { WorkspaceShell } from "@/shared/components/WorkspaceShell";
import { getDrawerMenu } from "@/app/dashboard/data";
import { apiGet } from "@/shared/lib/api";

const themeOptions = [
  { value: "all", label: "Todas", selected: true },
  { value: "emergency", label: "Urgência" },
  { value: "maternity", label: "Maternidade" },
];

const statusOptions = [
  { value: "active", label: "Vigente", selected: true },
  { value: "review", label: "Em revisão" },
  { value: "archived", label: "Arquivado" },
];

interface ApiProtocol {
  id: number;
  slug: string;
  badge: string;
  category: string;
  title: string;
  subtitle: string;
  views: number;
  revision: string;
}

async function getProtocols() {
  const payload = await apiGet<ApiProtocol[]>("/api/v1/protocols");
  if (!payload || !Array.isArray(payload.data)) return [];
  return payload.data;
}

export default async function ProtocolosPage() {
  const protocols = await getProtocols();

  return (
    <AppScreen flush>
      <WorkspaceShell items={getDrawerMenu()}>
        <section className="space-y-5 pb-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Protocolos clínicos</h1>
            <p className="mt-1 text-sm text-muted">{protocols.length} protocolos disponíveis</p>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 rounded-[20px] border border-border bg-white px-4 py-3 shadow-[0_8px_18px_rgba(15,31,56,0.04)]">
              <SearchIcon className="h-5 w-5 text-muted" />
              <input
                type="text"
                placeholder="Buscar protocolo..."
                className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted/70"
              />
            </label>

            <div className="flex flex-wrap gap-3">
              {[...themeOptions, ...statusOptions].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`min-h-11 rounded-2xl px-4 text-sm font-semibold shadow-[0_8px_18px_rgba(15,31,56,0.04)] ${
                    option.selected ? "bg-white text-foreground" : "bg-white/75 text-muted"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <section className="space-y-4">
            {protocols.map((protocol) => (
              <article key={protocol.id} className="rounded-[24px] border border-white/70 bg-white/92 p-4 shadow-[0_14px_28px_rgba(15,31,56,0.05)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary-strong">
                      {protocol.badge}
                    </div>
                    <p className="pt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      {protocol.category}
                    </p>
                  </div>
                  <button type="button" className="text-lg text-border">☆</button>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-xl font-semibold leading-7 text-foreground">{protocol.title}</p>
                  <p className="text-sm text-muted">{protocol.subtitle}</p>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm text-muted">
                  <span>◌ {protocol.views}</span>
                  <span>Revisão: {protocol.revision}</span>
                </div>
              </article>
            ))}
          </section>
        </section>
      </WorkspaceShell>
    </AppScreen>
  );
}
