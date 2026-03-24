import { SelectOption } from "@/shared/types";

export function OptionCard({ option }: { option: SelectOption }) {
  const selectedClassName = option.selected
    ? "border-primary bg-primary-soft"
    : "border-border bg-white";

  return (
    <div
      className={`flex items-center gap-4 rounded-[22px] border p-4 shadow-[0_8px_25px_rgba(16,33,62,0.05)] ${selectedClassName}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-alt text-xl text-primary">
        {option.selected ? "\u2713" : "\u25A6"}
      </div>
      <div className="flex-1">
        <p className="text-xl font-extrabold text-foreground">{option.title}</p>
        <p className="text-sm leading-5 text-muted">{option.description}</p>
      </div>
      <div className="text-2xl text-muted">{option.selected ? "" : "\u203A"}</div>
    </div>
  );
}
