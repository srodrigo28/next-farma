import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "secondary" | "ghost";
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}

const baseClassName =
  "flex min-h-14 w-full items-center justify-center rounded-2xl px-5 text-base font-bold tracking-[0.01em] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15";

export function PrimaryButton({
  children,
  href,
  variant = "solid",
  className = "",
  type = "button",
  disabled = false,
  onClick,
}: PrimaryButtonProps) {
  const variantClassName =
    variant === "solid"
      ? "bg-primary !text-white shadow-[0_16px_30px_rgba(15,143,176,0.24)] hover:bg-primary-strong"
      : variant === "secondary"
        ? "bg-secondary-soft text-primary-strong ring-1 ring-[#cdeee7] hover:bg-[#dbf7f1]"
        : "bg-white text-foreground ring-1 ring-border hover:bg-surface-alt";

  if (href) {
    return (
      <Link href={href} className={`${baseClassName} ${variantClassName} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClassName} ${variantClassName} ${disabled ? "cursor-not-allowed opacity-60 hover:translate-y-0" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
