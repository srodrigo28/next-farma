import { ClipboardIcon, PlusIcon } from "@/shared/components/AppIcons";
import { AppScreen } from "@/shared/components/AppScreen";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { WorkspaceShell } from "@/shared/components/WorkspaceShell";
import { getDrawerMenu } from "@/app/dashboard/data";
import { getTaskTabs } from "../data";
import { TaskItem, TaskTab } from "../types";

function EmptyTasksState() {
  return (
    <section className="rounded-[28px] border border-dashed border-border bg-white/85 px-6 py-10 text-center shadow-[0_14px_28px_rgba(15,31,56,0.04)]">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary-soft text-primary">
        <ClipboardIcon className="h-7 w-7" />
      </div>
      <h2 className="mt-4 text-2xl font-bold text-foreground">Sem tarefas</h2>
      <p className="mt-2 text-sm leading-6 text-muted">Nenhuma tarefa encontrada para este turno.</p>
    </section>
  );
}

function TaskTabs({ activeTab }: { activeTab: TaskTab }) {
  const tabs = getTaskTabs();

  return (
    <div className="flex flex-wrap gap-2 rounded-[24px] border border-white/70 bg-white/85 p-2 shadow-[0_12px_24px_rgba(15,31,56,0.04)]">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            className={`rounded-2xl px-4 py-2 text-sm font-semibold transition-colors ${
              isActive ? "bg-foreground text-white shadow-[0_10px_20px_rgba(15,31,56,0.18)]" : "text-muted hover:bg-surface-alt"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export function TarefasPageView({ tasks }: { tasks: TaskItem[] }) {
  return (
    <AppScreen flush>
      <WorkspaceShell items={getDrawerMenu()}>
        <section className="space-y-5 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">Tarefas</h1>
              <p className="mt-1 text-sm text-muted">{tasks.length} tarefa(s)</p>
            </div>
            <PrimaryButton href="/tarefas/nova" className="max-w-[180px] gap-2">
              <PlusIcon className="h-4 w-4" />
              Nova tarefa
            </PrimaryButton>
          </div>

          <TaskTabs activeTab="pending" />

          {tasks.length ? (
            <section className="space-y-4">
              {tasks.map((task) => (
                <article key={task.id} className="rounded-[24px] border border-white/70 bg-white/92 p-4 shadow-[0_14px_28px_rgba(15,31,56,0.05)]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-foreground">{task.title}</p>
                      <p className="mt-1 text-sm text-muted">{task.category} • {task.unit}</p>
                    </div>
                    <span className="rounded-full bg-secondary-soft px-3 py-1 text-xs font-semibold text-primary-strong">{task.dueAt}</span>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <EmptyTasksState />
          )}
        </section>
      </WorkspaceShell>
    </AppScreen>
  );
}
