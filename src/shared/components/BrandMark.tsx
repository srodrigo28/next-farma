import { BrandPillIcon } from "@/shared/components/AppIcons";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-linear-to-br from-primary to-primary-strong shadow-[0_16px_32px_rgba(18,144,180,0.28)]">
        <BrandPillIcon className="h-10 w-10 text-white" />
      </div>
      {!compact ? (
        <div className="text-center">
          <p className="py-10 text-3xl font-bold tracking-tight text-foreground">
            Passagem de plantão sem estresse
          </p>
          <p className="text-base text-muted">
            Chega do caos na hora de assumir o plantão. Tenha mais controle sobre a sua rotina diária.
          </p>
        </div>
      ) : null}
    </div>
  );
}
