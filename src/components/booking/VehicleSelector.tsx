import { vehicleOptions } from "@/lib/booking/mock-data";
import type { VehicleCategory } from "@/types/booking";
import { VehicleIcon } from "./VehicleIcon";

type VehicleSelectorProps = {
  selectedCategory: VehicleCategory | null;
  onSelect: (category: VehicleCategory) => void;
};

export function VehicleSelector({
  selectedCategory,
  onSelect,
}: VehicleSelectorProps) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-slate-900">
        Choose your ride
      </legend>
      <p className="mt-1 text-sm text-slate-600">
        Select one option for an illustrative fare estimate.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {vehicleOptions.map((vehicle) => {
          const isSelected = selectedCategory === vehicle.category;

          return (
            <button
              aria-pressed={isSelected}
              className={`rounded-2xl border p-4 text-left transition-colors focus-visible:outline-brand-600 ${
                isSelected
                  ? "border-brand-600 bg-brand-500/15 ring-2 ring-brand-600"
                  : "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50"
              }`}
              key={vehicle.category}
              onClick={() => onSelect(vehicle.category)}
              type="button"
            >
              <span
                className={`flex size-11 items-center justify-center rounded-xl ${
                  isSelected
                    ? "bg-brand-500 text-slate-950"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                <VehicleIcon category={vehicle.category} />
              </span>
              <span className="mt-4 block font-semibold text-slate-950">
                {vehicle.name}
              </span>
              <span className="mt-1 block text-xs text-slate-600">
                {vehicle.description}
              </span>
              <span className="mt-4 block text-sm font-semibold text-slate-900">
                Estimated fare: ₹{vehicle.fare}
              </span>
              <span className="mt-1 block text-xs text-slate-600">
                Approx. duration: {vehicle.duration}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Demo values only — fares are not based on an actual route.
      </p>
    </fieldset>
  );
}
