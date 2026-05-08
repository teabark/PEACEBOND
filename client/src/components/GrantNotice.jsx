function GrantNotice({ grant }) {
  return (
    <section className="rounded-lg border border-green-200 bg-green-50 p-5 text-green-950 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-wide">Grant release ready</p>
      <p className="mt-2 text-lg leading-8">
        A mock micro-grant of {grant.currency} {grant.amount} is ready for {grant.purpose}
      </p>
      <p className="mt-3 text-sm leading-6">
        All three repair actions are complete. The community can now acknowledge the repair path
        and download the certificate.
      </p>
    </section>
  );
}

export default GrantNotice;
