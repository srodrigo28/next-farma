import { AppScreen } from "@/shared/components/AppScreen";
import { WorkspaceShell } from "@/shared/components/WorkspaceShell";
import { DashboardStat, DrawerMenuItem, QuickAccessItem } from "@/shared/types";

function toneClassMap(tone: DashboardStat["tone"]) {
  switch (tone) {
    case "danger":
      return "bg-[#fff3f2] ring-1 ring-[#ffd7d2]";
    case "warning":
      return "bg-[#fff8dd] ring-1 ring-[#ffe8a2]";
    case "info":
      return "bg-[#eef4ff] ring-1 ring-[#d5e2ff]";
    default:
      return "bg-primary-soft ring-1 ring-[#c6ecf6]";
  }
}

export function DashboardView({
  drawerMenu,
  stats,
  quickAccess,
}: {
  drawerMenu: DrawerMenuItem[];
  stats: DashboardStat[];
  quickAccess: QuickAccessItem[];
}) {
  return (
    <AppScreen className="space-y-6">
      <WorkspaceShell
        items={drawerMenu}
        title="Painel Assistencial"
        subtitle="Menu mobile real com drawer e rotas internas"
      >
        <section className="rounded-[30px] bg-white/82 p-4 shadow-[0_18px_36px_rgba(15,31,56,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary-strong">
                Turno da manha
              </p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground">
                Ola, Nubio
              </h1>
              <p className="mt-2 text-base leading-6 text-muted">
                Quinta-feira, 19 de marco de 2026. Hospital · Maternidade
              </p>
            </div>
            <div className="rounded-[24px] bg-linear-to-br from-primary-soft to-secondary-soft px-4 py-3 text-right">
              <p className="text-sm font-bold text-muted">Setor ativo</p>
              <p className="text-lg font-extrabold text-foreground">Hospital</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          {stats.map((item) => (
            <article
              key={item.id}
              className={`rounded-[26px] p-4 shadow-[0_16px_32px_rgba(15,31,56,0.06)] ${toneClassMap(item.tone)}`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-white/88 text-xl font-extrabold text-foreground">
                  {item.tone === "danger"
                    ? "!"
                    : item.tone === "warning"
                      ? "\u2630"
                      : item.tone === "info"
                        ? "\u263B"
                        : "+"}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-extrabold text-foreground">{item.value}</span>
                    <span className="text-xl font-bold text-foreground">{item.label}</span>
                  </div>
                  <p className="text-sm font-semibold text-muted">{item.helper}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="space-y-4 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-extrabold text-foreground">Acesso rapido</h2>
            <span className="rounded-full bg-accent-soft px-3 py-1 text-sm font-bold text-[#9c6a17]">
              Favoritos
            </span>
          </div>
          {quickAccess.map((item) => (
            <article
              key={item.id}
              className="rounded-[24px] border border-white/70 bg-white/92 p-4 shadow-[0_14px_28px_rgba(15,31,56,0.05)]"
            >
              <p className="text-xl font-extrabold text-foreground">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{item.description}</p>
            </article>
          ))}
        </section>
      </WorkspaceShell>
    </AppScreen>
  );
}
