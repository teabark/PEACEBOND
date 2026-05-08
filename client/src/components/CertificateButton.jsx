import { useState } from "react";
import MockWhatsAppNotice from "./MockWhatsAppNotice.jsx";
import { useToast } from "./ToastProvider.jsx";
import { downloadCertificate } from "../utils/certificate.js";

function formatGrant(grant) {
  return `${grant.currency} ${grant.amount}`;
}

function buildCompletionSms(peaceBond) {
  return `PeaceBond completed. You have fulfilled your rehabilitation agreement and received a reintegration grant of ${formatGrant(
    peaceBond.grant
  )}. Your completion certificate is now available.`;
}

function CertificateButton({ completedActions, peaceBond, progress }) {
  const { showToast } = useToast();
  const [sentSms, setSentSms] = useState(null);
  const [sentWhatsApp, setSentWhatsApp] = useState(null);

  const canSendCompletionSms =
    progress === 100 &&
    peaceBond.grantReleased &&
    completedActions.length === 3 &&
    completedActions.every(Boolean);

  function handleDownload() {
    downloadCertificate({ completedActions, peaceBond, progress });
    showToast({
      title: "Certificate downloaded",
      message: `${peaceBond.fighterName}'s completion certificate was prepared for the community record.`,
      type: "success",
    });

    if (!canSendCompletionSms) {
      showToast({
        title: "SMS not sent yet",
        message: "Completion SMS waits until all repairs are complete and the grant is released.",
        type: "warning",
      });
      return;
    }

    setSentSms({
      grantAmount: formatGrant(peaceBond.grant),
      message: buildCompletionSms(peaceBond),
      name: peaceBond.fighterName,
      phoneNumber: peaceBond.phoneNumber || "No phone number recorded",
    });
    setSentWhatsApp({
      message: buildCompletionSms(peaceBond),
      name: peaceBond.fighterName,
      phoneNumber: peaceBond.phoneNumber,
      sentAt: new Date().toISOString(),
    });
    showToast({
      title: "Mock SMS Sent",
      message: "Completion SMS sent to rehabilitatee.",
      type: "success",
    });
    showToast({
      title: "Mock WhatsApp Sent",
      message: "WhatsApp completion message sent.",
      type: "success",
    });
  }

  return (
    <section className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
        Completion certificate
      </p>
      <p className="mt-2 text-base leading-7 text-stone-700">
        The PeaceBond is complete. Download a certificate for the community record.
      </p>
      <button
        className="mt-4 rounded-lg bg-earth-clay px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#9f6141]"
        onClick={handleDownload}
        type="button"
      >
        Download certificate
      </button>

      {sentSms && (
        <div className="mt-5 rounded-lg border border-earth-olive/30 bg-earth-sand/70 p-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-earth-olive">
            Mock SMS Sent
          </p>
          <div className="mt-3 grid gap-2 text-sm text-stone-700 sm:grid-cols-2">
            <p>
              <span className="font-semibold text-earth-soil">Rehabilitatee:</span>{" "}
              {sentSms.name}
            </p>
            <p>
              <span className="font-semibold text-earth-soil">Phone:</span>{" "}
              {sentSms.phoneNumber}
            </p>
            <p>
              <span className="font-semibold text-earth-soil">Grant:</span>{" "}
              {sentSms.grantAmount}
            </p>
          </div>
          <div className="mt-4 rounded-lg border border-white/80 bg-white/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-earth-clay">
              Message preview
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
