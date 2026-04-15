"use client";

import { useEffect, useState } from "react";
import { DashboardPageView } from "./components/DashboardPageView";
import { getDashboardStats, getDrawerMenu, getQuickAccess } from "./data";
import { DashboardStat } from "./types";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStat[]>([]);

  useEffect(() => {
    let active = true;

    async function loadStats() {
      const nextStats = await getDashboardStats();
      if (active) {
        setStats(nextStats);
      }
    }

    void loadStats();

    return () => {
      active = false;
    };
  }, []);

  return (
    <DashboardPageView
      drawerMenu={getDrawerMenu()}
      stats={stats}
      quickAccess={getQuickAccess()}
    />
  );
}
