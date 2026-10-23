import type { ReactNode } from "react";

type FormFieldProps = {
  children: ReactNode;
  error?: string;
  hint?: string;
  id: string;
  label: string;
};

export function FormField({
  children,
  error,
  hint,
  id,
  label,
}: FormFieldProps) {
  const descriptionId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-900" htmlFor={id}>
        {label}
      </label>
      {children}
      {hint && !error ? (
        <p className="text-sm text-slate-500" id={descriptionId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm font-medium text-red-700" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
