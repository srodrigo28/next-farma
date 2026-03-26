import { BrandPillIcon } from "@/shared/components/AppIcons";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-linear-to-br from-primary to-primary-strong shadow-[0_16px_32px_rgba(18,144,180,0.28)]">
        <BrandPillIcon className="h-10 w-10 text-white" />
      </div>
      {!compact ? (
        <div className="text-center">
          <p className="text-3xl font-bold tracking-tight text-foreground">
            Next Farma
          </p>
          <p className="text-base text-muted">
            Plataforma mobile-first para rotinas clínicas e assistenciais
          </p>
        </div>
      ) : null}
    </div>
  );
}
