import { Link } from "react-router-dom";
import LeafLogo from "../components/LeafLogo.jsx";

function Landing() {
  return (
    <main className="min-h-screen overflow-hidden bg-earth-sand text-earth-soil">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-5 py-6 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LeafLogo />
            <p className="text-lg font-semibold">PeaceBond</p>
          </div>
          <Link
            className="rounded-full border border-earth-soil/20 px-4 py-2 text-sm font-semibold text-earth-soil transition hover:border-earth-clay hover:text-earth-clay"
            to="/login"
          >
            Staff login
          </Link>
        </nav>

        <div className="grid items-center gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]">
          <div className="animate-fade-up max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-earth-olive">
              Restorative reintegration
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-none text-earth-soil sm:text-6xl lg:text-7xl">
              PeaceBond
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-stone-700 sm:text-2xl sm:leading-10">
              A dignified path home through repair, not punishment
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">
              PeaceBond helps mediators guide communities from harm toward accountability,
              practical repair, and a shared record of reconciliation.
            </p>
            <Link
              className="mt-8 inline-flex rounded-full bg-earth-soil px-7 py-4 text-base font-semibold text-white shadow-lg shadow-earth-soil/20 transition hover:bg-stone-700"
              to="/login"
            >
              Get Started
            </Link>
          </div>

          <div className="animate-gentle-float relative min-h-[320px] rounded-lg border border-white/70 bg-[#efe0cc] p-5 shadow-2xl shadow-earth-soil/10">
            <div className="absolute inset-5 rounded-lg border border-earth-clay/20" />
            <div className="relative flex h-full min-h-[280px] flex-col justify-between rounded-lg bg-white/60 p-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
                  Community repair
                </p>
                <div className="mt-8 space-y-4">
                  <div className="h-3 w-4/5 rounded-full bg-earth-olive/35" />
                  <div className="h-3 w-3/5 rounded-full bg-earth-clay/35" />
                  <div className="h-3 w-2/3 rounded-full bg-earth-soil/25" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-earth-sand p-4 text-center text-sm font-semibold">Listen</div>
                <div className="rounded-lg bg-earth-sand p-4 text-center text-sm font-semibold">Repair</div>
                <div className="rounded-lg bg-earth-sand p-4 text-center text-sm font-semibold">Return</div>
              </div>
            </div>
          </div>
        </div>

        <p className="pb-4 text-sm text-stone-500">Built for peacebuilders, mediators, and community repair teams.</p>
      </section>
    </main>
  );
}

export default Landing;
