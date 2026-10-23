export type VehicleCategory = "bike" | "auto" | "cab";

export type VehicleOption = {
  category: VehicleCategory;
  description: string;
  duration: string;
  fare: number;
  name: string;
};

export type BookingConfirmation = {
  destination: string;
  fare: number;
  pickup: string;
  reference: string;
  vehicle: VehicleOption;
};
