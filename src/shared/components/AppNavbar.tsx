import { MenuIcon } from "@/shared/components/AppIcons";
import Link from "next/link";
import { WorkspaceModeToggle } from "@/shared/components/WorkspaceModeToggle";
import { WorkspaceMode } from "@/shared/types";

export function AppNavbar({
  onOpenMenu,
  mode,
  onModeChange,
}: {
  onOpenMenu: () => void;
  mode: WorkspaceMode;
  onModeChange: (mode: WorkspaceMode) => void;
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
                Brasil
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-3">
          <WorkspaceModeToggle value={mode} onChange={onModeChange} compact />
        </div>
      </div>
    </header>
  );
}
