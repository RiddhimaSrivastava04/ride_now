import type { DemoDriver, AdminRide } from "@/types/admin";

// This data is intentionally independent from page-local passenger and driver state.
export const adminDemoRides: AdminRide[] = [
  {
    reference: "RN-ADM-2001",
    pickup: "City Centre",
    destination: "Central Station",
    vehicleCategory: "cab",
    fare: 249,
    status: "completed",
  },
  {
    reference: "RN-ADM-2002",
    pickup: "Green Park",
    destination: "Tech District",
    vehicleCategory: "auto",
    fare: 149,
    status: "in_progress",
  },
  {
    reference: "RN-ADM-2003",
    pickup: "Riverside Market",
    destination: "North Avenue",
    vehicleCategory: "bike",
    fare: 89,
    status: "accepted",
  },
  {
    reference: "RN-ADM-2004",
    pickup: "Old Town",
    destination: "Airport Road",
    vehicleCategory: "cab",
    fare: 349,
    status: "requested",
  },
  {
    reference: "RN-ADM-2005",
    pickup: "Lake View",
    destination: "University Gate",
    vehicleCategory: "auto",
    fare: 179,
    status: "cancelled",
  },
];

export const adminDemoDrivers: DemoDriver[] = [
  {
    identifier: "DRV-DEMO-001",
    name: "Demo Driver A",
    vehicleCategory: "cab",
    registration: "DEMO-CAB-1001",
    isOnline: true,
    verificationStatus: "verified",
  },
  {
    identifier: "DRV-DEMO-002",
    name: "Demo Driver B",
    vehicleCategory: "auto",
    registration: "DEMO-AUTO-1002",
    isOnline: false,
    verificationStatus: "verified",
  },
  {
    identifier: "DRV-DEMO-003",
    name: "Demo Driver C",
    vehicleCategory: "bike",
    registration: "DEMO-BIKE-1003",
    isOnline: true,
    verificationStatus: "pending",
  },
];
