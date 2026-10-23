import type { VehicleCategory } from "@/types/booking";

type VehicleIconProps = {
  category: VehicleCategory;
};

export function VehicleIcon({ category }: VehicleIconProps) {
  const commonProps = {
    className: "size-7",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  if (category === "bike") {
    return (
      <svg {...commonProps}>
        <circle cx="6" cy="17" r="3" />
        <circle cx="18" cy="17" r="3" />
        <path d="M6 17h4l2-7h3l3 7M10 10l-2-3h3l2 3m2 0h2" />
      </svg>
    );
  }

  if (category === "auto") {
    return (
      <svg {...commonProps}>
        <path d="M5 17h14l-1-7H6l-1 7Z" />
        <path d="m7 10 1.5-4h7l1.5 4M8 17v2m8-2v2M4 13h2m12 0h2" />
        <circle cx="8" cy="15" r=".7" fill="currentColor" />
        <circle cx="16" cy="15" r=".7" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M4 16v-4l2-5h12l2 5v4M6 16h12M7 7l1-2h8l1 2" />
      <circle cx="7" cy="16" r="1.5" />
      <circle cx="17" cy="16" r="1.5" />
    </svg>
  );
}
