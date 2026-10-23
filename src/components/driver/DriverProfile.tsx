import { demoDriverProfile } from "@/lib/driver/mock-data";
import { Card } from "@/components/ui/Card";

type DriverProfileProps = {
  isOnline: boolean;
  onToggle: () => void;
};

export function DriverProfile({ isOnline, onToggle }: DriverProfileProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">
            Driver profile
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            {demoDriverProfile.name}
          </h2>
        </div>
        <button
          aria-pressed={isOnline}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-brand-600 ${
            isOnline
              ? "bg-brand-500 text-slate-950 hover:bg-brand-400"
              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
          }`}
          onClick={onToggle}
          type="button"
        >
          {isOnline ? "Online" : "Offline"}
        </button>
      </div>

      <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-slate-600">Vehicle category</dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {demoDriverProfile.vehicleCategory}
          </dd>
        </div>
        <div>
          <dt className="text-slate-600">Registration</dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {demoDriverProfile.registration}
          </dd>
          <p className="mt-1 text-xs text-slate-500">Demo data</p>
        </div>
        <div>
          <dt className="text-slate-600">Availability</dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {isOnline ? "Ready for requests" : "Not accepting requests"}
          </dd>
        </div>
      </dl>

      <p
        aria-live="polite"
        className={`mt-5 rounded-xl px-4 py-3 text-sm ${
          isOnline
            ? "bg-brand-500/15 text-slate-800"
            : "bg-slate-100 text-slate-700"
        }`}
      >
        {isOnline
          ? "You are online. You can review and accept simulated ride requests."
          : "You are offline. New ride requests cannot be accepted until you go online."}
      </p>
    </Card>
  );
}
