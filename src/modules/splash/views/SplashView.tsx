import { AppScreen } from "@/shared/components/AppScreen";
import { BrandMark } from "@/shared/components/BrandMark";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { SplashContent } from "@/shared/types";

export function SplashView({ content }: { content: SplashContent }) {
  return (
    <AppScreen className="flex flex-col justify-between gap-10">
      <section className="flex flex-1 flex-col items-center justify-center gap-8 py-6 text-center">
        <BrandMark />
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-primary-soft px-4 py-2 text-sm font-bold text-primary-strong">
            {content.eyebrow}
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground">
            {content.title}
          </h1>
          <p className="text-lg leading-7 text-muted">{content.subtitle}</p>
        </div>
      </section>

      <section className="space-y-4 pb-4">
        <PrimaryButton href={content.primaryAction.href}>
          {content.primaryAction.label}
        </PrimaryButton>
        <PrimaryButton href={content.secondaryAction.href} variant="ghost">
          {content.secondaryAction.label}
        </PrimaryButton>
      </section>
    </AppScreen>
  );
}
