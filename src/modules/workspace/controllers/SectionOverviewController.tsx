import { getDrawerMenu } from "@/modules/dashboard/models/dashboardModel";
import { SectionOverviewView } from "../views/SectionOverviewView";

export function SectionOverviewController({
  eyebrow,
  title,
  description,
  cards,
}: {
  eyebrow: string;
  title: string;
  description: string;
  cards: Array<{ title: string; text: string }>;
}) {
  return (
    <SectionOverviewView
      drawerMenu={getDrawerMenu()}
      eyebrow={eyebrow}
      title={title}
      description={description}
      cards={cards}
    />
  );
}
