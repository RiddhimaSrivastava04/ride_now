"use client";

import { useState } from "react";
import { ActiveTripCard } from "./ActiveTripCard";
import { DriverProfile } from "./DriverProfile";
import { DriverStats } from "./DriverStats";
import { RideRequestCard } from "./RideRequestCard";
import { initialRideRequests } from "@/lib/driver/mock-data";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import type { ActiveTrip, CompletedTrip, RideRequest, TripStatus } from "@/types/driver";

export function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [requests, setRequests] = useState(initialRideRequests);
  const [activeTrip, setActiveTrip] = useState<ActiveTrip | null>(null);
  const [completedTrips, setCompletedTrips] = useState<CompletedTrip[]>([]);
  const [earnings, setEarnings] = useState(0);
  const [feedback, setFeedback] = useState("");

  const pendingRequests = requests.filter(
    (request) => request.status === "pending",
  );

  function updateRequestStatus(reference: string, status: RideRequest["status"]) {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.reference === reference ? { ...request, status } : request,
      ),
    );
  }

  function handleAccept(request: RideRequest) {
    if (!isOnline) {
      setFeedback("Go online before accepting a ride request.");
      return;
    }
    if (activeTrip) {
      setFeedback("Complete the active trip before accepting another request.");
      return;
    }

    updateRequestStatus(request.reference, "accepted");
    setActiveTrip({ request, status: "accepted" });
    setFeedback(`Request ${request.reference} accepted.`);
  }

  function handleReject(request: RideRequest) {
    updateRequestStatus(request.reference, "rejected");
    setFeedback(`Request ${request.reference} was rejected.`);
  }

  function handleAdvanceTrip() {
    if (!activeTrip) {
      return;
    }

    const nextStatus: Record<TripStatus, TripStatus | "completed"> = {
      accepted: "arrived",
      arrived: "in_progress",
      in_progress: "completed",
    };
    const next = nextStatus[activeTrip.status];

    if (next === "completed") {
      setCompletedTrips((currentTrips) => [
        {
          completedAt: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          request: activeTrip.request,
        },
        ...currentTrips,
      ]);
      setEarnings((currentEarnings) => currentEarnings + activeTrip.request.fare);
      setActiveTrip(null);
      setFeedback(
        `Trip ${activeTrip.request.reference} completed. Demo earnings updated.`,
      );
      return;
    }

    setActiveTrip({ ...activeTrip, status: next });
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageContainer className="py-10 sm:py-14">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              Driver workspace
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Keep your day moving.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Review simulated requests and manage a demo trip from acceptance
              through completion.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="space-y-6">
              <DriverProfile
                isOnline={isOnline}
                onToggle={() => {
                  setIsOnline((online) => !online);
                  setFeedback("");
                }}
              />
              <DriverStats
                completedRides={completedTrips.length}
                earnings={earnings}
              />
            </div>

            <div className="space-y-6">
              {feedback ? (
                <p
                  aria-live="polite"
                  className="rounded-xl border border-brand-600/40 bg-brand-500/10 px-4 py-3 text-sm font-medium text-slate-800"
                  role="status"
                >
                  {feedback}
                </p>
              ) : null}

              {activeTrip ? (
                <ActiveTripCard
                  activeTrip={activeTrip}
                  onAdvance={handleAdvanceTrip}
                />
              ) : null}

              <Card className="p-6">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-950">
                      Incoming requests
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Simulated requests for this browser session.
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-slate-500">
                    {pendingRequests.length} pending
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  {pendingRequests.length > 0 ? (
                    pendingRequests.map((request) => (
                      <RideRequestCard
                        hasActiveTrip={Boolean(activeTrip)}
                        isOnline={isOnline}
                        key={request.reference}
                        onAccept={() => handleAccept(request)}
                        onReject={() => handleReject(request)}
                        request={request}
                      />
                    ))
                  ) : (
                    <p className="rounded-xl bg-slate-50 px-4 py-6 text-sm text-slate-600">
                      No pending requests remain. More demo requests can be
                      added when backend support is introduced.
                    </p>
                  )}
                </div>
              </Card>

              {completedTrips.length > 0 ? (
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-slate-950">
                    Completed this session
                  </h2>
                  <ul className="mt-4 divide-y divide-slate-200">
                    {completedTrips.map((trip) => (
                      <li
                        className="flex flex-wrap justify-between gap-3 py-3 text-sm"
                        key={trip.request.reference}
                      >
                        <span>
                          <span className="font-semibold text-slate-950">
                            {trip.request.reference}
                          </span>
                          <span className="mt-1 block text-slate-600">
                            {trip.request.pickup} to {trip.request.destination}
                          </span>
                        </span>
                        <span className="text-right">
                          <span className="block font-semibold text-slate-950">
                            ₹{trip.request.fare}
                          </span>
                          <span className="mt-1 block text-slate-500">
                            {trip.completedAt}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : null}
            </div>
          </div>
        </PageContainer>
      </main>
      <SiteFooter />
    </div>
  );
}
