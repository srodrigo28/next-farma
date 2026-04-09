import {
  CalendarClockIcon,
  MedicationsIcon,
  PlusIcon,
  SyringeIcon,
} from "@/shared/components/AppIcons";
import { AppScreen } from "@/shared/components/AppScreen";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { WorkspaceShell } from "@/shared/components/WorkspaceShell";
import { getDrawerMenu } from "@/app/dashboard/data";
import { MedicationScheduleItem, MedicationTab } from "../types";

function TabButton({ tab }: { tab: MedicationTab }) {
  return (
    <button
      type="button"
      className={`rounded-2xl px-4 py-2 text-sm font-semibold shadow-[0_8px_18px_rgba(15,31,56,0.04)] ${
        tab.selected ? "bg-white text-foreground" : "bg-transparent text-muted"
      }`}
    >
      {tab.label}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-[28px] px-6 py-14 text-center text-muted">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80 text-border shadow-[0_10px_24px_rgba(15,31,56,0.04)]">
        <MedicationsIcon className="h-10 w-10" />
      </div>
      <p className="mt-6 text-lg leading-8">Nenhuma medicação pendente nas próximas 2 horas.</p>
    </div>
  );
}

function MedicationList({ items }: { items: MedicationScheduleItem[] }) {
  if (!items.length) return <EmptyState />;

  return (
    <section className="space-y-4">
      {items.map((item) => (
        <article key={item.id} className="rounded-[24px] border border-white/70 bg-white/92 p-4 shadow-[0_14px_28px_rgba(15,31,56,0.05)]">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary-strong">
              <SyringeIcon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-foreground">{item.medicationName}</p>
              <p className="mt-1 text-sm text-muted">{item.patientName} · {item.doseLabel}</p>
              <div className="mt-2 inline-flex items-center gap-2 text-sm text-muted">
                <CalendarClockIcon className="h-4 w-4" />
                <span>Agendado para {item.scheduledFor}</span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

export function MedicamentosPageView({
  tabs,
  schedules,
}: {
  tabs: MedicationTab[];
  schedules: MedicationScheduleItem[];
}) {
  return (
    <AppScreen flush>
      <WorkspaceShell items={getDrawerMenu()}>
        <section className="space-y-5 pb-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Medicações</h1>
            <p className="mt-1 text-sm text-muted">{schedules.length} pendente(s) nas próximas 2h</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-[20px] bg-[#eef3f7] p-1">
              {tabs.map((tab) => (
                <TabButton key={tab.id} tab={tab} />
              ))}
            </div>
            <PrimaryButton href="/medicamentos/prescricao/nova" className="max-w-[170px] gap-2">
              <PlusIcon className="h-4 w-4" />
              Prescrição
            </PrimaryButton>
          </div>

          <MedicationList items={schedules} />
        </section>
      </WorkspaceShell>
    </AppScreen>
  );
}
