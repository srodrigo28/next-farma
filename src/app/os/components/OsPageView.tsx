import { AlertTriangleIcon, ClipboardIcon } from "@/shared/components/AppIcons";
import { AppScreen } from "@/shared/components/AppScreen";
import { WorkspaceShell } from "@/shared/components/WorkspaceShell";
import { getDrawerMenu } from "@/app/dashboard/data";
import { getServiceOrderFilters } from "../data";
import { ServiceOrderItem } from "../types";

function priorityTone(priority: ServiceOrderItem["priority"]) {
  if (priority === "Alta") return "bg-[#ffe3e5] text-danger";
  if (priority === "Média") return "bg-[#fff0bf] text-[#9a6a00]";
  return "bg-secondary-soft text-primary-strong";
}

function ServiceOrderCard({ item }: { item: ServiceOrderItem }) {
  return (
    <article className="rounded-[24px] border border-white/70 bg-white/92 p-4 shadow-[0_14px_28px_rgba(15,31,56,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityTone(item.priority)}`}>
          {item.priority} prioridade
        </span>
        <ClipboardIcon className="h-5 w-5 text-border" />
      </div>
      <div className="mt-4 space-y-3">
        <p className="text-lg font-semibold text-foreground">{item.title}</p>
        <p className="text-sm text-muted">{item.sector} • {item.owner}</p>
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
          <span>{item.status}</span>
          <span>{item.openedAt}</span>
        </div>
      </div>
    </article>
  );
}

export function OsPageView({ items }: { items: ServiceOrderItem[] }) {
  const filters = getServiceOrderFilters();

  return (
    <AppScreen flush>
      <WorkspaceShell items={getDrawerMenu()}>
        <section className="space-y-5 pb-4">
          <section className="rounded-[30px] bg-white/82 p-5 shadow-[0_18px_36px_rgba(15,31,56,0.08)]">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[20px] bg-primary-soft text-primary-strong shadow-[0_10px_24px_rgba(15,143,176,0.10)]">
              <ClipboardIcon className="h-7 w-7" />
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary-strong">Ordens de serviço</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground">Solicitações operacionais</h1>
            <p className="mt-3 text-base leading-7 text-muted">Acompanhe chamados internos, manutenção e demandas de apoio que impactam o turno.</p>
          </section>

          <div className="flex flex-wrap gap-2 rounded-[24px] border border-white/70 bg-white/85 p-2 shadow-[0_12px_24px_rgba(15,31,56,0.04)]">
            {filters.map((filter, index) => (
              <button
                key={filter.id}
                type="button"
                className={`rounded-2xl px-4 py-2 text-sm font-semibold transition-colors ${index === 0 ? "bg-foreground text-white shadow-[0_10px_20px_rgba(15,31,56,0.18)]" : "text-muted hover:bg-surface-alt"}`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <section className="space-y-4">
            {items.map((item) => (
              <ServiceOrderCard key={item.id} item={item} />
            ))}
          </section>

          <div className="rounded-[24px] border border-dashed border-border bg-white/70 p-4 text-sm text-muted">
            <div className="flex items-center gap-2 text-foreground">
              <AlertTriangleIcon className="h-4 w-4 text-danger" />
              <span className="font-semibold">Próximo passo sugerido</span>
            </div>
            <p className="mt-2 leading-6">Quando a API entrar, essa rota pode evoluir com criação de chamados, SLA, setor responsável e histórico por unidade.</p>
          </div>
        </section>
      </WorkspaceShell>
    </AppScreen>
  );
}
