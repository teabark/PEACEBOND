function formatSentAt(value) {
  return new Date(value).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function MockWhatsAppNotice({ message, name, phoneNumber, sentAt }) {
  return (
    <section className="rounded-lg border border-earth-olive/30 bg-earth-sand/70 p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-earth-olive">
            Mock WhatsApp Sent
          </p>
          <p className="mt-1 text-sm text-stone-600">
            A dignified update was prepared for the reintegration journey.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-earth-olive">
          Sent <span aria-hidden="true">&#10003;</span>
        </span>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-stone-700 sm:grid-cols-2">
        <p>
          <span className="font-semibold text-earth-soil">Rehabilitatee:</span> {name}
        </p>
        <p>
          <span className="font-semibold text-earth-soil">Phone:</span>{" "}
          {phoneNumber || "No phone number recorded"}
        </p>
        <p>
          <span className="font-semibold text-earth-soil">Sent:</span> {formatSentAt(sentAt)}
        </p>
      </div>

      <div className="mt-4 rounded-lg border border-white/80 bg-white/75 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-earth-clay">
          Message preview
        </p>
        <p className="mt-2 text-sm leading-6 text-earth-soil">{message}</p>
      </div>
    </section>
  );
}

export default MockWhatsAppNotice;
