import { useRef, useState } from "react";
import { useI18n } from "./LanguageProvider.jsx";
import { generateGuidedDraft } from "../utils/guidedDrafts.js";

const toneOptions = [
  { key: "draft.tone.warm", value: "warm" },
  { key: "draft.tone.formal", value: "formal" },
  { key: "draft.tone.brief", value: "brief" },
  { key: "draft.tone.detailed", value: "detailed" },
];

const questionSets = {
  harmDescription: [
    {
      id: "whatHappened",
      labelKey: "draft.answer.whatHappened",
      placeholderKey: "draft.placeholder.whatHappened",
    },
    {
      id: "affectedPeople",
      labelKey: "draft.answer.affectedPeople",
      placeholderKey: "draft.placeholder.affectedPeople",
    },
    {
      id: "damagedItem",
      labelKey: "draft.answer.damagedItem",
      placeholderKey: "draft.placeholder.damagedItem",
    },
    {
      id: "desiredRepair",
      labelKey: "draft.answer.desiredRepair",
      placeholderKey: "draft.placeholder.desiredRepair",
    },
  ],
  completionReview: [
    {
      id: "whatCompleted",
      labelKey: "draft.answer.whatCompleted",
      placeholderKey: "draft.placeholder.whatCompleted",
    },
    {
      id: "supportObserved",
      labelKey: "draft.answer.supportObserved",
      placeholderKey: "draft.placeholder.supportObserved",
    },
    {
      id: "restitutionCompleted",
      labelKey: "draft.answer.restitutionCompleted",
      placeholderKey: "draft.placeholder.restitutionCompleted",
    },
  ],
  communityAcknowledgment: [
    {
      id: "communityResponse",
      labelKey: "draft.answer.communityResponse",
      placeholderKey: "draft.placeholder.communityResponse",
    },
    {
      id: "remainingConcerns",
      labelKey: "draft.answer.remainingConcerns",
      placeholderKey: "draft.placeholder.remainingConcerns",
    },
    {
      id: "welcomeSignals",
      labelKey: "draft.answer.welcomeSignals",
      placeholderKey: "draft.placeholder.welcomeSignals",
    },
  ],
  staffRecommendation: [
    {
      id: "supportRecommended",
      labelKey: "draft.answer.supportRecommended",
      placeholderKey: "draft.placeholder.supportRecommended",
    },
    {
      id: "followUp",
      labelKey: "draft.answer.followUp",
      placeholderKey: "draft.placeholder.followUp",
    },
    {
      id: "inclusionReadiness",
      labelKey: "draft.answer.inclusionReadiness",
      placeholderKey: "draft.placeholder.inclusionReadiness",
    },
  ],
};

function GuidedDraftingAssistant({
  context = {},
  currentValue = "",
  fieldType,
  helperText,
  onUseDraft,
}) {
  const { language, t } = useI18n();
  const [answers, setAnswers] = useState({});
  const [draft, setDraft] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [tone, setTone] = useState("warm");
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
      language,
      tone,
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
          <p className="text-sm font-semibold text-earth-soil">
            {helperText || t("draft.open")}
          </p>
          <p className="mt-1 text-xs leading-5 text-stone-600">
            {t("draft.helperNote")}
          </p>
        </div>
        <button
          className="w-fit rounded-lg border border-earth-soil/20 bg-white px-4 py-2 text-sm font-semibold text-earth-soil shadow-sm transition hover:border-earth-clay hover:text-earth-clay"
          onClick={() => setIsOpen((currentValue) => !currentValue)}
          type="button"
        >
          {isOpen ? t("draft.hide") : t("draft.open")}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 rounded-lg border border-white/80 bg-white/75 p-4">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_190px]">
            <div className="grid gap-3">
              {questions.map((question) => (
                <div key={question.id}>
                  <label className="text-xs font-semibold uppercase tracking-wide text-earth-clay">
                    {t(question.labelKey)}
                  </label>
                  <input
                    className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
                    onChange={(event) => updateAnswer(question.id, event.target.value)}
                    placeholder={t(question.placeholderKey)}
                    type="text"
                    value={answers[question.id] || ""}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-earth-clay">
                {t("draft.tone")}
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-1">
                {toneOptions.map((toneOption) => (
                  <button
                    className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      tone === toneOption.value
                        ? "border-earth-olive bg-earth-olive text-white"
                        : "border-stone-200 bg-white text-earth-soil hover:border-earth-clay"
                    }`}
                    key={toneOption.value}
                    onClick={() => setTone(toneOption.value)}
                    type="button"
                  >
                    {t(toneOption.key)}
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
              {t("draft.generate")}
            </button>
            <button
              className="rounded-lg border border-earth-soil/20 px-4 py-2 text-sm font-semibold text-earth-soil transition hover:border-earth-clay hover:text-earth-clay"
              onClick={handleRegenerate}
              type="button"
            >
              {t("draft.regenerate")}
            </button>
          </div>

          {draft && (
            <div className="mt-4 rounded-lg border border-earth-olive/25 bg-earth-sand/60 p-4">
              <label className="text-xs font-semibold uppercase tracking-wide text-earth-olive">
                {t("draft.editable")}
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
                  {t("draft.use")}
                </button>
                <button
                  className="rounded-lg border border-earth-soil/20 px-4 py-2 text-sm font-semibold text-earth-soil transition hover:border-earth-clay hover:text-earth-clay"
                  onClick={handleEditDraft}
                  type="button"
                >
                  {t("draft.edit")}
                </button>
                <button
                  className="rounded-lg border border-earth-soil/20 px-4 py-2 text-sm font-semibold text-earth-soil transition hover:border-earth-clay hover:text-earth-clay"
                  onClick={handleClearDraft}
                  type="button"
                >
                  {t("draft.clear")}
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
