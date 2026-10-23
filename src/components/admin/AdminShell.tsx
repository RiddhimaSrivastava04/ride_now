import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { AdminNav } from "./AdminNav";

type AdminShellProps = {
  children: ReactNode;
  description: string;
  title: string;
};

export function AdminShell({
  children,
  description,
  title,
}: AdminShellProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageContainer className="py-8 sm:py-12">
          <div className="flex flex-col gap-6 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
                Admin workspace
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
                {description}
              </p>
            </div>
            <AdminNav />
          </div>
          <div className="mt-8">{children}</div>
        </PageContainer>
      </main>
      <SiteFooter />
    </div>
  );
}
