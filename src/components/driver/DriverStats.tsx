import { Card } from "@/components/ui/Card";

type DriverStatsProps = {
  completedRides: number;
  earnings: number;
};

export function DriverStats({ completedRides, earnings }: DriverStatsProps) {
  const stats = [
    { label: "Completed rides", value: completedRides.toString() },
    { label: "Illustrative earnings", value: `₹${earnings}` },
    { label: "Driver rating", value: "4.8 / 5" },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-950">Today&apos;s stats</h2>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          Demo values
        </span>
      </div>
      <dl className="mt-5 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div className="rounded-xl bg-slate-50 p-4" key={stat.label}>
            <dt className="text-sm text-slate-600">{stat.label}</dt>
            <dd className="mt-2 text-2xl font-bold text-slate-950">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
