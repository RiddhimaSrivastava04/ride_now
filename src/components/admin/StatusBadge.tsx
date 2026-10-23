import type { AdminRideStatus } from "@/types/admin";

const labels: Record<AdminRideStatus, string> = {
  requested: "Requested",
  accepted: "Accepted",
  arrived: "Arrived",
  in_progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const styles: Record<AdminRideStatus, string> = {
  requested: "bg-amber-100 text-amber-900",
  accepted: "bg-blue-100 text-blue-900",
  arrived: "bg-violet-100 text-violet-900",
  in_progress: "bg-brand-500/25 text-slate-900",
  completed: "bg-emerald-100 text-emerald-900",
  cancelled: "bg-red-100 text-red-900",
};

export function StatusBadge({ status }: { status: AdminRideStatus }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
