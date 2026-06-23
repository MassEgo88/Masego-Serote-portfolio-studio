const projects = [
  {
    n: "01",
    title: "Data Warehouse Pipeline — Bronze to Gold with EDA",
    tag: "SQL · Python · Data Warehouse · EDA",
    summary:
      "Built an end-to-end data warehouse pipeline implementing bronze (raw ingestion), silver (cleansed/transformed), and gold (analysis-ready) layers. Performed exploratory data analysis at each stage to validate quality and produce insights-ready datasets.",
    metrics: [
      { k: "Bronze → Silver → Gold", v: "3 Layers" },
      { k: "EDA + Quality", v: "Validated" },
      { k: "BI-Ready", v: "Gold Tables" },
    ],
    link: "https://github.com/MassEgo88",
  },
  {
    n: "02",
    title: "Bright TV — Consumption Analysis & Growth Strategy",
    tag: "SQL · Dashboards · Retention",
    summary:
      "Analysed ~9K users and 91K+ consumption records to surface engagement drivers and recommend retention strategies.",
    metrics: [
      { k: "9K+", v: "Users" },
      { k: "91K+", v: "Records" },
      { k: "Top 20%", v: "Drives consumption" },
    ],
    link: "https://github.com/MassEgo88/Bright-TV-Case-Study",
  },
  {
    n: "03",
    title: "Bright Coffee Shop — Sales & Customer Insights",
    tag: "SQL · Excel · Behavioural Analysis",
    summary:
      "Cleaned and structured sales transactions to identify top-selling products, peak periods and customer trends.",
    metrics: [
      { k: "Top SKUs", v: "Identified" },
      { k: "Peak hours", v: "Mapped" },
      { k: "↑ Revenue", v: "Recommendations" },
    ],
    link: "https://github.com/MassEgo88",
  },
  {
    n: "04",
    title: "Bright Car Sales — Vehicle Sales Data Analysis",
    tag: "Data Cleaning · Pricing · Demand",
    summary:
      "Evaluated price, condition, mileage and location to expose pricing trends and key factors influencing sales performance.",
    metrics: [
      { k: "Price", v: "Trends" },
      { k: "Demand", v: "Patterns" },
      { k: "Inventory", v: "Strategy" },
    ],
    link: "https://github.com/MassEgo88",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">
              03 — Selected Work
            </p>
            <h2 className="font-display text-4xl lg:text-5xl max-w-2xl leading-tight">
              Case studies, end‑to‑end.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            From raw extract to recommendation — each project shows the full analytical lifecycle.
          </p>
        </div>

        <div className="space-y-px bg-border rounded-sm overflow-hidden">
          {projects.map((p) => (
            <article
              key={p.n}
              className="group bg-background hover:bg-card transition-colors p-8 lg:p-12 grid lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-1 font-display text-3xl text-primary">
                {p.n}
              </div>
              <div className="lg:col-span-6">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  {p.tag}
                </p>
                <h3 className="font-display text-2xl lg:text-3xl leading-tight mb-4 text-balance">
                  {p.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-xl">
                  {p.summary}
                </p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 mt-6 text-sm gold-underline text-foreground"
                >
                  View on GitHub
                  <span className="transition-transform group-hover:translate-x-1">↗</span>
                </a>
              </div>
              <div className="lg:col-span-5 grid grid-cols-3 gap-4">
                {p.metrics.map((m) => (
                  <div key={m.v} className="border border-border p-4 rounded-sm">
                    <p className="font-display text-xl lg:text-2xl text-primary">{m.k}</p>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">
                      {m.v}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
