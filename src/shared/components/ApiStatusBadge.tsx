"use client";

import { useEffect, useState } from "react";
import { createApiUrl, getApiBaseUrl } from "@/shared/lib/api";

export function ApiStatusBadge() {
  const [status, setStatus] = useState<"checking" | "online" | "offline">("checking");

  useEffect(() => {
    let active = true;

    async function checkApi() {
      try {
        const response = await fetch(createApiUrl("/api/v1/health"), {
          cache: "no-store",
        });

        if (!active) return;
        setStatus(response.ok ? "online" : "offline");
      } catch {
        if (!active) return;
        setStatus("offline");
      }
    }

    void checkApi();

    return () => {
      active = false;
    };
  }, []);

  const label =
    status === "checking"
      ? "API verificando"
      : status === "online"
        ? "API online"
        : "API indisponivel";

  const className =
    status === "checking"
      ? "bg-[#eef4ff] text-[#335d9b]"
      : status === "online"
        ? "bg-[#e8f7ef] text-[#1d7b52]"
        : "bg-[#fff1f0] text-[#b74c45]";

  return (
    <span
      title={getApiBaseUrl()}
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${className}`}
    >
      {label}
    </span>
  );
}
