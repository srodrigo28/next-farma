import { ArrowRightIcon, PlusIcon, SearchIcon } from "@/shared/components/AppIcons";
import { AppScreen } from "@/shared/components/AppScreen";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { WorkspaceShell } from "@/shared/components/WorkspaceShell";
import { getDrawerMenu } from "@/app/dashboard/data";
import { PatientListItem, PatientUnitOption } from "../types";

function PatientRow({ patient }: { patient: PatientListItem }) {
  return (
    <article className="rounded-[24px] border border-white/70 bg-white/92 p-4 shadow-[0_14px_28px_rgba(15,31,56,0.05)]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary-strong">
          {patient.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold text-foreground">{patient.name}</p>
          <p className="mt-1 text-sm text-muted">
            Leito {patient.bed} · {patient.ageLabel} · Internado: {patient.admissionDate}
          </p>
        </div>
        <ArrowRightIcon className="h-4 w-4 text-muted" />
      </div>
    </article>
  );
}

export function PacientesPageView({
  patients,
  units,
}: {
  patients: PatientListItem[];
  units: PatientUnitOption[];
}) {
  const selectedUnit = units.find((unit) => unit.selected)?.label ?? "Todas as unidades";

  return (
    <AppScreen flush>
      <WorkspaceShell items={getDrawerMenu()}>
        <section className="space-y-5 pb-4">
          <div className="space-y-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">Pacientes</h1>
              <p className="mt-1 text-sm text-muted">
                {patients.length} paciente(s) · Internacional
              </p>
            </div>

            <PrimaryButton href="/pacientes/novo" className="max-w-[180px] gap-2">
              <PlusIcon className="h-4 w-4" />
              Novo paciente
            </PrimaryButton>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 rounded-[20px] border border-border bg-white px-4 py-3 shadow-[0_8px_18px_rgba(15,31,56,0.04)]">
              <SearchIcon className="h-5 w-5 text-muted" />
              <input
                type="text"
                placeholder="Nome, leito ou prontuário..."
                className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted/70"
              />
            </label>

            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-3 rounded-2xl border border-border bg-white px-4 text-sm font-semibold text-foreground shadow-[0_8px_18px_rgba(15,31,56,0.04)]"
            >
              <span>{selectedUnit}</span>
              <span className="text-muted">⌄</span>
            </button>
          </div>

          <section className="space-y-3 pt-2">
            {patients.map((patient) => (
              <PatientRow key={patient.id} patient={patient} />
            ))}
          </section>
        </section>
      </WorkspaceShell>
    </AppScreen>
  );
}
