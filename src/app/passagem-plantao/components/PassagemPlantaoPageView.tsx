import { CalendarClockIcon, ClipboardIcon, PlusIcon } from "@/shared/components/AppIcons";
import { AppScreen } from "@/shared/components/AppScreen";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { WorkspaceShell } from "@/shared/components/WorkspaceShell";
import { getDrawerMenu } from "@/app/dashboard/data";
import { HandoffRecordItem } from "../types";

function HandoffCard({ record }: { record: HandoffRecordItem }) {
  return (
    <article className="rounded-[24px] border border-white/70 bg-white/92 p-4 shadow-[0_14px_28px_rgba(15,31,56,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#fff0bf] px-3 py-1 text-xs font-semibold text-[#9a6a00]">
            {record.shiftLabel}
          </span>
          <span className="text-sm font-medium text-muted">{record.unitLabel}</span>
        </div>
        <ClipboardIcon className="h-5 w-5 text-border" />
      </div>

      <div className="mt-4 space-y-3">
        <div className="inline-flex items-center gap-2 text-sm text-muted">
          <CalendarClockIcon className="h-4 w-4" />
          <span>{record.date}</span>
        </div>
        <p className="text-lg font-semibold text-foreground">{record.summary}</p>
        <p className="text-sm text-muted">Por: {record.author}</p>
      </div>
    </article>
  );
}

export function PassagemPlantaoPageView({ records }: { records: HandoffRecordItem[] }) {
  return (
    <AppScreen flush>
      <WorkspaceShell items={getDrawerMenu()}>
        <section className="space-y-5 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">Passagem de plantão</h1>
              <p className="mt-1 text-sm text-muted">{records.length} registro(s)</p>
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
          </section>
        </section>
      </WorkspaceShell>
    </AppScreen>
  );
}
