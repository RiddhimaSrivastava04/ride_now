import type { AdminRide } from "@/types/admin";
import { StatusBadge } from "./StatusBadge";

export function RideTable({ rides }: { rides: AdminRide[] }) {
  if (rides.length === 0) {
    return (
      <p className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-600">
        No demo rides match the current search and filters.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-slate-200 text-xs uppercase tracking-[0.12em] text-slate-500">
          <tr>
            <th className="px-4 py-3 font-semibold">Reference</th>
            <th className="px-4 py-3 font-semibold">Route</th>
            <th className="px-4 py-3 font-semibold">Vehicle</th>
            <th className="px-4 py-3 font-semibold">Fare</th>
            <th className="px-4 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rides.map((ride) => (
            <tr key={ride.reference}>
              <td className="px-4 py-4 font-semibold text-slate-950">{ride.reference}</td>
              <td className="px-4 py-4">
                <span className="block font-medium text-slate-950">{ride.pickup}</span>
                <span className="mt-1 block text-slate-600">to {ride.destination}</span>
              </td>
              <td className="px-4 py-4 capitalize text-slate-700">{ride.vehicleCategory}</td>
              <td className="px-4 py-4 font-semibold text-slate-950">₹{ride.fare}</td>
              <td className="px-4 py-4"><StatusBadge status={ride.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
