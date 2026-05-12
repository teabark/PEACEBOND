import { Link } from "react-router-dom";
import LeafLogo from "../components/LeafLogo.jsx";
import LanguageSelector from "../components/LanguageSelector.jsx";
import { useI18n } from "../components/LanguageProvider.jsx";

function Landing() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf6ee] text-earth-soil">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-5 py-7 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LeafLogo />
            <p className="text-lg font-semibold">PeaceBond</p>
          </div>
          <Link
            className="rounded-full border border-earth-soil/15 bg-white/70 px-4 py-2 text-sm font-semibold text-earth-soil shadow-sm shadow-earth-soil/5 transition hover:border-earth-clay/35 hover:bg-white hover:text-earth-clay"
            to="/login"
          >
            {t("landing.staffLogin")}
          </Link>
        </nav>

        <div className="grid items-center gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]">
          <div className="animate-fade-up max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-normal text-earth-olive">
              {t("landing.tag")}
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-none text-earth-soil sm:text-6xl lg:text-7xl">
              PeaceBond
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-stone-700 sm:text-2xl sm:leading-10">
              {t("landing.subtitle")}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">
              {t("landing.copy")}
            </p>
            <div className="mt-7 max-w-sm">
              <LanguageSelector />
            </div>
            <Link
              className="mt-8 inline-flex rounded-full bg-earth-soil px-7 py-4 text-base font-semibold text-white shadow-lg shadow-earth-soil/20 transition hover:bg-stone-700"
              to="/login"
            >
              {t("landing.getStarted")}
            </Link>
          </div>

          <div className="animate-gentle-float relative min-h-[320px] rounded-3xl border border-white bg-[#e9d9c8] p-5 shadow-2xl shadow-earth-soil/10">
            <div className="absolute inset-5 rounded-2xl border border-earth-clay/20" />
            <div className="relative flex h-full min-h-[280px] flex-col justify-between rounded-2xl bg-[#fffdf8]/70 p-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-normal text-earth-clay">
                  {t("landing.communityRepair")}
                </p>
                <div className="mt-8 space-y-4">
                  <div className="h-3 w-4/5 rounded-full bg-earth-olive/35" />
                  <div className="h-3 w-3/5 rounded-full bg-earth-clay/35" />
                  <div className="h-3 w-2/3 rounded-full bg-earth-soil/25" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-[#f8efe4] p-4 text-center text-sm font-semibold">{t("landing.listen")}</div>
                <div className="rounded-2xl bg-[#f8efe4] p-4 text-center text-sm font-semibold">{t("landing.repair")}</div>
                <div className="rounded-2xl bg-[#f8efe4] p-4 text-center text-sm font-semibold">{t("landing.return")}</div>
              </div>
            </div>
          </div>
        </div>

        <p className="pb-4 text-sm text-stone-500">{t("landing.builtFor")}</p>
      </section>
    </main>
  );
}

export default Landing;
