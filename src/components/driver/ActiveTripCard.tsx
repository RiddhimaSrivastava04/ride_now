import { Button } from "@/components/ui/Button";
import type { ActiveTrip, TripStatus } from "@/types/driver";

type ActiveTripCardProps = {
  activeTrip: ActiveTrip;
  onAdvance: () => void;
};

const statusLabels: Record<TripStatus, string> = {
  accepted: "Accepted",
  arrived: "Arrived at pickup",
  in_progress: "Trip in progress",
};

const nextActions: Record<TripStatus, string> = {
  accepted: "Mark arrived at pickup",
  arrived: "Start trip",
  in_progress: "Complete trip",
};

export function ActiveTripCard({
  activeTrip,
  onAdvance,
}: ActiveTripCardProps) {
  const { request, status } = activeTrip;

  return (
    <section
      aria-labelledby="active-trip-title"
      className="rounded-2xl border-2 border-brand-600 bg-brand-500/10 p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
            Active trip
          </p>
          <h2 id="active-trip-title" className="mt-1 text-2xl font-bold text-slate-950">
            {request.reference}
          </h2>
        </div>
        <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-slate-950">
          {statusLabels[status]}
        </span>
      </div>
      <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
        <p>
          <span className="block text-slate-600">Pickup</span>
          <span className="mt-1 block font-semibold text-slate-950">
            {request.pickup}
          </span>
        </p>
        <p>
          <span className="block text-slate-600">Destination</span>
          <span className="mt-1 block font-semibold text-slate-950">
            {request.destination}
          </span>
        </p>
      </div>
      <Button className="mt-6" onClick={onAdvance}>
        {nextActions[status]}
      </Button>
    </section>
  );
}
