"use client";

import { useMemo, useState } from "react";
import { adminDemoDrivers } from "@/lib/admin/mock-data";
import type { VehicleCategory } from "@/types/booking";
import { Card } from "@/components/ui/Card";
import { AdminShell } from "./AdminShell";
import { DriverList } from "./DriverList";

export function AdminDrivers() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<VehicleCategory | "all">("all");
  const drivers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return adminDemoDrivers.filter((driver) => {
      const matchesSearch = !query || [driver.name, driver.identifier, driver.registration].some((value) => value.toLowerCase().includes(query));
      return matchesSearch && (category === "all" || driver.vehicleCategory === category);
    });
  }, [category, search]);

  return (
    <AdminShell description="Review searchable demo driver profiles and verification states." title="Driver management">
      <Card className="p-6">
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_12rem]">
          <div>
            <label className="block text-sm font-semibold text-slate-900" htmlFor="driver-search">Search drivers</label>
            <input className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-950 placeholder:text-slate-500 focus:border-brand-600 focus:outline-brand-600" id="driver-search" onChange={(event) => setSearch(event.target.value)} placeholder="Name, identifier, or registration" value={search} />
          </div>
          <label className="text-sm font-semibold text-slate-900">
            Vehicle
            <select className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 font-normal capitalize focus:border-brand-600 focus:outline-brand-600" onChange={(event) => setCategory(event.target.value as VehicleCategory | "all")} value={category}>
              <option value="all">All vehicles</option><option value="bike">Bike</option><option value="auto">Auto</option><option value="cab">Cab</option>
            </select>
          </label>
        </div>
        <div className="mt-6"><DriverList drivers={drivers} /></div>
      </Card>
    </AdminShell>
  );
}
