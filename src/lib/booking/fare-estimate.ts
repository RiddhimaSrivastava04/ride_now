import { vehicleOptions } from "./mock-data";
import type { VehicleCategory, VehicleOption } from "@/types/booking";

export function getFareEstimate(category: VehicleCategory): VehicleOption {
  const option = vehicleOptions.find((vehicle) => vehicle.category === category);

  if (!option) {
    throw new Error(`No demo fare is configured for vehicle category: ${category}`);
  }

  return option;
}
