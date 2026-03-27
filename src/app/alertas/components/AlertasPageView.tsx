"use client";

import { useState } from "react";
import { BellIcon, MedicationsIcon } from "@/shared/components/AppIcons";
import { AppScreen } from "@/shared/components/AppScreen";
import { WorkspaceShell } from "@/shared/components/WorkspaceShell";
import { getDrawerMenu } from "@/app/dashboard/data";
import { snoozeAlert } from "../actions";
import { AlertItem } from "../types";

function AlertCard({
  alert,
  onSnooze,
}: {
  alert: AlertItem;
  onSnooze: (alertId: string) => void;
}) {
  return (
    <article className="rounded-[24px] border border-[#f5c8cb] bg-white/96 p-4 shadow-[0_14px_28px_rgba(15,31,56,0.05)]">
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#fff4f5] text-danger">
          <MedicationsIcon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold text-foreground">{alert.medicationName}</p>
              <p className="mt-1 text-sm text-muted">
                {alert.patientName} · {alert.doseLabel} · {alert.scheduleLabel}
              </p>
              {alert.priority ? (
                <p className="mt-1 text-sm font-semibold text-foreground">{alert.priority}</p>
              ) : null}
            </div>
            <p className="text-right text-lg font-bold text-danger">{alert.delayLabel}</p>
          </div>

          <button
            type="button"
            onClick={() => onSnooze(alert.id)}
            className="mt-3 text-sm font-medium text-muted underline-offset-2 hover:underline"
          >
            Silenciar 30m
          </button>
        </div>
      </div>
    </article>
  );
}

export function AlertasPageView({ alerts }: { alerts: AlertItem[] }) {
  const [feedback, setFeedback] = useState("");

  async function handleSnooze(alertId: string) {
    const result = await snoozeAlert(alertId);
    if (result.ok) setFeedback(result.message);
  }

  return (
    <AppScreen flush>
      <WorkspaceShell items={getDrawerMenu()}>
        <section className="space-y-5 pb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <BellIcon className="h-8 w-8 text-danger" />
              <h1 className="text-4xl font-bold tracking-tight text-foreground">Alertas</h1>
            </div>
            <p className="text-sm text-muted">{alerts.length} alertas ativos</p>
          </div>

          <div className="space-y-2">
            <p className="text-lg font-semibold uppercase tracking-[0.12em] text-danger">
              Medicações vencidas ({alerts.length})
            </p>
            {feedback ? <p className="text-sm font-medium text-primary">{feedback}</p> : null}
          </div>

          <section className="space-y-4">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} onSnooze={handleSnooze} />
            ))}
          </section>
        </section>
      </WorkspaceShell>
    </AppScreen>
  );
}
