import { ReactNode } from "react";

export function AppScreen({
  children,
  className = "",
  flush = false,
}: {
  children: ReactNode;
  className?: string;
  flush?: boolean;
}) {
  return (
    <main className="app-shell">
      <div className={`phone-frame ${flush ? "" : "px-5 py-6"} ${className}`}>{children}</div>
    </main>
  );
}
