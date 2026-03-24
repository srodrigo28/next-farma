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
    <div>
      <AppNavbar
        onOpenMenu={() => setOpen(true)}
        mode={mode}
        onModeChange={setMode}
      />

      <section className="relative">
        <div
          className={`fixed inset-0 z-40 bg-[#0e1c34]/24 transition-opacity md:hidden ${
            open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          className={`fixed inset-y-0 left-0 z-50 w-[84vw] max-w-[320px] transition-transform duration-300 md:hidden ${
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

        <div className="hidden border-r border-[#eef3f7] bg-white md:fixed md:inset-y-0 md:left-0 md:z-20 md:block md:w-[320px]">
          <AppDrawer items={menuItems} mode={mode} onModeChange={setMode} />
        </div>

        <div className="px-4 pb-4 pt-4 md:ml-[320px]">
          {children}
        </div>
      </section>
    </div>
  );
}
