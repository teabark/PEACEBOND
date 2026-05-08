import { useState } from "react";
import { Link } from "react-router-dom";
import HarmForm from "../components/HarmForm.jsx";
import MockWhatsAppNotice from "../components/MockWhatsAppNotice.jsx";
import PeaceBondCard from "../components/PeaceBondCard.jsx";
import { useToast } from "../components/ToastProvider.jsx";
import { createPeaceBond } from "../utils/api.js";
import { getStaffUser } from "../utils/auth.js";
import { addNotification } from "../utils/notifications.js";

function CreatePeaceBond() {
  const staffUser = getStaffUser();
  const { showToast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const [createdPeaceBond, setCreatedPeaceBond] = useState(null);
  const [createdWhatsApp, setCreatedWhatsApp] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  async function handleCreatePeaceBond({
    communityType,
    fighterName,
    harmDescription,
    nationality,
    phoneNumber,
    severity,
    skills,
  }) {
    if (!staffUser?._id) {
      const sessionMessage = "No logged-in staff user found.";
      setError(sessionMessage);
      showToast({
        title: "Session missing",
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
        communityType,
        createdBy: staffUser._id,
        fighterName,
        harmDescription,
        nationality,
        phoneNumber,
        severity,
        skills,
      });
      setCreatedPeaceBond(peaceBond);
      addNotification({
        title: "PeaceBond created",
        message: `${peaceBond.fighterName} received a ${peaceBond.severity} repair pathway for ${peaceBond.communityType}.`,
        type: "case",
      });
      setSuccessMessage("PeaceBond created and added to Active Cases.");
      setCreatedWhatsApp({
        message:
          "Your PeaceBond has been created. A community repair plan has begun for you. Please work with your mediator to complete the proposed rehabilitation actions.",
        name: peaceBond.fighterName,
        phoneNumber: peaceBond.phoneNumber,
        sentAt: new Date().toISOString(),
      });
      showToast({
        title: "PeaceBond created",
        message: `${peaceBond.fighterName} has a repair pathway ready to track.`,
        type: "success",
      });
      showToast({
        title: "Mock WhatsApp Sent",
        message: "WhatsApp message sent to rehabilitatee.",
        type: "success",
      });
    } catch (requestError) {
      const errorMessage =
        requestError.response?.data?.message ||
        "PeaceBond could not be created. Please check the backend connection.";
      setError(errorMessage);
      showToast({
        title: "PeaceBond not created",
        message: errorMessage,
        type: "error",
      });
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">New case</p>
      <h1 className="mt-2 text-3xl font-semibold">Create PeaceBond</h1>
      <p className="mt-3 text-base leading-7 text-stone-600">
        Prepare a repair pathway with dignity, a community ritual, and mock grant support.
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
            Open repair workspace
          </Link>
        </div>
      )}
    </div>
  );
}

export default CreatePeaceBond;
