import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CertificateButton from "../components/CertificateButton.jsx";
import GrantNotice from "../components/GrantNotice.jsx";
import PeaceBondCard from "../components/PeaceBondCard.jsx";
import ProgressTracker from "../components/ProgressTracker.jsx";
import { useToast } from "../components/ToastProvider.jsx";
import { getPeaceBond, updatePeaceBondProgress } from "../utils/api.js";
import { getStaffUser } from "../utils/auth.js";
import { addNotification } from "../utils/notifications.js";

function calculateProgress(completedActions) {
  const completedCount = completedActions.filter(Boolean).length;
  return Math.round((completedCount / 3) * 100);
}

function buildProgressMessage(completedActions) {
  const completedCount = completedActions.filter(Boolean).length;

  if (completedCount === 0) {
    return "No repair actions have been completed yet.";
  }

  if (completedCount === 3) {
    return "All repair actions are complete.";
  }

  return `${completedCount} of 3 repair actions completed.`;
}

function PeaceBondDetail() {
  const { id } = useParams();
  const staffUser = getStaffUser();
  const { showToast } = useToast();
  const [peaceBond, setPeaceBond] = useState(null);
  const [completedActions, setCompletedActions] = useState([false, false, false]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProgress, setIsSavingProgress] = useState(false);

  const progress = useMemo(() => calculateProgress(completedActions), [completedActions]);
  const progressMessage = useMemo(
    () => buildProgressMessage(completedActions),
    [completedActions]
  );

  useEffect(() => {
    async function loadPeaceBond() {
      if (!staffUser?._id) {
        const sessionMessage = "No logged-in staff user found.";
        setError(sessionMessage);
        showToast({
          title: "Session missing",
          message: sessionMessage,
          type: "error",
        });
        setIsLoading(false);
        return;
      }

      try {
        setError("");
        setIsLoading(true);
        const loadedPeaceBond = await getPeaceBond(id, staffUser._id);
        setPeaceBond(loadedPeaceBond);
        setCompletedActions(loadedPeaceBond.completedActions || [false, false, false]);
      } catch (requestError) {
        const errorMessage =
          requestError.response?.data?.message ||
          "Could not load this PeaceBond. Please check the backend connection.";
        setError(errorMessage);
        showToast({
          title: "PeaceBond could not load",
          message: errorMessage,
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadPeaceBond();
  }, [id, staffUser?._id]);

  async function handleToggleAction(actionIndex) {
    if (!peaceBond || !staffUser?._id) {
      return;
    }

    const previousActions = completedActions;
    const previousProgress = peaceBond.progress;
    const nextActions = completedActions.map((isComplete, index) =>
      index === actionIndex ? !isComplete : isComplete
    );

    setCompletedActions(nextActions);
    setIsSavingProgress(true);
    setError("");

    try {
      const updatedPeaceBond = await updatePeaceBondProgress(
        peaceBond._id,
        nextActions,
        staffUser._id
      );
      setPeaceBond(updatedPeaceBond);
      setCompletedActions(updatedPeaceBond.completedActions);

      if (previousProgress < 100 && updatedPeaceBond.progress === 100) {
        addNotification({
          title: "Grant release ready",
          message: `${updatedPeaceBond.fighterName} completed all repair actions. Mock grant ${updatedPeaceBond.grant.currency} ${updatedPeaceBond.grant.amount} is ready.`,
          type: "grant",
        });
        showToast({
          title: "PeaceBond completed",
          message: `Mock grant ${updatedPeaceBond.grant.currency} ${updatedPeaceBond.grant.amount} is ready for release.`,
          type: "success",
          duration: 6200,
        });
      } else {
        showToast({
          title: "Progress saved",
          message: `${updatedPeaceBond.progress}% of repair actions completed.`,
          type: "success",
        });
      }
    } catch (requestError) {
      setCompletedActions(previousActions);
      const errorMessage =
        requestError.response?.data?.message ||
        "Could not save progress. Please check the backend connection.";
      setError(errorMessage);
      showToast({
        title: "Progress not saved",
        message: errorMessage,
        type: "error",
      });
    } finally {
      setIsSavingProgress(false);
    }
  }

  if (isLoading) {
    return (
      <section className="rounded-lg border border-stone-200 bg-white/90 p-6 shadow-sm">
        <p className="text-sm font-semibold text-stone-600">Loading PeaceBond...</p>
      </section>
    );
  }

  if (error && !peaceBond) {
    return (
      <section className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-800 shadow-sm">
        <p className="text-sm font-semibold">{error}</p>
        <Link
          className="mt-4 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-semibold text-red-800"
          to="/dashboard/active"
        >
          Back to active cases
        </Link>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
            Repair workspace
          </p>
          <h1 className="mt-2 text-3xl font-semibold">{peaceBond.fighterName}</h1>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Track each repair action with care, then release the mock grant and certificate when
            the pathway reaches 100%.
          </p>
        </div>
        <Link
          className="w-fit rounded-lg border border-earth-soil/20 px-4 py-3 text-sm font-semibold text-earth-soil transition hover:border-earth-clay hover:text-earth-clay"
          to="/dashboard/active"
        >
          Back to cases
        </Link>
      </header>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
        <PeaceBondCard peaceBond={peaceBond} />
        <ProgressTracker
          completedActions={completedActions}
          isSavingProgress={isSavingProgress}
          onToggleAction={handleToggleAction}
          peaceBond={peaceBond}
          progress={progress}
          progressMessage={progressMessage}
        />
      </div>

      {progress === 100 && (
        <div className="grid gap-5 lg:grid-cols-2">
          <GrantNotice grant={peaceBond.grant} />
          <CertificateButton
            completedActions={completedActions}
            peaceBond={peaceBond}
            progress={progress}
          />
        </div>
      )}
    </div>
  );
}

export default PeaceBondDetail;
