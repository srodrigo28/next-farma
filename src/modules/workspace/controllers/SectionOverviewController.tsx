import { getDrawerMenu } from "@/app/dashboard/data";
import { SectionOverviewView } from "../views/SectionOverviewView";

export function SectionOverviewController({
  eyebrow,
  title,
  description,
  icon,
  cards,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon?: "protocols" | "legal" | "operations" | "handoff" | "search" | "alert";
  cards: Array<{
    title: string;
    text: string;
    icon?: "protocols" | "legal" | "operations" | "handoff" | "search" | "alert";
  }>;
}) {
  return (
    <SectionOverviewView
      drawerMenu={getDrawerMenu()}
      eyebrow={eyebrow}
      title={title}
      description={description}
      icon={icon}
      cards={cards}
    />
  );
}
