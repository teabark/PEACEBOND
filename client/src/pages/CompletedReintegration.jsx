import ActivePeaceBonds from "../components/ActivePeaceBonds.jsx";
import usePeaceBonds from "../hooks/usePeaceBonds.js";

function CompletedReintegration() {
  const { error, isLoading, peaceBonds } = usePeaceBonds();
  const completedPeaceBonds = peaceBonds.filter((peaceBond) => peaceBond.progress === 100);

  return (
    <ActivePeaceBonds
      emptyMessage="Completed reintegration cases will appear here once repair reaches 100%."
      error={error}
      isLoading={isLoading}
      peaceBonds={completedPeaceBonds}
      subtitle="Completed repair and return"
      title="Completed Reintegration"
    />
  );
}

export default CompletedReintegration;
