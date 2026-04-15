import { LungsIcon, OxygenIcon, PainIcon, PlusIcon, ThermometerIcon } from "@/shared/components/AppIcons";
import { AppScreen } from "@/shared/components/AppScreen";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { WorkspaceShell } from "@/shared/components/WorkspaceShell";
import { getDrawerMenu } from "@/app/dashboard/data";
import { VitalRecordItem } from "../types";

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-[#fff7f7] px-4 py-3 text-center">
      <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-white text-danger shadow-[0_6px_14px_rgba(15,31,56,0.05)]">
        {icon}
      </div>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">{label}</p>
      <p className="mt-1 text-2xl font-bold text-danger">{value}</p>
    </div>
  );
}

function VitalRecordCard({ record }: { record: VitalRecordItem }) {
  return (
    <article className="rounded-[24px] border border-[#f0df9f] bg-white/92 p-4 shadow-[0_14px_28px_rgba(15,31,56,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xl font-semibold text-foreground">{record.patientName}</p>
          <p className="mt-1 text-sm text-muted">{record.recordedAt}</p>
        </div>
        {record.alerts.length ? (
          <span className="rounded-full bg-[#fff0bf] px-3 py-1 text-xs font-semibold text-[#9a6a00]">
            {record.alerts.join(" · ")}
          </span>
        ) : null}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {record.temperature ? <MetricCard label="Temp" value={record.temperature} icon={<ThermometerIcon className="h-4 w-4" />} /> : null}
        {record.pain ? <MetricCard label="Dor" value={record.pain} icon={<PainIcon className="h-4 w-4" />} /> : null}
        {record.respiratoryRate ? <MetricCard label="FR" value={record.respiratoryRate} icon={<LungsIcon className="h-4 w-4" />} /> : null}
        {record.spo2 ? <MetricCard label="SpO2" value={record.spo2} icon={<OxygenIcon className="h-4 w-4" />} /> : null}
      </div>

      {record.note ? <p className="mt-4 text-sm text-muted">{record.note}</p> : null}
    </article>
  );
}

export function SinaisVitaisPageView({ records }: { records: VitalRecordItem[] }) {
  return (
    <AppScreen flush>
      <WorkspaceShell items={getDrawerMenu()}>
        <section className="space-y-5 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">Sinais vitais</h1>
              <p className="mt-1 text-sm text-muted">{records.length} registros</p>
            </div>
            <PrimaryButton href="/sinais-vitais/novo" className="max-w-[190px] gap-2 bg-foreground hover:bg-surface-strong">
              <PlusIcon className="h-4 w-4" />
              Novo registro
            </PrimaryButton>
          </div>

          <section className="space-y-4">
            {records.map((record) => (
              <VitalRecordCard key={record.id} record={record} />
            ))}
          </section>
        </section>
      </WorkspaceShell>
    </AppScreen>
  );
}
