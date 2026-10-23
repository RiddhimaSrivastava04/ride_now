import type { HTMLAttributes } from "react";

type PageContainerProps = HTMLAttributes<HTMLDivElement>;

export function PageContainer({
  className = "",
  ...props
}: PageContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10 ${className}`}
      {...props}
    />
  );
}
