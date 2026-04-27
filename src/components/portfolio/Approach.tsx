const steps = [
  { n: "I", t: "Understand", d: "Frame the business question and the decision it serves." },
  { n: "II", t: "Clean", d: "Structure raw data — handle nulls, duplicates and outliers." },
  { n: "III", t: "Explore", d: "Surface trends, segments and patterns worth acting on." },
  { n: "IV", t: "Visualise", d: "Build clear dashboards that track meaningful KPIs." },
  { n: "V", t: "Recommend", d: "Translate findings into actions stakeholders can ship." },
];

export function Approach() {
  return (
    <section className="py-24 lg:py-32 border-t border-border relative grain">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative">
        <div className="max-w-2xl mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">
            05 — Approach
          </p>
          <h2 className="font-display text-4xl lg:text-5xl leading-tight">
            Logic and creativity, in five movements.
          </h2>
        </div>

        <ol className="grid md:grid-cols-5 gap-px bg-border rounded-sm overflow-hidden">
          {steps.map((s) => (
            <li key={s.n} className="bg-background p-6 lg:p-8">
              <p className="font-display text-primary text-2xl">{s.n}</p>
              <p className="font-display text-xl mt-3">{s.t}</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
