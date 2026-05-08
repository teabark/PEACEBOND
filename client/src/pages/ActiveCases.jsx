import ActivePeaceBonds from "../components/ActivePeaceBonds.jsx";
import usePeaceBonds from "../hooks/usePeaceBonds.js";

function ActiveCases() {
  const { error, isLoading, peaceBonds } = usePeaceBonds();
  const activePeaceBonds = peaceBonds.filter(
    (peaceBond) => peaceBond.progress < 100 || !peaceBond.reportSubmitted
  );

  return (
    <ActivePeaceBonds
      emptyMessage="No active cases are currently assigned to this staff member."
      error={error}
      isLoading={isLoading}
      peaceBonds={activePeaceBonds}
      subtitle="Open repair journeys"
      title="Active Cases"
    />
  );
}

export default ActiveCases;
