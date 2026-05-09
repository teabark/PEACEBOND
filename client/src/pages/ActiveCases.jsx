import ActivePeaceBonds from "../components/ActivePeaceBonds.jsx";
import { useI18n } from "../components/LanguageProvider.jsx";
import usePeaceBonds from "../hooks/usePeaceBonds.js";

function ActiveCases() {
  const { t } = useI18n();
  const { error, isLoading, peaceBonds } = usePeaceBonds();
  const activePeaceBonds = peaceBonds.filter(
    (peaceBond) => peaceBond.progress < 100 || !peaceBond.reportSubmitted
  );

  return (
    <ActivePeaceBonds
      emptyMessage={t("active.emptyActive")}
      error={error}
      isLoading={isLoading}
      peaceBonds={activePeaceBonds}
      subtitle={t("active.openJourneys")}
      title={t("nav.active")}
    />
  );
}

export default ActiveCases;
