import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
      {...props}
    />
  );
}
