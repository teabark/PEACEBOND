import { useState } from "react";
import { Link } from "react-router-dom";
import HarmForm from "../components/HarmForm.jsx";
import { useI18n } from "../components/LanguageProvider.jsx";
import MockWhatsAppNotice from "../components/MockWhatsAppNotice.jsx";
import PeaceBondCard from "../components/PeaceBondCard.jsx";
import { useToast } from "../components/ToastProvider.jsx";
import { createPeaceBond } from "../utils/api.js";
import { getStaffUser } from "../utils/auth.js";
import { addNotification } from "../utils/notifications.js";
import {
  CASE_DRAFT_KEY,
  clearLocalDraft,
  clearSyncPending,
  isLikelyOfflineError,
  markSyncPending,
} from "../utils/offlineSupport.js";
import { translateCommunityType } from "../utils/peacebondContent.js";
import { getSharedDisplayName, getSharedPhoneNumber } from "../utils/protectedIdentity.js";

function CreatePeaceBond() {
  const staffUser = getStaffUser();
  const { language, t } = useI18n();
  const { showToast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const [createdPeaceBond, setCreatedPeaceBond] = useState(null);
  const [createdWhatsApp, setCreatedWhatsApp] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  async function handleCreatePeaceBond({
    communityImpact,
    communityType,
    fighterName,
    harmDescription,
    livelihoodType,
    nationality,
    phoneNumber,
    protectedIdentity,
    reintegrationContext,
    severity,
    skills,
  }) {
    if (!staffUser?._id) {
      const sessionMessage = t("form.errorNoSession");
      setError(sessionMessage);
      showToast({
        title: t("toast.sessionMissing"),
        message: sessionMessage,
        type: "error",
      });
      return;
    }

    setIsCreating(true);
    setError("");
    setCreatedPeaceBond(null);
    setCreatedWhatsApp(null);
    setSuccessMessage("");

    try {
      const peaceBond = await createPeaceBond({
        communityImpact,
        communityType,
        createdBy: staffUser._id,
        fighterName,
        harmDescription,
        language,
        livelihoodType,
        nationality,
        phoneNumber,
        protectedIdentity,
        reintegrationContext,
        severity,
        skills,
      });
      setCreatedPeaceBond(peaceBond);
      clearLocalDraft(CASE_DRAFT_KEY);
      clearSyncPending();
      const sharedName = getSharedDisplayName(peaceBond, t);
      addNotification({
        title: t("toast.caseCreated"),
        message: t("notification.caseCreated", {
          community: translateCommunityType(peaceBond.communityType, language),
          name: sharedName,
          severity: t(`severity.${peaceBond.severity}`),
        }),
        type: "case",
      });
      setSuccessMessage(t("create.createdMessage"));
      setCreatedWhatsApp({
        message: t("message.peacebondCreated"),
        name: sharedName,
        phoneNumber: getSharedPhoneNumber(peaceBond, t("whatsapp.noPhone")),
        sentAt: new Date().toISOString(),
      });
      showToast({
        title: t("toast.caseCreated"),
        message: t("toast.caseCreatedMessage", { name: sharedName }),
        type: "success",
      });
      showToast({
        title: t("toast.mockWhatsApp"),
        message: t("toast.mockWhatsAppCreated"),
        type: "success",
      });
    } catch (requestError) {
      if (isLikelyOfflineError(requestError)) {
        markSyncPending("peacebond case creation");
        setSuccessMessage(t("offline.caseDraftSaved"));
        showToast({
          title: t("offline.savedLocally"),
          message: t("offline.pendingDetail"),
          type: "warning",
          duration: 6200,
        });
        return;
      }

      const errorMessage =
        requestError.response?.data?.message ||
        t("form.submitError");
      setError(errorMessage);
      showToast({
        title: t("toast.caseNotCreated"),
        message: errorMessage,
        type: "error",
      });
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">{t("create.newCase")}</p>
      <h1 className="mt-2 text-3xl font-semibold">{t("create.title")}</h1>
      <p className="mt-3 text-base leading-7 text-stone-600">
        {t("create.description")}
      </p>

      <div className="mt-6">
        <HarmForm error={error} isGenerating={isCreating} onGenerate={handleCreatePeaceBond} />
      </div>

      {successMessage && (
        <p className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {successMessage}
        </p>
      )}

      {createdPeaceBond && (
        <div className="mt-6 flex flex-col gap-4">
          <PeaceBondCard peaceBond={createdPeaceBond} />
          {createdWhatsApp && (
            <MockWhatsAppNotice
              message={createdWhatsApp.message}
              name={createdWhatsApp.name}
              phoneNumber={createdWhatsApp.phoneNumber}
              sentAt={createdWhatsApp.sentAt}
            />
          )}
          <Link
            className="w-fit rounded-lg bg-earth-clay px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#9f6141]"
            to={`/dashboard/peacebonds/${createdPeaceBond._id}`}
          >
            {t("create.openWorkspace")}
          </Link>
        </div>
      )}
    </div>
  );
}

export default CreatePeaceBond;
