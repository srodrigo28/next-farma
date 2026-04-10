import { ArrowRightIcon, CheckIcon, CircleIcon } from "@/shared/components/AppIcons";
import { SelectOption } from "@/shared/types";

export function OptionCard({
  option,
  onSelect,
}: {
  option: SelectOption;
  onSelect?: (optionId: string) => void;
}) {
  const selectedClassName = option.selected
    ? "border-primary bg-primary-soft shadow-[0_16px_30px_rgba(15,143,176,0.10)]"
    : "border-border bg-white";

  return (
    <button
      type="button"
      aria-pressed={option.selected}
      onClick={() => onSelect?.(option.id)}
      className={`flex w-full items-center gap-4 rounded-[22px] border p-4 text-left shadow-[0_8px_25px_rgba(16,33,62,0.05)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 ${selectedClassName}`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
          option.selected
            ? "bg-primary text-white shadow-[0_12px_24px_rgba(15,143,176,0.24)]"
            : "bg-surface-alt text-primary"
        }`}
      >
        {option.selected ? (
          <CheckIcon className="h-5 w-5" />
        ) : (
          <CircleIcon className="h-5 w-5" />
        )}
      </div>
      <div className="flex-1">
        <p className="text-lg font-semibold text-foreground">{option.title}</p>
        <p className="text-sm leading-5 text-muted">{option.description}</p>
      </div>
      <div className="text-muted">{!option.selected ? <ArrowRightIcon className="h-5 w-5" /> : null}</div>
    </button>
  );
}
