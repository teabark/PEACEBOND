import { useState } from "react";

function HarmForm({ error, isGenerating, onGenerate }) {
  const [fighterName, setFighterName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [communityType, setCommunityType] = useState("Rural village");
  const [skills, setSkills] = useState("");
  const [severity, setSeverity] = useState("moderate");
  const [harmDescription, setHarmDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onGenerate({
      communityType,
      fighterName,
      harmDescription,
      phoneNumber,
      severity,
      skills,
    });
  }

  return (
    <section className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm sm:p-6">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-earth-soil" htmlFor="fighter-name">
              Rehabilitatee name
            </label>
            <input
              className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-base text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
              id="fighter-name"
              onChange={(event) => setFighterName(event.target.value)}
              placeholder="Example: Daniel A."
              type="text"
              value={fighterName}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-earth-soil" htmlFor="phone-number">
              Phone number
            </label>
            <input
              className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-base text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
              id="phone-number"
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="Example: +254 700 000 000"
              type="tel"
              value={phoneNumber}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-sm font-semibold text-earth-soil" htmlFor="community-type">
              Community type
            </label>
            <select
              className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-base text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
              id="community-type"
              onChange={(event) => setCommunityType(event.target.value)}
              value={communityType}
            >
              <option>Rural village</option>
              <option>Market town</option>
              <option>Pastoral community</option>
              <option>Border community</option>
              <option>Urban settlement</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-earth-soil" htmlFor="skills">
              Skills
            </label>
            <input
              className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-base text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
              id="skills"
              onChange={(event) => setSkills(event.target.value)}
              placeholder="Farming, carpentry"
              type="text"
              value={skills}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-earth-soil" htmlFor="severity">
              Case severity
            </label>
            <select
              className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-base text-stone-800 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
              id="severity"
              onChange={(event) => setSeverity(event.target.value)}
              value={severity}
            >
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
            <p className="mt-2 text-xs leading-5 text-stone-500">
              Severity determines the depth of repair and support, not punishment.
            </p>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-earth-soil" htmlFor="harm-description">
            Harm description
          </label>
          <textarea
            className="mt-2 min-h-44 w-full resize-y rounded-lg border border-stone-300 bg-white px-4 py-3 text-base leading-7 text-stone-800 shadow-inner outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
            id="harm-description"
            onChange={(event) => setHarmDescription(event.target.value)}
            placeholder="Example: A fight at the market left one family afraid to return."
            value={harmDescription}
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
          {isGenerating ? "Preparing PeaceBond..." : "Generate PeaceBond"}
        </button>
      </form>
    </section>
  );
}

export default HarmForm;
