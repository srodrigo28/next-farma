"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppDrawer } from "@/shared/components/AppDrawer";
import { AppNavbar } from "@/shared/components/AppNavbar";
import { AuthSession, clearAuthSession, getAuthSession, validateAuthSession } from "@/shared/lib/auth";
import { DrawerMenuItem, WorkspaceMode } from "@/shared/types";

export function WorkspaceShell({
  children,
  items,
}: {
  children: ReactNode;
  items: DrawerMenuItem[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<WorkspaceMode>("hospital");
  const [session, setSession] = useState<AuthSession | null>(() => getAuthSession());
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const sessionAccessToken = session?.accessToken;

  useEffect(() => {
    let active = true;

    async function checkSession() {
      if (!session) {
        if (active) {
          setIsCheckingSession(false);
          router.replace("/login");
        }
        return;
      }

      const validatedSession = await validateAuthSession();
      if (!active) return;

      if (!validatedSession) {
        setSession(null);
        setIsCheckingSession(false);
        router.replace("/login");
        return;
      }

      setSession(validatedSession);
      setIsCheckingSession(false);
    }

    void checkSession();

    return () => {
      active = false;
    };
  }, [router, session, sessionAccessToken]);

  function handleLogout() {
    clearAuthSession();
    setSession(null);
    router.replace("/login");
  }

  const menuItems = items.map((item) => ({
    ...item,
    active: pathname === item.href,
  }));

  if (isCheckingSession || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f8fb] text-sm font-semibold text-muted">
        Carregando sessão...
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden md:h-[calc(100vh-40px)]">
      <div className="shrink-0">
        <AppNavbar
          onOpenMenu={() => setOpen((value) => !value)}
          mode={mode}
          onModeChange={setMode}
          userName={session.user.name}
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
            userName={session.user.name}
            userRole="Enfermagem"
            userUnit="Hospital"
            onLogout={handleLogout}
          />
        </div>

        <div className="h-full overflow-y-auto px-4 pb-6 pt-4">{children}</div>
      </section>
    </div>
  );
}
