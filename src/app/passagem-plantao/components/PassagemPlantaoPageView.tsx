"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarClockIcon, ClipboardIcon, PlusIcon } from "@/shared/components/AppIcons";
import { AppScreen } from "@/shared/components/AppScreen";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { WorkspaceShell } from "@/shared/components/WorkspaceShell";
import { getDrawerMenu } from "@/app/dashboard/data";
import { getHandoffRecords } from "../data";
import { HandoffRecordItem } from "../types";

function cacheHandoffRecord(record: HandoffRecordItem) {
  window.sessionStorage.setItem(`next-farma.handoff.${record.id}`, JSON.stringify(record));
}

function HandoffCard({ record }: { record: HandoffRecordItem }) {
  return (
    <Link
      href={`/passagem-plantao/${record.id}`}
      onClick={() => cacheHandoffRecord(record)}
      className="group block rounded-[24px] border border-white/70 bg-white/92 p-4 shadow-[0_14px_28px_rgba(15,31,56,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_18px_34px_rgba(15,31,56,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#fff0bf] px-3 py-1 text-xs font-semibold text-[#9a6a00]">
            {record.shiftLabel}
          </span>
          <span className="text-sm font-medium text-muted">{record.unitLabel}</span>
        </div>
        <div className="flex items-center gap-2 text-primary-strong">
          <span className="text-xs font-bold uppercase tracking-[0.14em] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            Editar
          </span>
          <ClipboardIcon className="h-5 w-5 text-border transition-colors group-hover:text-primary-strong" />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="inline-flex items-center gap-2 text-sm text-muted">
          <CalendarClockIcon className="h-4 w-4" />
          <span>{record.date}</span>
        </div>
        <p className="text-lg font-semibold text-foreground">{record.summary}</p>
        <p className="text-sm text-muted">Por: {record.author}</p>
      </div>
    </Link>
  );
}

export function PassagemPlantaoPageView() {
  const [records, setRecords] = useState<HandoffRecordItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadRecords() {
      const payload = await getHandoffRecords();
      if (!active) return;
      setRecords(payload);
      setIsLoading(false);
    }

    void loadRecords();

    return () => {
      active = false;
    };
  }, []);

  return (
    <AppScreen flush>
      <WorkspaceShell items={getDrawerMenu()}>
        <section className="space-y-5 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">Passagem de plantão</h1>
              <p className="mt-1 text-sm text-muted">
                {isLoading ? "Carregando registros..." : `${records.length} registro(s)`}
              </p>
            </div>
            <PrimaryButton href="/passagem-plantao/novo" className="max-w-[190px] gap-2">
              <PlusIcon className="h-4 w-4" />
              Novo registro
            </PrimaryButton>
          </div>

          <section className="space-y-4">
            {records.map((record) => (
              <HandoffCard key={record.id} record={record} />
            ))}
            {!isLoading && records.length === 0 ? (
              <div className="rounded-[24px] border border-white/70 bg-white/92 p-5 text-center text-sm font-semibold text-muted shadow-[0_14px_28px_rgba(15,31,56,0.05)]">
                Nenhuma passagem registrada ainda.
              </div>
            ) : null}
          </section>
        </section>
      </WorkspaceShell>
    </AppScreen>
  );
}