import { Button } from "@/components/ui/Button";
import type { RideRequest } from "@/types/driver";

type RideRequestCardProps = {
  hasActiveTrip: boolean;
  isOnline: boolean;
  onAccept: () => void;
  onReject: () => void;
  request: RideRequest;
};

export function RideRequestCard({
  hasActiveTrip,
  isOnline,
  onAccept,
  onReject,
  request,
}: RideRequestCardProps) {
  const acceptDisabled = !isOnline || hasActiveTrip;
  const disabledReason = !isOnline
    ? "Go online to accept requests."
    : hasActiveTrip
      ? "Complete your active trip before accepting another request."
      : undefined;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Demo request
          </p>
          <h3 className="mt-1 font-bold text-slate-950">{request.reference}</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {request.vehicleCategory}
        </span>
      </div>

      <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-slate-600">Pickup</dt>
          <dd className="mt-1 font-semibold text-slate-950">{request.pickup}</dd>
        </div>
        <div>
          <dt className="text-slate-600">Destination</dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {request.destination}
          </dd>
        </div>
        <div>
          <dt className="text-slate-600">Illustrative fare</dt>
          <dd className="mt-1 font-semibold text-slate-950">₹{request.fare}</dd>
        </div>
        <div>
          <dt className="text-slate-600">Approx. trip duration</dt>
          <dd className="mt-1 font-semibold text-slate-950">{request.duration}</dd>
          <p className="mt-1 text-xs text-slate-500">Demo estimate</p>
        </div>
      </dl>

      {disabledReason ? (
        <p className="mt-4 text-sm text-slate-600">{disabledReason}</p>
      ) : null}
      <div className="mt-5 flex flex-wrap gap-3">
        <Button disabled={acceptDisabled} onClick={onAccept}>
          Accept request
        </Button>
        <Button onClick={onReject} variant="secondary">
          Reject
        </Button>
      </div>
    </article>
  );
}
