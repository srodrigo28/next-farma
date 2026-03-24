import { AppScreen } from "@/shared/components/AppScreen";
import { WorkspaceShell } from "@/shared/components/WorkspaceShell";
import { DrawerMenuItem } from "@/shared/types";

export function SectionOverviewView({
  drawerMenu,
  eyebrow,
  title,
  description,
  cards,
}: {
  drawerMenu: DrawerMenuItem[];
  eyebrow: string;
  title: string;
  description: string;
  cards: Array<{ title: string; text: string }>;
}) {
  return (
    <AppScreen className="space-y-6">
      <WorkspaceShell
        items={drawerMenu}
        title="Painel Assistencial"
        subtitle="Navegacao modular pronta para expandir o produto"
      >
        <section className="rounded-[30px] bg-white/82 p-5 shadow-[0_18px_36px_rgba(15,31,56,0.08)]">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary-strong">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-3 text-base leading-7 text-muted">{description}</p>
        </section>

        <section className="space-y-4 pb-4">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-[24px] border border-white/70 bg-white/92 p-4 shadow-[0_14px_28px_rgba(15,31,56,0.05)]"
            >
              <p className="text-xl font-extrabold text-foreground">{card.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{card.text}</p>
            </article>
          ))}
        </section>
      </WorkspaceShell>
    </AppScreen>
  );
}
