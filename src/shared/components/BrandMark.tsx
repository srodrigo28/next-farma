export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-linear-to-br from-primary to-primary-strong shadow-[0_16px_32px_rgba(18,144,180,0.28)]">
        <div className="text-4xl text-white">{compact ? "+" : "\u2695"}</div>
      </div>
      {!compact ? (
        <div className="text-center">
          <p className="text-3xl font-extrabold tracking-tight text-foreground">
            Next Farma
          </p>
          <p className="text-base text-muted">
            Plataforma mobile first para rotinas clinicas e assistenciais
          </p>
        </div>
      ) : null}
    </div>
  );
}
