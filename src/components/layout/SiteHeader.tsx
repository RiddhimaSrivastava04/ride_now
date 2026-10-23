import Link from "next/link";
import { PageContainer } from "./PageContainer";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-950 text-white">
      <PageContainer className="flex min-h-20 flex-wrap items-center justify-between gap-3 py-3 sm:flex-nowrap sm:gap-6 sm:py-0">
        <Link
          className="flex items-center gap-3 rounded-lg focus-visible:outline-brand-400"
          href="/"
          aria-label="RideNow home"
        >
          <span
            className="flex size-10 items-center justify-center rounded-xl bg-brand-500 text-lg font-bold text-slate-950 shadow-[0_0_0_4px_rgba(91,209,138,0.12)]"
            aria-hidden="true"
          >
            R
          </span>
          <span className="text-lg font-bold tracking-tight sm:text-xl">
            RideNow
          </span>
        </Link>
        <nav
          aria-label="Primary navigation"
          className="flex flex-wrap justify-end gap-1"
        >
          <Link
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-brand-400"
            href="/#booking"
          >
            Book a ride
          </Link>
          <Link
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-brand-400"
            href="/driver"
          >
            Driver dashboard
          </Link>
          <Link
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-brand-400"
            href="/admin"
          >
            Admin
          </Link>
        </nav>
      </PageContainer>
    </header>
  );
}
