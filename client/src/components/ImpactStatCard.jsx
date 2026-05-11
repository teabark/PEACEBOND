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
    <article className="rounded-3xl border border-earth-clay/15 bg-[#fffdf8] p-6 shadow-lg shadow-earth-soil/10 transition duration-200 hover:-translate-y-0.5 hover:border-earth-olive/20 hover:shadow-xl hover:shadow-earth-soil/10">
      <p className="text-xs font-semibold uppercase tracking-normal text-earth-clay/90">{label}</p>
      <p className="mt-5 text-4xl font-semibold leading-none text-earth-soil">{displayValue}</p>
    </article>
  );
}

export default ImpactStatCard;
