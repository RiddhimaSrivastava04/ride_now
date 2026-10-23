import Link from "next/link";
import { adminDemoDrivers, adminDemoRides } from "@/lib/admin/mock-data";
import { Card } from "@/components/ui/Card";
import { AdminShell } from "./AdminShell";
import { RideTable } from "./RideTable";

export function AdminOverview() {
  const completed = adminDemoRides.filter((ride) => ride.status === "completed").length;
  const active = adminDemoRides.filter((ride) => ["accepted", "arrived", "in_progress"].includes(ride.status)).length;
  const revenue = adminDemoRides.filter((ride) => ride.status === "completed").reduce((total, ride) => total + ride.fare, 0);
  const stats = [
    ["Total rides", adminDemoRides.length],
    ["Completed rides", completed],
    ["Active rides", active],
    ["Demo drivers", adminDemoDrivers.length],
  ];

  return (
    <AdminShell description="Review illustrative platform activity from the local demo dataset." title="Platform overview">
      <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Demo dashboard only. These records are local mock data and are not connected to passenger or driver sessions.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value]) => (
          <Card className="p-5" key={label}>
            <p className="text-sm text-slate-600">{label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-6 p-6">
        <p className="text-sm text-slate-600">Illustrative platform revenue</p>
        <p className="mt-2 text-3xl font-bold text-slate-950">₹{revenue}</p>
        <p className="mt-2 text-sm text-slate-500">Calculated from completed demo rides only.</p>
      </Card>
      <Card className="mt-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-950">Recent demo rides</h2>
          <Link className="text-sm font-semibold text-brand-600 hover:text-brand-700 focus-visible:outline-brand-600" href="/admin/rides">View all rides</Link>
        </div>
        <div className="mt-4"><RideTable rides={adminDemoRides.slice(0, 4)} /></div>
      </Card>
    </AdminShell>
  );
}
