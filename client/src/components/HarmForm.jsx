import { useState } from "react";
import GuidedDraftingAssistant from "./GuidedDraftingAssistant.jsx";
import { useI18n } from "./LanguageProvider.jsx";

function HarmForm({ error, isGenerating, onGenerate }) {
  const { t } = useI18n();
  const [fighterName, setFighterName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [communityType, setCommunityType] = useState("Rural village");
  const [protectedIdentity, setProtectedIdentity] = useState(false);
  const [skills, setSkills] = useState("");
  const [severity, setSeverity] = useState("moderate");
  const [harmDescription, setHarmDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onGenerate({
      communityType,
      fighterName,
      harmDescription,
      nationality,
      phoneNumber,
      protectedIdentity,
      severity,
      skills,
    });
  }

  return (
    <section className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm sm:p-6">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-sm font-semibold text-earth-soil" htmlFor="fighter-name">
              {t("form.fighterName")}
            </label>
            <input
              className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-base text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
              id="fighter-name"
              onChange={(event) => setFighterName(event.target.value)}
              placeholder={t("form.placeholderName")}
              type="text"
              value={fighterName}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-earth-soil" htmlFor="phone-number">
              {t("form.phoneNumber")}
            </label>
            <input
              className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-base text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
              id="phone-number"
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder={t("form.placeholderPhone")}
              type="tel"
              value={phoneNumber}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-earth-soil" htmlFor="nationality">
              {t("form.nationality")}
            </label>
            <input
              className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-base text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
              id="nationality"
              onChange={(event) => setNationality(event.target.value)}
              placeholder={t("form.placeholderNationality")}
              type="text"
              value={nationality}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-sm font-semibold text-earth-soil" htmlFor="community-type">
              {t("form.communityType")}
            </label>
            <select
              className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-base text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
              id="community-type"
              onChange={(event) => setCommunityType(event.target.value)}
              value={communityType}
            >
              <option value="Rural village">{t("form.community.rural")}</option>
              <option value="Market town">{t("form.community.market")}</option>
              <option value="Pastoral community">{t("form.community.pastoral")}</option>
              <option value="Border community">{t("form.community.border")}</option>
              <option value="Urban settlement">{t("form.community.urban")}</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-earth-soil" htmlFor="skills">
              {t("form.skills")}
            </label>
            <input
              className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-base text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
              id="skills"
              onChange={(event) => setSkills(event.target.value)}
              placeholder={t("form.placeholderSkills")}
              type="text"
              value={skills}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-earth-soil" htmlFor="severity">
              {t("form.severity")}
            </label>
            <select
              className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-base text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
              id="severity"
              onChange={(event) => setSeverity(event.target.value)}
              value={severity}
            >
              <option value="low">{t("severity.low")}</option>
              <option value="moderate">{t("severity.moderate")}</option>
              <option value="high">{t("severity.high")}</option>
            </select>
            <p className="mt-2 text-xs leading-5 text-stone-500">
              {t("form.severityHelper")}
            </p>
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-earth-olive/20 bg-earth-sand/60 p-4 transition hover:border-earth-olive/40">
          <input
            checked={protectedIdentity}
            className="mt-1 h-5 w-5 rounded border-stone-300 text-earth-olive focus:ring-earth-olive"
            onChange={(event) => setProtectedIdentity(event.target.checked)}
            type="checkbox"
          />
          <span>
            <span className="block text-sm font-semibold text-earth-soil">
              {t("identity.enable")}
            </span>
            <span className="mt-1 block text-sm leading-6 text-stone-600">
              {t("identity.helper")}
            </span>
          </span>
        </label>

        <div>
          <label className="text-sm font-semibold text-earth-soil" htmlFor="harm-description">
            {t("form.harmDescription")}
          </label>
          <textarea
            className="mt-2 min-h-44 w-full resize-y rounded-lg border border-stone-300 bg-white px-4 py-3 text-base leading-7 text-stone-800 shadow-inner outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
            id="harm-description"
            onChange={(event) => setHarmDescription(event.target.value)}
            placeholder={t("form.harmPlaceholder")}
            value={harmDescription}
          />
          <GuidedDraftingAssistant
            context={{
              communityType,
              fighterName,
              nationality,
              severity,
              skills,
            }}
            currentValue={harmDescription}
            fieldType="harmDescription"
            helperText={t("draft.helpHarm")}
            onUseDraft={setHarmDescription}
          />
        </div>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        )}

        <button
          className="rounded-lg bg-earth-soil px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-400"
          disabled={isGenerating}
          type="submit"
        >
          {isGenerating ? t("form.preparing") : t("form.generate")}
        </button>
      </form>
    </section>
  );
}

export default HarmForm;
