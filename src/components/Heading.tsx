import type { ReactNode } from "react";

export function Heading({ children }: { children: ReactNode }) {
  return <h2 style={{ color: "var(--primary-color)" }}>{children}</h2>;
}
