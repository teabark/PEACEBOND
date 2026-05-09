import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CertificateButton from "../components/CertificateButton.jsx";
import GrantNotice from "../components/GrantNotice.jsx";
import { useI18n } from "../components/LanguageProvider.jsx";
import PeaceBondCard from "../components/PeaceBondCard.jsx";
import ProgressTracker from "../components/ProgressTracker.jsx";
import ProtectedIdentityBadge from "../components/ProtectedIdentityBadge.jsx";
import StaffCompletionReport from "../components/StaffCompletionReport.jsx";
import { useToast } from "../components/ToastProvider.jsx";
import { getPeaceBond, submitCompletionReport, updatePeaceBondProgress } from "../utils/api.js";
import { getStaffUser } from "../utils/auth.js";
import { addNotification } from "../utils/notifications.js";
import { getParticipantId, isProtectedIdentity } from "../utils/protectedIdentity.js";

function calculateProgress(completedActions) {
  const completedCount = completedActions.filter(Boolean).length;
  return Math.round((completedCount / 3) * 100);
}

function buildProgressMessage(completedActions, t) {
  const completedCount = completedActions.filter(Boolean).length;

  if (completedCount === 0) {
    return t("progress.none");
  }

  if (completedCount === 3) {
    return t("progress.all");
  }

  return t("progress.partial", { count: completedCount });
}

function PeaceBondDetail() {
  const { id } = useParams();
  const staffUser = getStaffUser();
  const { t } = useI18n();
  const { showToast } = useToast();
  const [peaceBond, setPeaceBond] = useState(null);
  const [completedActions, setCompletedActions] = useState([false, false, false]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [isSavingProgress, setIsSavingProgress] = useState(false);

  const progress = useMemo(() => calculateProgress(completedActions), [completedActions]);
  const progressMessage = useMemo(
    () => buildProgressMessage(completedActions, t),
    [completedActions, t]
  );

  useEffect(() => {
    async function loadPeaceBond() {
      if (!staffUser?._id) {
        const sessionMessage = t("form.errorNoSession");
        setError(sessionMessage);
        showToast({
          title: t("toast.sessionMissing"),
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
          t("workspace.loadError");
        setError(errorMessage);
        showToast({
          title: t("workspace.loadErrorTitle"),
          message: errorMessage,
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadPeaceBond();
  }, [id, staffUser?._id, showToast, t]);

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
          title: t("report.lockedTitle"),
          message: t("report.lockedMessage"),
          type: "review",
        });
        showToast({
          title: t("toast.repairActionsComplete"),
          message: t("report.lockedMessage"),
          type: "success",
          duration: 6200,
        });
      } else {
        showToast({
          title: t("progress.saved"),
          message: t("workspace.progressMessage", { progress: updatedPeaceBond.progress }),
          type: "success",
        });
      }
    } catch (requestError) {
      setCompletedActions(previousActions);
      const errorMessage =
        requestError.response?.data?.message ||
        t("workspace.saveError");
      setError(errorMessage);
      showToast({
        title: t("toast.progressNotSaved"),
        message: errorMessage,
        type: "error",
      });
    } finally {
      setIsSavingProgress(false);
    }
  }

  async function handleSubmitCompletionReport(reportDetails) {
    if (!peaceBond || !staffUser?._id) {
      return;
    }

    setIsSubmittingReport(true);
    setError("");

    try {
      const updatedPeaceBond = await submitCompletionReport(
        peaceBond._id,
        reportDetails,
        staffUser._id
      );
      setPeaceBond(updatedPeaceBond);
      addNotification({
        title: t("toast.completionReportSubmitted"),
        message: t("toast.completionReportSubmittedMessage"),
        type: "grant",
      });
      showToast({
        title: t("toast.completionReportSubmitted"),
        message: t("toast.completionReportSubmittedMessage"),
        type: "success",
        duration: 6200,
      });
    } catch (requestError) {
      const errorMessage =
        requestError.response?.data?.message ||
        t("workspace.reportError");
      setError(errorMessage);
      showToast({
        title: t("toast.reportNotSubmitted"),
        message: errorMessage,
        type: "error",
      });
    } finally {
      setIsSubmittingReport(false);
    }
  }

  if (isLoading) {
    return (
      <section className="rounded-lg border border-stone-200 bg-white/90 p-6 shadow-sm">
        <p className="text-sm font-semibold text-stone-600">{t("workspace.loading")}</p>
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
          {t("workspace.backActive")}
        </Link>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
            {t("workspace.title")}
          </p>
          <h1 className="mt-2 text-3xl font-semibold">{peaceBond.fighterName}</h1>
          {isProtectedIdentity(peaceBond) && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <ProtectedIdentityBadge />
              <span className="rounded-full bg-earth-sand px-3 py-1 text-xs font-semibold text-earth-soil">
                {t("identity.participantId")}: {getParticipantId(peaceBond) || t("app.notRecorded")}
              </span>
            </div>
          )}
          {peaceBond.nationality && (
            <p className="mt-2 text-sm font-semibold text-earth-olive">
              {t("card.nationality")}: {peaceBond.nationality}
            </p>
          )}
          <p className="mt-2 text-sm leading-6 text-stone-600">
            {t("workspace.subtitle")}
          </p>
        </div>
        <Link
          className="w-fit rounded-lg border border-earth-soil/20 px-4 py-3 text-sm font-semibold text-earth-soil transition hover:border-earth-clay hover:text-earth-clay"
          to="/dashboard/active"
        >
          {t("workspace.back")}
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

      {progress === 100 && !peaceBond.reportSubmitted && (
        <StaffCompletionReport
          completedActions={completedActions}
          isSubmitting={isSubmittingReport}
          onSubmit={handleSubmitCompletionReport}
          peaceBond={peaceBond}
          progress={progress}
        />
      )}

      {progress === 100 && peaceBond.reportSubmitted && (
        <div className="grid gap-5 lg:grid-cols-2">
          <GrantNotice grant={peaceBond.grant} peaceBond={peaceBond} />
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
