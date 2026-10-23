"use client";

import { useMemo, useState } from "react";
import { adminDemoRides } from "@/lib/admin/mock-data";
import type { AdminRideStatus } from "@/types/admin";
import type { VehicleCategory } from "@/types/booking";
import { Card } from "@/components/ui/Card";
import { AdminShell } from "./AdminShell";
import { RideFilters } from "./RideFilters";
import { RideTable } from "./RideTable";

export function AdminRides() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<AdminRideStatus | "all">("all");
  const [category, setCategory] = useState<VehicleCategory | "all">("all");
  const filteredRides = useMemo(() => {
    const query = search.trim().toLowerCase();
    return adminDemoRides.filter((ride) => {
      const matchesSearch = !query || [ride.reference, ride.pickup, ride.destination].some((value) => value.toLowerCase().includes(query));
      return matchesSearch && (status === "all" || ride.status === status) && (category === "all" || ride.vehicleCategory === category);
    });
  }, [category, search, status]);

  return (
    <AdminShell description="Search and filter the local ride records used by this demo." title="Ride management">
      <Card className="p-6">
        <RideFilters category={category} onCategoryChange={setCategory} onSearchChange={setSearch} onStatusChange={setStatus} search={search} status={status} />
        <div className="mt-6"><RideTable rides={filteredRides} /></div>
      </Card>
    </AdminShell>
  );
}
