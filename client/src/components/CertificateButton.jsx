import { useState } from "react";
import { useI18n } from "./LanguageProvider.jsx";
import MockWhatsAppNotice from "./MockWhatsAppNotice.jsx";
import { useToast } from "./ToastProvider.jsx";
import { downloadCertificate } from "../utils/certificate.js";
import useConnectivity from "../hooks/useConnectivity.js";
import {
  getSharedDisplayName,
  getSharedPhoneNumber,
  isProtectedIdentity,
} from "../utils/protectedIdentity.js";

function formatGrant(grant) {
  return `${grant.currency} ${grant.amount}`;
}

function buildCompletionSms(peaceBond, t) {
  if (isProtectedIdentity(peaceBond)) {
    return t("identity.protectedCertificateMessage");
  }

  return t("message.completionSms", {
    amount: formatGrant(peaceBond.grant),
  });
}

function CertificateButton({ completedActions, peaceBond, progress }) {
  const { t } = useI18n();
  const { showToast } = useToast();
  const connectivity = useConnectivity();
  const [sentSms, setSentSms] = useState(null);
  const [sentWhatsApp, setSentWhatsApp] = useState(null);

  const canSendCompletionSms =
    progress === 100 &&
    peaceBond.reportSubmitted &&
    peaceBond.grantReleased &&
    completedActions.length === 3 &&
    completedActions.every(Boolean);

  function handleDownload() {
    downloadCertificate({ completedActions, peaceBond, progress });
    const sharedName = getSharedDisplayName(peaceBond, t);
    const sharedPhoneNumber = getSharedPhoneNumber(peaceBond, t("whatsapp.noPhone"));
    const completionMessage = buildCompletionSms(peaceBond, t);

    showToast({
      title: t("toast.certificateDownloaded"),
      message: t("toast.certificateDownloadedMessage", { name: sharedName }),
      type: "success",
    });

    if (!canSendCompletionSms) {
      showToast({
        title: t("toast.certificateNotReady"),
        message: t("report.lockedMessage"),
        type: "warning",
      });
      return;
    }

    setSentSms({
      grantAmount: formatGrant(peaceBond.grant),
      message: completionMessage,
      name: sharedName,
      phoneNumber: sharedPhoneNumber,
    });
    setSentWhatsApp({
      message: completionMessage,
      name: sharedName,
      phoneNumber: sharedPhoneNumber,
      sentAt: new Date().toISOString(),
    });
    showToast({
      title: t("toast.mockSms"),
      message: t("toast.mockSmsMessage"),
      type: "success",
    });
    showToast({
      title: t("toast.mockWhatsApp"),
      message: t("toast.mockWhatsAppCompletion"),
      type: "success",
    });
  }

  return (
    <section className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
        {t("certificate.title")}
      </p>
      <p className="mt-2 text-base leading-7 text-stone-700">
        {t("certificate.footerStatement")}
      </p>
      {(connectivity.isOffline || connectivity.isLimited) && (
        <p className="mt-3 rounded-lg border border-earth-clay/20 bg-earth-sand/60 px-4 py-3 text-sm text-stone-700">
          {t("offline.connectionRecommended")}
        </p>
      )}
      <button
        className="mt-4 rounded-lg bg-earth-clay px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#9f6141]"
        onClick={handleDownload}
        type="button"
      >
        {t("certificate.download")}
      </button>

      {sentSms && (
        <div className="mt-5 rounded-lg border border-earth-olive/30 bg-earth-sand/70 p-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-earth-olive">
            {t("toast.mockSms")}
          </p>
          <div className="mt-3 grid gap-2 text-sm text-stone-700 sm:grid-cols-2">
            <p>
              <span className="font-semibold text-earth-soil">{t("card.rehabilitatee")}:</span>{" "}
              {sentSms.name}
            </p>
            <p>
              <span className="font-semibold text-earth-soil">{t("card.phone")}:</span>{" "}
              {sentSms.phoneNumber}
            </p>
            <p>
              <span className="font-semibold text-earth-soil">{t("card.grant")}:</span>{" "}
              {sentSms.grantAmount}
            </p>
          </div>
          <div className="mt-4 rounded-lg border border-white/80 bg-white/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-earth-clay">
              {t("whatsapp.messagePreview")}
            </p>
            <p className="mt-2 text-sm leading-6 text-earth-soil">{sentSms.message}</p>
          </div>
        </div>
      )}

      {sentWhatsApp && (
        <div className="mt-5">
          <MockWhatsAppNotice
            message={sentWhatsApp.message}
            name={sentWhatsApp.name}
            phoneNumber={sentWhatsApp.phoneNumber}
            sentAt={sentWhatsApp.sentAt}
          />
        </div>
      )}
    </section>
  );
}

export default CertificateButton;
