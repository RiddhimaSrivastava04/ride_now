import { PageContainer } from "./PageContainer";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <PageContainer className="flex flex-col gap-3 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold tracking-tight text-slate-900">RideNow</p>
        <p>Building simpler journeys, one step at a time.</p>
      </PageContainer>
    </footer>
  );
}
