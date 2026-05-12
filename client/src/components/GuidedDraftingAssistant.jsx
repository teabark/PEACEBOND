import { useEffect, useRef, useState } from "react";
import { useI18n } from "./LanguageProvider.jsx";
import { generateGuidedDraft } from "../utils/guidedDrafts.js";

export const draftToneOptions = [
  { key: "draft.tone.warm", value: "warm" },
  { key: "draft.tone.formal", value: "formal" },
  { key: "draft.tone.brief", value: "brief" },
  { key: "draft.tone.detailed", value: "detailed" },
];

const questionSets = {
  harmDescription: {
    advanced: [
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
    primary: [
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
    ],
  },
  completionReview: {
    advanced: [
      {
        id: "whatCompleted",
        labelKey: "draft.answer.whatCompleted",
        placeholderKey: "draft.placeholder.whatCompleted",
      },
    ],
    primary: [
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
  },
  communityAcknowledgment: {
    advanced: [
      {
        id: "remainingConcerns",
        labelKey: "draft.answer.remainingConcerns",
        placeholderKey: "draft.placeholder.remainingConcerns",
      },
    ],
    primary: [
      {
        id: "communityResponse",
        labelKey: "draft.answer.communityResponse",
        placeholderKey: "draft.placeholder.communityResponse",
      },
      {
        id: "welcomeSignals",
        labelKey: "draft.answer.welcomeSignals",
        placeholderKey: "draft.placeholder.welcomeSignals",
      },
    ],
  },
  staffRecommendation: {
    advanced: [
      {
        id: "inclusionReadiness",
        labelKey: "draft.answer.inclusionReadiness",
        placeholderKey: "draft.placeholder.inclusionReadiness",
      },
    ],
    primary: [
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
    ],
  },
};

function GuidedDraftingAssistant({
  buttonLabel,
  context = {},
  currentValue = "",
  fieldType,
  helperText,
  onUseDraft,
  onToneChange,
  showToneSelector = true,
  tone: controlledTone,
}) {
  const { language, t } = useI18n();
  const [answers, setAnswers] = useState({});
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [localTone, setLocalTone] = useState("warm");
  const [variant, setVariant] = useState(0);
  const draftTextareaRef = useRef(null);
  const activeTone = controlledTone || localTone;
  const questions = questionSets[fieldType] || { advanced: [], primary: [] };

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
      tone: activeTone,
      variant: nextVariant,
    });

    setDraft(generatedDraft);
  }

  function handleOpen() {
    setIsOpen(true);
    if (!draft) {
      buildDraft();
    }
  }

  function handleClose() {
    setIsOpen(false);
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
      setIsOpen(false);
    }
  }

  function handleToneChange(nextTone) {
    if (onToneChange) {
      onToneChange(nextTone);
      return;
    }

    setLocalTone(nextTone);
  }

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function renderPrompts(promptList) {
    return promptList.map((question) => (
      <div key={question.id}>
        <label className="text-xs font-semibold uppercase tracking-normal text-earth-clay">
          {t(question.labelKey)}
        </label>
        <input
          className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
          onChange={(event) => updateAnswer(question.id, event.target.value)}
          placeholder={t(question.placeholderKey)}
          type="text"
          value={answers[question.id] || ""}
        />
      </div>
    ));
  }

  return (
    <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs leading-5 text-stone-500">
        {helperText || t("draft.helperNote")}
      </p>
      <button
        className="w-fit rounded-full border border-earth-clay/20 bg-[#fffdf8] px-4 py-2 text-xs font-semibold text-earth-soil shadow-sm transition hover:border-earth-olive/30 hover:text-earth-olive"
        onClick={handleOpen}
        type="button"
      >
        {buttonLabel || t("draft.generate")}
      </button>

      {isOpen && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[80] flex items-end justify-center bg-earth-soil/35 px-4 py-4 backdrop-blur-[1px] sm:items-center"
          role="dialog"
        >
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white bg-[#fffdf8] p-5 shadow-2xl shadow-earth-soil/25 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-normal text-earth-clay">
                  {t("draft.panelTitle")}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-earth-soil">
                  {buttonLabel || t("draft.generate")}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-stone-600">
                  {t("draft.panelIntro")}
                </p>
              </div>
              <button
                className="rounded-full border border-earth-clay/20 bg-white px-3 py-1.5 text-xs font-semibold text-earth-soil transition hover:border-earth-clay/40 hover:text-earth-clay"
                onClick={handleClose}
                type="button"
              >
                {t("draft.close")}
              </button>
            </div>

            {showToneSelector && (
              <div className="mt-5 rounded-2xl border border-earth-clay/10 bg-[#f8efe4] p-4">
                <p className="text-xs font-semibold uppercase tracking-normal text-earth-clay">
                  {t("draft.tone")}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {draftToneOptions.map((toneOption) => (
                    <button
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        activeTone === toneOption.value
                          ? "border-earth-olive bg-earth-olive text-white"
                          : "border-earth-clay/15 bg-white text-earth-soil hover:border-earth-olive/30"
                      }`}
                      key={toneOption.value}
                      onClick={() => handleToneChange(toneOption.value)}
                      type="button"
                    >
                      {t(toneOption.key)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 rounded-2xl border border-earth-clay/10 bg-[#f8efe4] p-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-normal text-earth-clay">
                    {t("draft.quickPrompts")}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-stone-600">
                    {t("draft.optionalPromptHelper")}
                  </p>
                </div>
                {questions.advanced.length > 0 && (
                  <button
                    className="w-fit text-xs font-semibold text-earth-olive transition hover:text-earth-clay"
                    onClick={() => setAdvancedOpen((currentValue) => !currentValue)}
                    type="button"
                  >
                    {advancedOpen ? t("draft.lessGuidance") : t("draft.moreGuidance")}
                  </button>
                )}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {renderPrompts(questions.primary)}
              </div>

              {advancedOpen && questions.advanced.length > 0 && (
                <div className="mt-4 border-t border-earth-clay/10 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-normal text-earth-clay">
                    {t("draft.additionalContext")}
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {renderPrompts(questions.advanced)}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                className="rounded-full bg-earth-soil px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-700"
                onClick={draft ? handleRegenerate : handleGenerate}
                type="button"
              >
                {draft ? t("draft.regenerate") : t("draft.generate")}
              </button>
              {draft && (
                <button
                  className="rounded-full border border-earth-soil/20 px-5 py-2.5 text-sm font-semibold text-earth-soil transition hover:border-earth-clay hover:text-earth-clay"
                  onClick={handleClearDraft}
                  type="button"
                >
                  {t("draft.clear")}
                </button>
              )}
            </div>

            {draft && (
              <div className="mt-5 rounded-2xl border border-earth-olive/20 bg-[#eef4e6] p-4">
                <label className="text-xs font-semibold uppercase tracking-normal text-earth-olive">
                  {t("draft.editable")}
                </label>
                <textarea
                  className="mt-2 min-h-32 w-full resize-y rounded-2xl border border-earth-olive/20 bg-white px-4 py-3 text-sm leading-6 text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
                  onChange={(event) => setDraft(event.target.value)}
                  ref={draftTextareaRef}
                  value={draft}
                />
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <button
                    className="rounded-full bg-earth-clay px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#9f6141]"
                    onClick={handleUseDraft}
                    type="button"
                  >
                    {t("draft.use")}
                  </button>
                  <button
                    className="rounded-full border border-earth-soil/20 px-5 py-2 text-sm font-semibold text-earth-soil transition hover:border-earth-clay hover:text-earth-clay"
                    onClick={handleEditDraft}
                    type="button"
                  >
                    {t("draft.edit")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GuidedDraftingAssistant;
