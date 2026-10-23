import type { VehicleCategory } from "./booking";

export type RideRequestStatus = "pending" | "accepted" | "rejected";

export type TripStatus = "accepted" | "arrived" | "in_progress";

export type RideRequest = {
  destination: string;
  duration: string;
  fare: number;
  pickup: string;
  reference: string;
  status: RideRequestStatus;
  vehicleCategory: VehicleCategory;
};

export type ActiveTrip = {
  request: RideRequest;
  status: TripStatus;
};

export type CompletedTrip = {
  completedAt: string;
  request: RideRequest;
};
