import type { VehicleCategory } from "./booking";

export type AdminRideStatus =
  | "requested"
  | "accepted"
  | "arrived"
  | "in_progress"
  | "completed"
  | "cancelled";

export type AdminRide = {
  destination: string;
  fare: number;
  pickup: string;
  reference: string;
  status: AdminRideStatus;
  vehicleCategory: VehicleCategory;
};

export type DemoDriver = {
  identifier: string;
  isOnline: boolean;
  name: string;
  registration: string;
  verificationStatus: "verified" | "pending";
  vehicleCategory: VehicleCategory;
};
