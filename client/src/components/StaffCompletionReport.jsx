import { useState } from "react";
import GuidedDraftingAssistant from "./GuidedDraftingAssistant.jsx";
import { useToast } from "./ToastProvider.jsx";

function StaffCompletionReport({
  completedActions,
  isSubmitting,
  onSubmit,
  peaceBond,
  progress,
}) {
  const { showToast } = useToast();
  const [reportSummary, setReportSummary] = useState("");
  const [communityResponse, setCommunityResponse] = useState("");
  const [staffRecommendation, setStaffRecommendation] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      communityResponse,
      reportSummary,
      staffRecommendation,
    });
  }

  function handleLockedAction() {
    showToast({
      title: "Completion review needed",
      message: "Submit the completion report before releasing grant or certificate.",
      type: "warning",
    });
  }

  const draftingContext = {
    completedActions,
    peaceBond,
    progress,
  };

  return (
    <section className="rounded-lg border border-earth-clay/20 bg-white/90 p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
        Staff Completion Report
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-earth-soil">Completion Review</h2>
      <p className="mt-2 text-sm leading-6 text-stone-600">
        Confirm the repair pathway with care before the mock grant and certificate are made
        available.
      </p>

      <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-semibold text-earth-soil" htmlFor="report-summary">
            Completion Review
          </label>
          <textarea
            className="mt-2 min-h-24 w-full resize-y rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm leading-6 text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
            id="report-summary"
            onChange={(event) => setReportSummary(event.target.value)}
            placeholder="Summarize the repair work completed..."
            value={reportSummary}
          />
          <GuidedDraftingAssistant
            context={draftingContext}
            currentValue={reportSummary}
            fieldType="completionReview"
            helperText="Need help drafting the completion review?"
            onUseDraft={setReportSummary}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-earth-soil" htmlFor="community-response">
            Community Acknowledgment
          </label>
          <textarea
            className="mt-2 min-h-24 w-full resize-y rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm leading-6 text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
            id="community-response"
            onChange={(event) => setCommunityResponse(event.target.value)}
            placeholder="How did the community respond?"
            value={communityResponse}
          />
          <GuidedDraftingAssistant
            context={draftingContext}
            currentValue={communityResponse}
            fieldType="communityAcknowledgment"
            helperText="Need help drafting the community acknowledgment?"
            onUseDraft={setCommunityResponse}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-earth-soil" htmlFor="staff-recommendation">
            Staff Recommendation
          </label>
          <textarea
            className="mt-2 min-h-20 w-full resize-y rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm leading-6 text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
            id="staff-recommendation"
            onChange={(event) => setStaffRecommendation(event.target.value)}
            placeholder="Recommend grant release and certificate issuance?"
            value={staffRecommendation}
          />
          <GuidedDraftingAssistant
            context={draftingContext}
            currentValue={staffRecommendation}
            fieldType="staffRecommendation"
            helperText="Need help drafting the staff recommendation?"
            onUseDraft={setStaffRecommendation}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            className="rounded-lg bg-earth-soil px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-400"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Submitting review..." : "Submit completion report"}
          </button>
          <button
            className="rounded-lg border border-earth-soil/20 px-5 py-3 text-sm font-semibold text-earth-soil transition hover:border-earth-clay hover:text-earth-clay"
            onClick={handleLockedAction}
            type="button"
          >
            Grant and certificate unavailable
          </button>
        </div>
      </form>
    </section>
  );
}

export default StaffCompletionReport;
