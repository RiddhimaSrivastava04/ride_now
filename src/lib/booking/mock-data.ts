import type { VehicleOption } from "@/types/booking";

export const vehicleOptions: VehicleOption[] = [
  {
    category: "bike",
    name: "Bike",
    description: "A quick solo ride",
    fare: 89,
    duration: "15–20 min",
  },
  {
    category: "auto",
    name: "Auto",
    description: "An easy everyday ride",
    fare: 149,
    duration: "20–25 min",
  },
  {
    category: "cab",
    name: "Cab",
    description: "A comfortable private ride",
    fare: 249,
    duration: "25–30 min",
  },
];
