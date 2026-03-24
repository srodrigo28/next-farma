import Link from "next/link";

export function AppNavbar({
  onOpenMenu,
}: {
  onOpenMenu: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 bg-slate-300 flex">
      <div className="border-b border-[#eef3f7] px-4 pb-3 pt-4 shadow-[0_8px_18px_rgba(15,31,56,0.04)]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={onOpenMenu}
            className="flex h-9 w-10 items-center justify-center text-[30px] font-light text-foreground"
          >
            &#9776;
          </button>
          <Link href="/dashboard" className="flex min-w-0 flex-1 items-center gap-3">
            <div className="min-w-0">
              <p className="text-[14px] font-extrabold leading-5 text-foreground">
                Auxiliar de Enfermagem
              </p>
              <p className="text-[14px] font-extrabold leading-5 text-foreground">
                Brasil
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-3 ">
            <div className="flex rounded-full bg-[#f2f6fb]">
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-1 text-sm font-extrabold text-white shadow-[0_8px_16px_rgba(15,143,176,0.25)]"
              >
                <span className="text-base">&#9638;</span>
                <span className="text-10">HOSPITAL</span>
              </button>
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-1 text-sm font-bold text-muted"
              >
                <span className="text-base">&#8962;</span>
                <span className="text-10">APS</span>
              </button>
            </div>
          </div>
      </div>
    </header>
  );
}
