import ActivePeaceBonds from "../components/ActivePeaceBonds.jsx";
import { useI18n } from "../components/LanguageProvider.jsx";
import usePeaceBonds from "../hooks/usePeaceBonds.js";

function CompletedReintegration() {
  const { t } = useI18n();
  const { error, isLoading, peaceBonds } = usePeaceBonds();
  const completedPeaceBonds = peaceBonds.filter((peaceBond) => peaceBond.reportSubmitted);

  return (
    <ActivePeaceBonds
      emptyMessage={t("active.emptyCompleted")}
      error={error}
      isLoading={isLoading}
      peaceBonds={completedPeaceBonds}
      subtitle={t("active.completedSubtitle")}
      title={t("nav.completed")}
    />
  );
}

export default CompletedReintegration;
