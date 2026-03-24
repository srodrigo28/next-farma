import { WorkspaceMode } from "@/shared/types";

const options: Array<{
  value: WorkspaceMode;
  label: string;
  icon: string;
}> = [
  { value: "hospital", label: "HOSPITAL", icon: "\u9638" },
  { value: "aps", label: "APS", icon: "\u2302" },
];

export function WorkspaceModeToggle({
  value,
  onChange,
  compact = false,
}: {
  value: WorkspaceMode;
  onChange: (mode: WorkspaceMode) => void;
  compact?: boolean;
}) {
  return (
    <div className="inline-flex w-full rounded-full bg-[#f2f6fb] p-1">
      {options.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={active}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 font-extrabold transition-colors ${
              compact ? "py-1 text-sm" : "py-3 text-sm"
            } ${
              active
                ? "bg-primary text-white shadow-[0_8px_16px_rgba(15,143,176,0.25)]"
                : "text-muted"
            }`}
          >
            <span className="text-base">{option.icon}</span>
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
