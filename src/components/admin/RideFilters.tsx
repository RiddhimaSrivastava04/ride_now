"use client";

import type { AdminRideStatus } from "@/types/admin";
import type { VehicleCategory } from "@/types/booking";

type RideFiltersProps = {
  onCategoryChange: (value: VehicleCategory | "all") => void;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: AdminRideStatus | "all") => void;
  search: string;
  status: AdminRideStatus | "all";
  category: VehicleCategory | "all";
};

export function RideFilters({
  category,
  onCategoryChange,
  onSearchChange,
  onStatusChange,
  search,
  status,
}: RideFiltersProps) {
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_12rem_12rem]">
      <div>
        <label className="block text-sm font-semibold text-slate-900" htmlFor="ride-search">
          Search rides
        </label>
        <input
          className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-950 placeholder:text-slate-500 focus:border-brand-600 focus:outline-brand-600"
          id="ride-search"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Reference or location"
          value={search}
        />
      </div>
      <label className="text-sm font-semibold text-slate-900">
        Status
        <select className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 font-normal focus:border-brand-600 focus:outline-brand-600" onChange={(event) => onStatusChange(event.target.value as AdminRideStatus | "all")} value={status}>
          <option value="all">All statuses</option>
          <option value="requested">Requested</option>
          <option value="accepted">Accepted</option>
          <option value="arrived">Arrived</option>
          <option value="in_progress">In progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </label>
      <label className="text-sm font-semibold text-slate-900">
        Vehicle
        <select className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 font-normal capitalize focus:border-brand-600 focus:outline-brand-600" onChange={(event) => onCategoryChange(event.target.value as VehicleCategory | "all")} value={category}>
          <option value="all">All vehicles</option>
          <option value="bike">Bike</option>
          <option value="auto">Auto</option>
          <option value="cab">Cab</option>
        </select>
      </label>
    </div>
  );
}
