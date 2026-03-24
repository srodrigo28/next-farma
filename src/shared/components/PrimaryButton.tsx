import Link from "next/link";
import { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "ghost";
  className?: string;
}

const baseClassName =
  "flex min-h-14 w-full items-center justify-center rounded-2xl px-5 text-base font-extrabold transition-transform duration-200 hover:-translate-y-0.5";

export function PrimaryButton({
  children,
  href,
  variant = "solid",
  className = "",
}: PrimaryButtonProps) {
  const variantClassName =
    variant === "solid"
      ? "bg-foreground text-white shadow-[0_16px_30px_rgba(16,33,62,0.18)]"
      : "bg-white text-foreground ring-1 ring-border";

  if (href) {
    return (
      <Link href={href} className={`${baseClassName} ${variantClassName} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={`${baseClassName} ${variantClassName} ${className}`}>
      {children}
    </button>
  );
}
