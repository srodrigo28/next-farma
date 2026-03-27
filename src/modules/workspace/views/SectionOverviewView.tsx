import {
  AlertTriangleIcon,
  BookIcon,
  ClipboardIcon,
  HandoffIcon,
  ScaleIcon,
  SearchIcon,
} from "@/shared/components/AppIcons";
import { AppScreen } from "@/shared/components/AppScreen";
import { WorkspaceShell } from "@/shared/components/WorkspaceShell";
import { DrawerMenuItem } from "@/shared/types";

const iconMap = {
  protocols: BookIcon,
  legal: ScaleIcon,
  operations: ClipboardIcon,
  handoff: HandoffIcon,
  search: SearchIcon,
  alert: AlertTriangleIcon,
};

export function SectionOverviewView({
  drawerMenu,
  eyebrow,
  title,
  description,
  icon,
  cards,
}: {
  drawerMenu: DrawerMenuItem[];
  eyebrow: string;
  title: string;
  description: string;
  icon?: keyof typeof iconMap;
  cards: Array<{ title: string; text: string; icon?: keyof typeof iconMap }>;
}) {
  const HeaderIcon = icon ? iconMap[icon] : null;

  return (
    <AppScreen flush className="space-y-6">
      <WorkspaceShell items={drawerMenu}>
        <section className="rounded-[30px] bg-white/82 p-5 shadow-[0_18px_36px_rgba(15,31,56,0.08)]">
          {HeaderIcon ? (
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[20px] bg-primary-soft text-primary-strong shadow-[0_10px_24px_rgba(15,143,176,0.10)]">
              <HeaderIcon className="h-7 w-7" />
            </div>
          ) : null}
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary-strong">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-3 text-base leading-7 text-muted">{description}</p>
        </section>

        <section className="space-y-4 pb-4">
          {cards.map((card) => {
            const CardIcon = card.icon ? iconMap[card.icon] : null;

            return (
              <article
                key={card.title}
                className="rounded-[24px] border border-white/70 bg-white/92 p-4 shadow-[0_14px_28px_rgba(15,31,56,0.05)]"
              >
                <div className="flex items-start gap-4">
                  {CardIcon ? (
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-alt text-primary">
                      <CardIcon className="h-5 w-5" />
                    </div>
                  ) : null}
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-foreground">{card.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{card.text}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </WorkspaceShell>
    </AppScreen>
  );
}
