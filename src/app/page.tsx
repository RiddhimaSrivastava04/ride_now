import { BookingForm } from "@/components/booking/BookingForm";
import { MapPreview } from "@/components/booking/MapPreview";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageContainer className="py-10 sm:py-14">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              Passenger booking
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Go where you need to go.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Choose a ride and try the RideNow booking experience with local
              demo data.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
            <Card className="p-6 sm:p-8">
              <BookingForm />
            </Card>
            <MapPreview />
          </div>
        </PageContainer>
      </main>
      <SiteFooter />
    </div>
  );
}
