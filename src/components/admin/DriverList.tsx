import type { DemoDriver } from "@/types/admin";

export function DriverList({ drivers }: { drivers: DemoDriver[] }) {
  if (drivers.length === 0) {
    return (
      <p className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-600">
        No demo drivers match the current search.
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {drivers.map((driver) => (
        <article className="rounded-2xl border border-slate-200 p-5" key={driver.identifier}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-bold text-slate-950">{driver.name}</h2>
              <p className="mt-1 text-sm text-slate-600">{driver.identifier}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${driver.isOnline ? "bg-brand-500/25 text-slate-900" : "bg-slate-100 text-slate-700"}`}>
              {driver.isOnline ? "Online" : "Offline"}
            </span>
          </div>
          <dl className="mt-5 grid gap-3 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-slate-600">Vehicle</dt><dd className="font-semibold capitalize text-slate-950">{driver.vehicleCategory}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-600">Registration</dt><dd className="font-semibold text-slate-950">{driver.registration}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-600">Verification</dt><dd className={`font-semibold ${driver.verificationStatus === "verified" ? "text-emerald-700" : "text-amber-700"}`}>{driver.verificationStatus === "verified" ? "Verified" : "Pending"}</dd></div>
          </dl>
          <p className="mt-4 text-xs text-slate-500">Registration is demo data.</p>
        </article>
      ))}
    </div>
  );
}
