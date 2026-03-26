"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { AppDrawer } from "@/shared/components/AppDrawer";
import { AppNavbar } from "@/shared/components/AppNavbar";
import { DrawerMenuItem, WorkspaceMode } from "@/shared/types";

export function WorkspaceShell({
  children,
  items,
}: {
  children: ReactNode;
  items: DrawerMenuItem[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<WorkspaceMode>("hospital");

  const menuItems = items.map((item) => ({
    ...item,
    active: pathname === item.href,
  }));

  return (
    <div className="flex h-screen flex-col overflow-hidden md:h-[calc(100vh-40px)]">
      <div className="shrink-0">
        <AppNavbar
          onOpenMenu={() => setOpen((value) => !value)}
          mode={mode}
          onModeChange={setMode}
        />
      </div>

      <section className="relative min-h-0 flex-1 overflow-hidden">
        <div
          className={`fixed inset-0 z-40 bg-[#0e1c34]/24 transition-opacity ${
            open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          className={`fixed inset-y-0 left-0 z-50 w-[84vw] max-w-[320px] transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <AppDrawer
            items={menuItems}
            onClose={() => setOpen(false)}
            mode={mode}
            onModeChange={setMode}
          />
        </div>

        <div className="h-full overflow-y-auto px-4 pb-6 pt-4">
          {children}
        </div>
      </section>
    </div>
  );
}
