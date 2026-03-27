import {
  AlertTriangleIcon,
  ClipboardIcon,
  HeartbeatIcon,
  MedicationsIcon,
  PatientsIcon,
} from "@/shared/components/AppIcons";
import { AppScreen } from "@/shared/components/AppScreen";
import { WorkspaceShell } from "@/shared/components/WorkspaceShell";
import { DashboardStat, DrawerMenuItem, QuickAccessItem } from "../types";

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

function getStatIcon(id: string, tone: DashboardStat["tone"]) {
  if (id === "medicacoes") return MedicationsIcon;
  if (id === "pendencias") return ClipboardIcon;
  if (id === "pacientes") return PatientsIcon;
  if (tone === "danger") return AlertTriangleIcon;
  return HeartbeatIcon;
}

export function DashboardPageView({
  drawerMenu,
  stats,
  quickAccess,
}: {
  drawerMenu: DrawerMenuItem[];
  stats: DashboardStat[];
  quickAccess: QuickAccessItem[];
}) {
  return (
    <AppScreen flush className="space-y-6">
      <WorkspaceShell items={drawerMenu}>
        <section className="mb-4 rounded-[26px] bg-white/82 px-4 py-3 shadow-[0_16px_28px_rgba(15,31,56,0.07)]">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-strong">
                Turno da manhã
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                Olá, Nubio
              </h1>
              <p className="mt-1 text-xs leading-5 text-muted">
                Quinta-feira, 19 de março de 2026
              </p>
              <p className="text-xs leading-5 text-muted">
                Hospital · Maternidade
              </p>
            </div>
            <div className="shrink-0 rounded-[18px] bg-linear-to-br from-primary-soft to-secondary-soft px-3 py-2 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                Setor
              </p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">Hospital</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          {stats.map((item) => {
            const Icon = getStatIcon(item.id, item.tone);

            return (
              <article
                key={item.id}
                className={`rounded-[26px] p-4 shadow-[0_16px_32px_rgba(15,31,56,0.06)] ${toneClassMap(item.tone)}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-white/88 text-foreground shadow-[0_10px_24px_rgba(15,31,56,0.05)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-extrabold text-foreground">{item.value}</span>
                      <span className="text-lg font-semibold text-foreground">{item.label}</span>
                    </div>
                    <p className="text-sm font-semibold text-muted">{item.helper}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="space-y-4 pb-4">
          <div className="mt-7 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Acesso rápido</h2>
            <span className="rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-[#9c6a17]">
              Atalhos
            </span>
          </div>
          {quickAccess.map((item) => (
            <article
              key={item.id}
              className="rounded-[24px] border border-white/70 bg-white/92 p-4 shadow-[0_14px_28px_rgba(15,31,56,0.05)]"
            >
              <p className="text-lg font-semibold text-foreground">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{item.description}</p>
            </article>
          ))}
        </section>
      </WorkspaceShell>
    </AppScreen>
  );
}
