import { SearchIcon } from "@/shared/components/AppIcons";
import { AppScreen } from "@/shared/components/AppScreen";
import { WorkspaceShell } from "@/shared/components/WorkspaceShell";
import { getDrawerMenu } from "@/app/dashboard/data";

const themeOptions = [
  { value: "all", label: "Todas", selected: true },
  { value: "emergency", label: "Urgencia" },
  { value: "maternity", label: "Maternidade" },
];

const statusOptions = [
  { value: "active", label: "Vigente", selected: true },
  { value: "review", label: "Em revisao" },
  { value: "archived", label: "Arquivado" },
];

const protocols = [
  {
    id: "avc-ativacao",
    badge: "EM",
    category: "AVC",
    title: "AVC - Reconhecimento e Protocolo de Ativacao",
    subtitle: "Linha de Cuidado AVC - MS 2012",
    views: 0,
    revision: "01/2021",
  },
  {
    id: "pcr-bls-acls",
    badge: "CFM",
    category: "PCR",
    title: "PCR - Suporte Basico e Avancado de Vida (BLS/ACLS)",
    subtitle: "Diretrizes AHA 2020 - adaptadas ILCOR",
    views: 0,
    revision: "11/2023",
  },
  {
    id: "curativo-ferida-cirurgica",
    badge: "COFEN",
    category: "Curativos",
    title: "Cuidados com Curativo de Ferida Cirurgica",
    subtitle: "Resolucao COFEN 567/2018",
    views: 0,
    revision: "05/2024",
  },
];

export default function ProtocolosPage() {
  return (
    <AppScreen flush>
      <WorkspaceShell items={getDrawerMenu()}>
        <section className="space-y-5 pb-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Protocolos clinicos</h1>
            <p className="mt-1 text-sm text-muted">{protocols.length} protocolos disponiveis</p>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 rounded-[20px] border border-border bg-white px-4 py-3 shadow-[0_8px_18px_rgba(15,31,56,0.04)]">
              <SearchIcon className="h-5 w-5 text-muted" />
              <input
                type="text"
                placeholder="Buscar protocolo..."
                className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted/70"
              />
            </label>

            <div className="flex flex-wrap gap-3">
              {[...themeOptions, ...statusOptions].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`min-h-11 rounded-2xl px-4 text-sm font-semibold shadow-[0_8px_18px_rgba(15,31,56,0.04)] ${
                    option.selected ? "bg-white text-foreground" : "bg-white/75 text-muted"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <section className="space-y-4">
            {protocols.map((protocol) => (
              <article key={protocol.id} className="rounded-[24px] border border-white/70 bg-white/92 p-4 shadow-[0_14px_28px_rgba(15,31,56,0.05)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary-strong">
                      {protocol.badge}
                    </div>
                    <p className="pt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      {protocol.category}
                    </p>
                  </div>
                  <button type="button" className="text-lg text-border">☆</button>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-xl font-semibold leading-7 text-foreground">{protocol.title}</p>
                  <p className="text-sm text-muted">{protocol.subtitle}</p>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm text-muted">
                  <span>◌ {protocol.views}</span>
                  <span>Revisao: {protocol.revision}</span>
                </div>
              </article>
            ))}
          </section>
        </section>
      </WorkspaceShell>
    </AppScreen>
  );
}
