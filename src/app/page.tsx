export default function Home() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center px-6 py-16 sm:px-10">
      <section
        className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-12"
        aria-labelledby="page-title"
      >
        <div className="mb-10 flex items-center gap-3">
          <span
            className="flex size-11 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-bold text-white"
            aria-hidden="true"
          >
            R
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">
            RideNow
          </span>
        </div>

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Project foundation
        </p>
        <h1
          id="page-title"
          className="max-w-2xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl"
        >
          Your next ride starts here.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
          RideNow is a ride-booking platform under development, built to make
          getting where you need to go simple and reliable.
        </p>

        <div className="mt-10 rounded-2xl bg-indigo-50 p-5 text-indigo-950">
          <p className="font-semibold">Development in progress</p>
          <p className="mt-1 text-sm leading-6 text-indigo-900/80">
            Booking features will be added in a later phase. This foundation
            is ready for the product to grow.
          </p>
        </div>
      </section>
    </main>
  );
}
