import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </BaseIcon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </BaseIcon>
  );
}

export function BrandPillIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <g transform="rotate(45 50 50)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="26" y="10" width="48" height="80" rx="24" />
        <rect x="36" y="20" width="28" height="60" rx="14" />
        <line x1="36" y1="50" x2="64" y2="50" />
      </g>
    </svg>
  );
}

export function HospitalIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 20V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v13" />
      <path d="M10 10h4" />
      <path d="M12 8v4" />
      <path d="M9 20v-4h6v4" />
      <path d="M4 20h16" />
    </BaseIcon>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 10.5L12 4l8 6.5" />
      <path d="M7 9.5V20h10V9.5" />
    </BaseIcon>
  );
}

export function GoogleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#EA4335"
        d="M12.24 10.28v3.88h5.4c-.22 1.25-.93 2.32-1.99 3.04l3.22 2.5c1.88-1.73 2.96-4.28 2.96-7.3 0-.72-.07-1.42-.19-2.1h-9.4z"
      />
      <path
        fill="#4285F4"
        d="M12 22c2.7 0 4.96-.9 6.61-2.45l-3.22-2.5c-.9.6-2.04.95-3.39.95-2.61 0-4.82-1.76-5.61-4.12H3.06v2.59A9.99 9.99 0 0 0 12 22z"
      />
      <path
        fill="#FBBC05"
        d="M6.39 13.88A6 6 0 0 1 6.08 12c0-.65.11-1.28.31-1.88V7.53H3.06A10 10 0 0 0 2 12c0 1.61.39 3.13 1.06 4.47l3.33-2.59z"
      />
      <path
        fill="#34A853"
        d="M12 6c1.47 0 2.78.51 3.81 1.51l2.85-2.85C16.95 3.09 14.7 2 12 2a9.99 9.99 0 0 0-8.94 5.53l3.33 2.59C7.18 7.76 9.39 6 12 6z"
      />
    </svg>
  );
}

export function OverviewIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="5" y="5" width="5" height="5" rx="1" />
      <rect x="14" y="5" width="5" height="5" rx="1" />
      <rect x="5" y="14" width="5" height="5" rx="1" />
      <rect x="14" y="14" width="5" height="5" rx="1" />
    </BaseIcon>
  );
}

export function PatientsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="9" cy="9" r="3" />
      <circle cx="17" cy="11" r="2.5" />
      <path d="M4.5 19a4.5 4.5 0 0 1 9 0" />
      <path d="M14 19a3.5 3.5 0 0 1 7 0" />
    </BaseIcon>
  );
}

export function MedicationsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M8 7a3 3 0 0 1 4.24 0l4.76 4.76a3 3 0 1 1-4.24 4.24L8 11.24A3 3 0 0 1 8 7z" />
      <path d="M9.5 14.5l5-5" />
    </BaseIcon>
  );
}

export function ClipboardIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="6" y="5" width="12" height="15" rx="2" />
      <path d="M9 5.5h6" />
      <path d="M9 10h6" />
      <path d="M9 14h6" />
    </BaseIcon>
  );
}

export function HeartbeatIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 12h4l2-4 4 8 2-4h6" />
    </BaseIcon>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 16h12" />
      <path d="M8 16V10a4 4 0 1 1 8 0v6" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </BaseIcon>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 5h9a3 3 0 0 1 3 3v11H9a3 3 0 0 0-3 3V5z" />
      <path d="M6 5v14a3 3 0 0 1 3-3h9" />
    </BaseIcon>
  );
}

export function ScaleIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 4v16" />
      <path d="M7 7h10" />
      <path d="M5 10l-2 4h4l-2-4z" />
      <path d="M19 10l-2 4h4l-2-4z" />
      <path d="M8 20h8" />
    </BaseIcon>
  );
}

export function HandoffIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 8h10" />
      <path d="M14 5l3 3-3 3" />
      <path d="M17 16H7" />
      <path d="M10 13l-3 3 3 3" />
    </BaseIcon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </BaseIcon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5.5 12.5l4 4 9-9" />
    </BaseIcon>
  );
}

export function CircleIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="7" />
    </BaseIcon>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </BaseIcon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.2-4.2" />
    </BaseIcon>
  );
}

export function AlertTriangleIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 5l8 14H4l8-14z" />
      <path d="M12 10v4" />
      <path d="M12 17h.01" />
    </BaseIcon>
  );
}

export function ThermometerIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M10 6a2 2 0 1 1 4 0v7.5a4 4 0 1 1-4 0V6z" />
      <path d="M12 10v7" />
    </BaseIcon>
  );
}

export function LungsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 5v14" />
      <path d="M12 11c-1.5-2-3-3-4.5-3-2 0-3.5 1.8-3.5 4.2C4 15.8 6 19 9.5 19c1.2 0 2-.4 2.5-1" />
      <path d="M12 11c1.5-2 3-3 4.5-3 2 0 3.5 1.8 3.5 4.2 0 3.6-2 6.8-5.5 6.8-1.2 0-2-.4-2.5-1" />
    </BaseIcon>
  );
}

export function OxygenIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 4c3.2 3.6 5 6 5 8.5A5 5 0 1 1 7 12.5C7 10 8.8 7.6 12 4z" />
      <path d="M10 13a2 2 0 0 0 4 0" />
    </BaseIcon>
  );
}

export function PainIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 20s-6-3.6-6-9a3.5 3.5 0 0 1 6-2.3A3.5 3.5 0 0 1 18 11c0 5.4-6 9-6 9z" />
      <path d="M12 9.5l-1.2 2.2h1.8l-1 2.8" />
    </BaseIcon>
  );
}

export function SyringeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M14 6l4 4" />
      <path d="M5 19l8-8" />
      <path d="M8 16l-3 3" />
      <path d="M11 5l8 8" />
      <path d="M13 3l2 2" />
    </BaseIcon>
  );
}

export function CalendarClockIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M4 9h16" />
      <path d="M12 13v2l1.5 1" />
      <circle cx="12" cy="15" r="3.5" />
    </BaseIcon>
  );
}
