import Link from "next/link";
import { DrawerMenuItem } from "@/shared/types";

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
}: {
  items: DrawerMenuItem[];
  onClose?: () => void;
}) {
  return (
    <aside className="rounded-[30px] border border-white/80 bg-white/90 p-4 shadow-[0_22px_50px_rgba(15,31,56,0.12)]">
      <div className="rounded-[26px] bg-linear-to-br from-surface-strong to-[#17345c] p-4 text-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/16 text-2xl">
              +
            </div>
            <div>
              <p className="text-lg font-extrabold leading-5">Auxiliar de Enfermagem</p>
              <p className="mt-1 text-xs uppercase tracking-[0.28em] text-white/60">Brasil</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg text-white/70"
          >
            x
          </button>
        </div>

        <div className="mt-5 flex rounded-full bg-white/8 p-1">
          <button
            type="button"
            className="flex-1 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-surface-strong"
          >
            Hospital
          </button>
          <button
            type="button"
            className="flex-1 rounded-full px-4 py-2 text-sm font-bold text-white/66"
          >
            APS
          </button>
        </div>
      </div>

      <nav className="mt-4 space-y-2">
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

      <div className="mt-5 rounded-[24px] bg-linear-to-r from-[#f9fcff] to-[#f1f7fb] p-4 ring-1 ring-border">
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
    </aside>
  );
}
