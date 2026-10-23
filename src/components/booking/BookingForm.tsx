"use client";

import { useState, type FormEvent } from "react";
import { getFareEstimate } from "@/lib/booking/fare-estimate";
import type {
  BookingConfirmation as BookingConfirmationData,
  VehicleCategory,
} from "@/types/booking";
import { BookingConfirmation } from "./BookingConfirmation";
import { VehicleSelector } from "./VehicleSelector";
import { Button } from "@/components/ui/Button";

const inputClasses =
  "min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-950 placeholder:text-slate-500 focus:border-brand-600 focus:outline-brand-600";

function createDemoReference() {
  return `RN-DEMO-${Date.now().toString(36).toUpperCase()}-${Math.floor(
    Math.random() * 900 + 100,
  )}`;
}

export function BookingForm() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<VehicleCategory | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] =
    useState<BookingConfirmationData | null>(null);

  function handleSwap() {
    setPickup(destination);
    setDestination(pickup);
    setError("");
  }

  function handleClear() {
    setPickup("");
    setDestination("");
    setSelectedCategory(null);
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanPickup = pickup.trim();
    const cleanDestination = destination.trim();

    if (!cleanPickup || !cleanDestination) {
      setError("Enter both a pickup location and a destination.");
      return;
    }

    if (cleanPickup.toLowerCase() === cleanDestination.toLowerCase()) {
      setError("Pickup and destination must be different.");
      return;
    }

    if (!selectedCategory) {
      setError("Choose a vehicle before booking your ride.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    const vehicle = getFareEstimate(selectedCategory);

    window.setTimeout(() => {
      setConfirmation({
        destination: cleanDestination,
        fare: vehicle.fare,
        pickup: cleanPickup,
        reference: createDemoReference(),
        vehicle,
      });
      setIsSubmitting(false);
    }, 450);
  }

  if (confirmation) {
    return (
      <BookingConfirmation
        booking={confirmation}
        onNewBooking={() => {
          setConfirmation(null);
          handleClear();
        }}
      />
    );
  }

  return (
    <form
      aria-describedby="booking-help"
      className="space-y-7"
      id="booking"
      onSubmit={handleSubmit}
      noValidate
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-950">Plan your ride</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600" id="booking-help">
          Enter text locations for this demo. Address search and route
          calculation are not connected yet.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-900" htmlFor="pickup">
            Pickup location
          </label>
          <input
            className={`${inputClasses} mt-2`}
            id="pickup"
            onChange={(event) => setPickup(event.target.value)}
            placeholder="e.g. City Centre"
            value={pickup}
          />
        </div>
        <div>
          <label
            className="block text-sm font-semibold text-slate-900"
            htmlFor="destination"
          >
            Destination
          </label>
          <input
            className={`${inputClasses} mt-2`}
            id="destination"
            onChange={(event) => setDestination(event.target.value)}
            placeholder="e.g. Central Station"
            value={destination}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleSwap} type="button" variant="secondary">
            Swap locations
          </Button>
          <Button onClick={handleClear} type="button" variant="ghost">
            Clear fields
          </Button>
        </div>
      </div>

      <VehicleSelector
        onSelect={(category) => {
          setSelectedCategory(category);
          setError("");
        }}
        selectedCategory={selectedCategory}
      />

      {error ? (
        <p
          aria-live="polite"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <Button className="w-full sm:w-auto" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Preparing demo booking..." : "Book ride"}
      </Button>
    </form>
  );
}
