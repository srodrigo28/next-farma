import { ReactNode } from "react";

export function AppScreen({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className="app-shell">
      <div className={`phone-frame px-5 py-6 ${className}`}>{children}</div>
    </main>
  );
}
