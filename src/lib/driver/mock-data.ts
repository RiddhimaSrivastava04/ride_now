import type { RideRequest } from "@/types/driver";

export const initialRideRequests: RideRequest[] = [
  {
    reference: "RN-REQ-1042",
    pickup: "City Centre",
    destination: "Central Station",
    vehicleCategory: "cab",
    fare: 249,
    duration: "25–30 min",
    status: "pending",
  },
  {
    reference: "RN-REQ-1043",
    pickup: "Green Park",
    destination: "Tech District",
    vehicleCategory: "auto",
    fare: 149,
    duration: "20–25 min",
    status: "pending",
  },
  {
    reference: "RN-REQ-1044",
    pickup: "Riverside Market",
    destination: "North Avenue",
    vehicleCategory: "bike",
    fare: 89,
    duration: "15–20 min",
    status: "pending",
  },
];

export const demoDriverProfile = {
  name: "Demo Driver",
  registration: "DEMO-RN-2048",
  vehicleCategory: "Cab" as const,
};
