"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { AppDrawer } from "@/shared/components/AppDrawer";
import { DrawerMenuItem } from "@/shared/types";

export function WorkspaceShell({
  children,
  items,
  title,
  subtitle,
}: {
  children: ReactNode;
  items: DrawerMenuItem[];
  title: string;
  subtitle: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menuItems = items.map((item) => ({
    ...item,
    active: pathname === item.href,
  }));

  return (
    <div className="space-y-4">
      <section className="relative">
        <div className="flex items-center gap-3 rounded-[28px] bg-linear-to-r from-surface-strong to-[#16345b] p-4 text-white shadow-[0_22px_50px_rgba(15,31,56,0.16)]">
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setOpen(true)}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl"
          >
            =
          </button>
          <div className="flex-1">
            <p className="text-lg font-extrabold">{title}</p>
            <p className="text-sm text-white/68">{subtitle}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl font-extrabold">
            +
          </div>
        </div>

        <div
          className={`fixed inset-0 z-40 bg-[#0e1c34]/34 backdrop-blur-[2px] transition-opacity md:hidden ${
            open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          className={`fixed inset-y-0 left-0 z-50 w-[88vw] max-w-[360px] p-3 transition-transform duration-300 md:hidden ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <AppDrawer items={menuItems} onClose={() => setOpen(false)} />
        </div>

        <div className="hidden md:block">
          <div className="mt-4">
            <AppDrawer items={menuItems} />
          </div>
        </div>
      </section>

      {children}
    </div>
  );
}
