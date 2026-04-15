import { MenuIcon } from "@/shared/components/AppIcons";
import Link from "next/link";
import { WorkspaceModeToggle } from "@/shared/components/WorkspaceModeToggle";
import { WorkspaceMode } from "@/shared/types";

function getPlanLabel(plan?: string | null) {
  if (plan === "plano1") return "Pro";
  if (plan === "plano2") return "Vip Plus";
  return "Free";
}

function getPlanClassName(plan?: string | null) {
  if (plan === "plano2") return "bg-[#fff4d8] text-[#8a5a00] ring-[#f0cf78]";
  if (plan === "plano1") return "bg-[#e8fff6] text-[#087a5d] ring-[#b7ead8]";
  return "bg-[#eef3f7] text-[#456070] ring-[#dce7ee]";
}

function PlanBadge({ plan }: { plan?: string | null }) {
  return (
    <span className={`inline-flex min-h-8 items-center rounded-full px-4 text-xs font-extrabold uppercase tracking-[0.18em] ring-1 ${getPlanClassName(plan)}`}>
      {getPlanLabel(plan)}
    </span>
  );
}

export function AppNavbar({
  onOpenMenu,
  mode,
  onModeChange,
  userName,
  subscriptionPlan,
}: {
  onOpenMenu: () => void;
  mode: WorkspaceMode;
  onModeChange: (mode: WorkspaceMode) => void;
  userName?: string;
  subscriptionPlan?: string | null;
}) {
  return (
    <header className="sticky top-0 z-30 bg-white">
      <div className="border-b border-[#eef3f7] px-4 pb-3 pt-4 shadow-[0_8px_18px_rgba(15,31,56,0.04)]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={onOpenMenu}
            className="flex h-9 w-10 items-center justify-center text-[30px] font-light text-foreground"
          >
            <MenuIcon className="h-7 w-7" />
          </button>
          <Link href="/dashboard" className="flex min-w-0 flex-1 items-center gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-5 text-foreground">
                Enfermagem assistencial
              </p>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">
                {userName || "Brasil"}
              </p>
            </div>
          </Link>
          <div className="hidden sm:block">
            <PlanBadge plan={subscriptionPlan} />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <WorkspaceModeToggle value={mode} onChange={onModeChange} compact />
          <div className="sm:hidden">
            <PlanBadge plan={subscriptionPlan} />
          </div>
        </div>
      </div>
    </header>
  );
}
