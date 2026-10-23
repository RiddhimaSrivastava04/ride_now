import { Button } from "@/components/ui/Button";
import type { BookingConfirmation as BookingConfirmationData } from "@/types/booking";

type BookingConfirmationProps = {
  booking: BookingConfirmationData;
  onNewBooking: () => void;
};

export function BookingConfirmation({
  booking,
  onNewBooking,
}: BookingConfirmationProps) {
  return (
    <section
      aria-labelledby="confirmation-title"
      className="rounded-2xl border border-brand-600/40 bg-brand-500/10 p-6"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">
        Demo booking created
      </p>
      <h2 id="confirmation-title" className="mt-3 text-2xl font-bold text-slate-950">
        Your ride request is ready
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        This is a local demo confirmation. No driver has been dispatched.
      </p>

      <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-slate-600">Demo reference</dt>
          <dd className="mt-1 font-semibold text-slate-950">{booking.reference}</dd>
        </div>
        <div>
          <dt className="text-slate-600">Vehicle</dt>
          <dd className="mt-1 font-semibold text-slate-950">{booking.vehicle.name}</dd>
        </div>
        <div>
          <dt className="text-slate-600">Pickup</dt>
          <dd className="mt-1 font-semibold text-slate-950">{booking.pickup}</dd>
        </div>
        <div>
          <dt className="text-slate-600">Destination</dt>
          <dd className="mt-1 font-semibold text-slate-950">{booking.destination}</dd>
        </div>
        <div>
          <dt className="text-slate-600">Illustrative fare</dt>
          <dd className="mt-1 font-semibold text-slate-950">₹{booking.fare}</dd>
        </div>
      </dl>

      <Button className="mt-7" onClick={onNewBooking} variant="secondary">
        Start a new booking
      </Button>
    </section>
  );
}
