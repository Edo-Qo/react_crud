import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Main({ children, className }: Props) {
  return (
    <main className={cn("mx-auto max-w-7xl p-4 lg:p-8", className)}>
      {children}
    </main>
  );
}
