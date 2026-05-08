import ActivePeaceBonds from "../components/ActivePeaceBonds.jsx";
import usePeaceBonds from "../hooks/usePeaceBonds.js";

function CompletedReintegration() {
  const { error, isLoading, peaceBonds } = usePeaceBonds();
  const completedPeaceBonds = peaceBonds.filter((peaceBond) => peaceBond.reportSubmitted);

  return (
    <ActivePeaceBonds
      emptyMessage="Completed reintegration cases will appear here once staff review confirms the repair pathway."
      error={error}
      isLoading={isLoading}
      peaceBonds={completedPeaceBonds}
      subtitle="Completed repair and return"
      title="Completed Reintegration"
    />
  );
}

export default CompletedReintegration;
