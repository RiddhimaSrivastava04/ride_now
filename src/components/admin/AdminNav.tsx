import Link from "next/link";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/rides", label: "Rides" },
  { href: "/admin/drivers", label: "Drivers" },
];

export function AdminNav() {
  return (
    <nav aria-label="Admin navigation" className="flex gap-2 overflow-x-auto pb-1">
      {links.map((link) => (
        <Link
          className="whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 hover:text-slate-950 focus-visible:outline-brand-600"
          href={link.href}
          key={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
