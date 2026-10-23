import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-500 text-slate-950 shadow-sm hover:bg-brand-400 disabled:bg-slate-300",
  secondary:
    "border border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50 disabled:border-slate-200 disabled:text-slate-400",
  ghost:
    "text-slate-700 hover:bg-slate-100 hover:text-slate-950 disabled:text-slate-400",
};

export function Button({
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-brand-600 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      type={type}
      {...props}
    />
  );
}
