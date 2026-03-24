import Link from "next/link";
import { WorkspaceModeToggle } from "@/shared/components/WorkspaceModeToggle";
import { DrawerMenuItem, WorkspaceMode } from "@/shared/types";

const iconMap: Record<string, string> = {
  overview: "\u25A6",
  patients: "\u263B",
  medications: "+",
  os: "\u270E",
  vitals: "~",
  alerts: "!",
  protocols: "\u25AD",
  legal: "\u2696",
  handoff: "\u21C4",
};

export function AppDrawer({
  items,
  onClose,
  mode,
  onModeChange,
}: {
  items: DrawerMenuItem[];
  onClose?: () => void;
  mode: WorkspaceMode;
  onModeChange: (mode: WorkspaceMode) => void;
}) {
  return (
    <aside className="flex h-full flex-col overflow-hidden rounded-r-[30px] bg-white shadow-[0_22px_50px_rgba(15,31,56,0.12)]">
      <div className="shrink-0 border-b border-[#eef3f7] bg-white shadow-[0_8px_18px_rgba(15,31,56,0.04)]">
        <div className="px-4 pb-3 pt-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-linear-to-br from-primary to-primary-strong text-[22px] text-white shadow-[0_12px_24px_rgba(15,143,176,0.22)]">
              +
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-extrabold leading-5 text-foreground">
                Auxiliar de Enfermagem
              </p>
              <p className="text-[15px] font-extrabold leading-5 text-foreground">Brasil</p>
            </div>
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-muted"
            >
              x
            </button>
          </div>

          <div className="mt-3">
            <WorkspaceModeToggle value={mode} onChange={onModeChange} compact />
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <nav className="space-y-2 px-4 py-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-[22px] px-3 py-3 transition-colors ${
                item.active
                  ? "bg-linear-to-r from-secondary-soft to-primary-soft"
                  : "bg-transparent hover:bg-surface-alt"
              }`}
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl text-lg ${
                  item.active
                    ? "bg-white text-primary shadow-[0_10px_24px_rgba(15,143,176,0.15)]"
                    : "bg-surface-alt text-muted"
                }`}
              >
                {iconMap[item.id] ?? "\u2022"}
              </div>
              <div className="flex-1">
                <p className="text-base font-extrabold text-foreground">{item.label}</p>
                <p className="text-sm text-muted">{item.description}</p>
              </div>
              {item.badge ? (
                <span className="rounded-full bg-[#ffe3e5] px-2 py-1 text-xs font-extrabold text-danger">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>
      </div>

      <div className="shrink-0 border-t border-[#eef3f7] bg-white px-4 py-4 shadow-[0_-8px_18px_rgba(15,31,56,0.04)]">
        <div className="rounded-[24px] bg-linear-to-r from-[#f9fcff] to-[#f1f7fb] p-4 ring-1 ring-border">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-soft text-sm font-extrabold text-primary">
              N
            </div>
            <div className="flex-1">
              <p className="text-base font-extrabold text-foreground">Nubio Campos</p>
              <p className="mt-1 inline-flex rounded-full bg-secondary-soft px-2 py-1 text-xs font-bold text-primary-strong">
                Enfermeiro(a)
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-muted">
            <span>Maternidade</span>
            <span className="text-lg text-primary-strong">\u2192</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
