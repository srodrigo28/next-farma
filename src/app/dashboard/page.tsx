"use client";

import { useEffect, useState } from "react";
import { getAuthSession, validateAuthSession, AuthUser } from "@/shared/lib/auth";
import { DashboardPageView } from "./components/DashboardPageView";
import { getDashboardStats, getDrawerMenu, getQuickAccess } from "./data";
import { DashboardStat } from "./types";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [user, setUser] = useState<AuthUser | null>(() => getAuthSession()?.user ?? null);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      const session = await validateAuthSession();
      if (!active || !session) return;

      setUser(session.user);
      const nextStats = await getDashboardStats();
      if (active) {
        setStats(nextStats);
      }
    }

    void loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  return (
    <DashboardPageView
      drawerMenu={getDrawerMenu()}
      stats={stats}
      quickAccess={getQuickAccess()}
      user={user}
    />
  );
}
