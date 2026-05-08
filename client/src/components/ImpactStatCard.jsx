import { useEffect, useState } from "react";

function ImpactStatCard({ label, value }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const targetValue = Number(value) || 0;
    const steps = 18;
    const increment = targetValue / steps;
    let currentStep = 0;

    const intervalId = window.setInterval(() => {
      currentStep += 1;
      setDisplayValue(Math.round(increment * currentStep));

      if (currentStep >= steps) {
        setDisplayValue(targetValue);
        window.clearInterval(intervalId);
      }
    }, 28);

    return () => window.clearInterval(intervalId);
  }, [value]);

  return (
    <article className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-earth-soil">{displayValue}</p>
    </article>
  );
}

export default ImpactStatCard;
