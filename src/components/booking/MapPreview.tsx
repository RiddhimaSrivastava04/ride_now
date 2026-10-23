export function MapPreview() {
  return (
    <aside
      aria-labelledby="map-preview-title"
      className="relative min-h-80 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-6 text-white shadow-lg shadow-slate-300/30 lg:min-h-full"
    >
      <div
        className="absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(135deg, transparent 48%, #334155 49%, #334155 51%, transparent 52%), linear-gradient(45deg, transparent 48%, #1e293b 49%, #1e293b 51%, transparent 52%)",
          backgroundSize: "88px 88px",
        }}
      />
      <div className="relative flex h-full min-h-68 flex-col justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
            Preview only
          </p>
          <h2 id="map-preview-title" className="mt-3 text-2xl font-bold">
            Your route will appear here
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
            Maps and live location tracking will be connected in a later phase.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/90 p-4 text-sm text-slate-300">
          <span className="size-3 rounded-full bg-brand-400" aria-hidden="true" />
          No live map or driver data is available in this demo.
        </div>
      </div>
    </aside>
  );
}
