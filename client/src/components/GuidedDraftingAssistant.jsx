import { useRef, useState } from "react";
import { generateGuidedDraft } from "../utils/guidedDrafts.js";

const toneOptions = ["Warm", "Formal", "Brief", "Detailed"];

const questionSets = {
  harmDescription: [
    {
      id: "whatHappened",
      label: "What happened?",
      placeholder: "Example: Fishing nets were damaged during a shoreline dispute.",
    },
    {
      id: "affectedPeople",
      label: "Who was affected?",
      placeholder: "Example: The affected fisher and landing-site vendors.",
    },
    {
      id: "damagedItem",
      label: "What property, livelihood, or trust was harmed?",
      placeholder: "Example: Fishing equipment and shared landing-site trust.",
    },
    {
      id: "desiredRepair",
      label: "What repair should the pathway focus on?",
      placeholder: "Example: Supervised repair, apology, and a peace circle.",
    },
  ],
  completionReview: [
    {
      id: "whatCompleted",
      label: "What was completed?",
      placeholder: "Example: Restitution, supervised repair labor, and mediation sessions.",
    },
    {
      id: "supportObserved",
      label: "What positive effort did staff observe?",
      placeholder: "Example: Reliable attendance and respectful participation.",
    },
    {
      id: "restitutionCompleted",
      label: "Was restitution or repair completed?",
      placeholder: "Example: The affected household confirmed the repair was completed.",
    },
  ],
  communityAcknowledgment: [
    {
      id: "communityResponse",
      label: "How did the community respond?",
      placeholder: "Example: Elders acknowledged visible effort and reduced tension.",
    },
    {
      id: "remainingConcerns",
      label: "What should still be watched with care?",
      placeholder: "Example: Continued peaceful contact and follow-up check-ins.",
    },
    {
      id: "welcomeSignals",
      label: "What signs of welcome or trust were shown?",
      placeholder: "Example: The affected family accepted the apology.",
    },
  ],
  staffRecommendation: [
    {
      id: "supportRecommended",
      label: "What support should be recommended?",
      placeholder: "Example: Continued reintegration support and community inclusion.",
    },
    {
      id: "followUp",
      label: "What follow-up is useful?",
      placeholder: "Example: Monthly mediator check-ins for the next three months.",
    },
    {
      id: "inclusionReadiness",
      label: "What shows readiness for inclusion?",
      placeholder: "Example: Completed repair actions and positive community acknowledgment.",
    },
  ],
};

function GuidedDraftingAssistant({
  context = {},
  currentValue = "",
  fieldType,
  helperText = "Need help wording this?",
  onUseDraft,
}) {
  const [answers, setAnswers] = useState({});
  const [draft, setDraft] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [tone, setTone] = useState("Warm");
  const [variant, setVariant] = useState(0);
  const draftTextareaRef = useRef(null);
  const questions = questionSets[fieldType] || [];

  function updateAnswer(id, value) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [id]: value,
    }));
  }

  function buildDraft(nextVariant = variant) {
    const generatedDraft = generateGuidedDraft({
      answers,
      context: {
        ...context,
        currentValue,
      },
      fieldType,
      tone: tone.toLowerCase(),
      variant: nextVariant,
    });

    setDraft(generatedDraft);
  }

  function handleGenerate() {
    buildDraft();
  }

  function handleRegenerate() {
    const nextVariant = variant + 1;
    setVariant(nextVariant);
    buildDraft(nextVariant);
  }

  function handleClearDraft() {
    setDraft("");
  }

  function handleEditDraft() {
    draftTextareaRef.current?.focus();
  }

  function handleUseDraft() {
    if (draft) {
      onUseDraft(draft);
    }
  }

  return (
    <div className="mt-3 rounded-lg border border-earth-clay/20 bg-earth-sand/55 p-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-earth-soil">{helperText}</p>
          <p className="mt-1 text-xs leading-5 text-stone-600">
            Optional rule-based help. Drafts stay editable and are never inserted automatically.
          </p>
        </div>
        <button
          className="w-fit rounded-lg border border-earth-soil/20 bg-white px-4 py-2 text-sm font-semibold text-earth-soil shadow-sm transition hover:border-earth-clay hover:text-earth-clay"
          onClick={() => setIsOpen((currentValue) => !currentValue)}
          type="button"
        >
          {isOpen ? "Hide helper" : "Help me draft this"}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 rounded-lg border border-white/80 bg-white/75 p-4">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_190px]">
            <div className="grid gap-3">
              {questions.map((question) => (
                <div key={question.id}>
                  <label className="text-xs font-semibold uppercase tracking-wide text-earth-clay">
                    {question.label}
                  </label>
                  <input
                    className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
                    onChange={(event) => updateAnswer(question.id, event.target.value)}
                    placeholder={question.placeholder}
                    type="text"
                    value={answers[question.id] || ""}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-earth-clay">
                Drafting tone
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-1">
                {toneOptions.map((toneOption) => (
                  <button
                    className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      tone === toneOption
                        ? "border-earth-olive bg-earth-olive text-white"
                        : "border-stone-200 bg-white text-earth-soil hover:border-earth-clay"
                    }`}
                    key={toneOption}
                    onClick={() => setTone(toneOption)}
                    type="button"
                  >
                    {toneOption}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              className="rounded-lg bg-earth-soil px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-700"
              onClick={handleGenerate}
              type="button"
            >
              Generate guided draft
            </button>
            <button
              className="rounded-lg border border-earth-soil/20 px-4 py-2 text-sm font-semibold text-earth-soil transition hover:border-earth-clay hover:text-earth-clay"
              onClick={handleRegenerate}
              type="button"
            >
              Regenerate draft
            </button>
          </div>

          {draft && (
            <div className="mt-4 rounded-lg border border-earth-olive/25 bg-earth-sand/60 p-4">
              <label className="text-xs font-semibold uppercase tracking-wide text-earth-olive">
                Editable draft
              </label>
              <textarea
                className="mt-2 min-h-28 w-full resize-y rounded-lg border border-stone-300 bg-white px-3 py-3 text-sm leading-6 text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
                onChange={(event) => setDraft(event.target.value)}
                ref={draftTextareaRef}
                value={draft}
              />
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <button
                  className="rounded-lg bg-earth-clay px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#9f6141]"
                  onClick={handleUseDraft}
                  type="button"
                >
                  Use Draft
                </button>
                <button
                  className="rounded-lg border border-earth-soil/20 px-4 py-2 text-sm font-semibold text-earth-soil transition hover:border-earth-clay hover:text-earth-clay"
                  onClick={handleEditDraft}
                  type="button"
                >
                  Edit Draft
                </button>
                <button
                  className="rounded-lg border border-earth-soil/20 px-4 py-2 text-sm font-semibold text-earth-soil transition hover:border-earth-clay hover:text-earth-clay"
                  onClick={handleClearDraft}
                  type="button"
                >
                  Clear Draft
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GuidedDraftingAssistant;
