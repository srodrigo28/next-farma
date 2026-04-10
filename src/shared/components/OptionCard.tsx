import {
  AlertTriangleIcon,
  ArrowRightIcon,
  CheckIcon,
  CircleIcon,
  ClipboardIcon,
  HeartbeatIcon,
  HomeIcon,
  HospitalIcon,
  LungsIcon,
  SyringeIcon,
} from "@/shared/components/AppIcons";
import { GrConfigure } from "react-icons/gr";
import { IoShieldOutline } from "react-icons/io5";
import { PiGraduationCapLight } from "react-icons/pi";
import { SelectOption } from "@/shared/types";

function getOptionIcon(option: SelectOption) {
  const iconClassName = "h-6.5 w-6.5";

  switch (option.icon) {
    case "shield":
      return <IoShieldOutline className={iconClassName} />;
    case "wrench":
      return <GrConfigure className={iconClassName} />;
    case "graduation-cap":
      return <PiGraduationCapLight className={iconClassName} />;
    case "hospital":
      return <HospitalIcon className={iconClassName} />;
    case "home":
      return <HomeIcon className={iconClassName} />;
    case "heartbeat":
      return <HeartbeatIcon className={iconClassName} />;
    case "alert-triangle":
      return <AlertTriangleIcon className={iconClassName} />;
    case "syringe":
      return <SyringeIcon className={iconClassName} />;
    case "lungs":
      return <LungsIcon className={iconClassName} />;
    case "clipboard":
      return <ClipboardIcon className={iconClassName} />;
    default:
      return option.selected ? <CheckIcon className={iconClassName} /> : <CircleIcon className={iconClassName} />;
  }
}

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
      className={`flex w-full items-center gap-4 rounded-[22px] border px-4 py-4.5 text-left shadow-[0_8px_25px_rgba(16,33,62,0.05)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 ${selectedClassName}`}
    >
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] ${
          option.selected
            ? "bg-primary text-white shadow-[0_12px_24px_rgba(15,143,176,0.24)]"
            : "bg-surface-alt text-foreground shadow-[inset_0_0_0_1px_rgba(198,216,232,0.25)]"
        }`}
      >
        {option.selected ? <CheckIcon className="h-6 w-6" /> : getOptionIcon(option)}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-[1.07rem] font-semibold leading-6 text-foreground">{option.title}</p>
        <p className="text-sm leading-5 text-muted">{option.description}</p>
      </div>
      <div className="shrink-0 text-muted">
        {!option.selected ? <ArrowRightIcon className="h-5.5 w-5.5" /> : null}
      </div>
    </button>
  );
}
