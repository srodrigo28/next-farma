import {
  ArrowRightIcon,
  BellIcon,
  BookIcon,
  BrandPillIcon,
  ClipboardIcon,
  CloseIcon,
  HandoffIcon,
  HeartbeatIcon,
  MedicationsIcon,
  OverviewIcon,
  PatientsIcon,
  ScaleIcon,
} from "@/shared/components/AppIcons";
import Link from "next/link";
import { WorkspaceModeToggle } from "@/shared/components/WorkspaceModeToggle";
import { DrawerMenuItem, WorkspaceMode } from "@/shared/types";

const iconMap = {
  overview: OverviewIcon,
  patients: PatientsIcon,
  medications: MedicationsIcon,
  os: ClipboardIcon,
  vitals: HeartbeatIcon,
  alerts: BellIcon,
  protocols: BookIcon,
  legal: ScaleIcon,
  handoff: HandoffIcon,
  tasks: ClipboardIcon,
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
            <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-linear-to-br from-primary to-primary-strong text-white shadow-[0_12px_24px_rgba(15,143,176,0.22)]">
              <BrandPillIcon className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-5 text-foreground">
                Enfermagem assistencial
              </p>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Brasil</p>
            </div>
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-muted"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-3">
            <WorkspaceModeToggle value={mode} onChange={onModeChange} compact />
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <nav className="space-y-2 px-4 py-4">
          {items.map((item) =>
            (() => {
              const Icon = iconMap[item.id as keyof typeof iconMap] ?? OverviewIcon;

              return (
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
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                      item.active
                        ? "bg-white text-primary shadow-[0_10px_24px_rgba(15,143,176,0.15)]"
                        : "bg-surface-alt text-muted"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-foreground">{item.label}</p>
                    <p className="text-sm text-muted">{item.description}</p>
                  </div>
                  {item.badge ? (
                    <span className="rounded-full bg-[#ffe3e5] px-2 py-1 text-xs font-extrabold text-danger">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })(),
          )}
        </nav>
      </div>

      <div className="shrink-0 border-t border-[#eef3f7] bg-white px-4 py-4 shadow-[0_-8px_18px_rgba(15,31,56,0.04)]">
        <div className="rounded-[24px] bg-linear-to-r from-[#f9fcff] to-[#f1f7fb] p-4 ring-1 ring-border">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-soft text-sm font-extrabold text-primary">
              N
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-foreground">Nubio Campos</p>
              <p className="mt-1 inline-flex rounded-full bg-secondary-soft px-2 py-1 text-xs font-semibold text-primary-strong">
                Enfermeiro(a)
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-muted">
            <span>Maternidade</span>
            <ArrowRightIcon className="h-4 w-4 text-primary-strong" />
          </div>
        </div>
      </div>
    </aside>
  );
}

