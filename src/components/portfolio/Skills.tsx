const groups = [
  {
    title: "Data Analysis",
    items: ["SQL", "Excel · Pivot Tables", "Data Cleaning", "Aggregation & Summarization", "Validation"],
  },
  {
    title: "Visualization & Reporting",
    items: ["Dashboard Creation", "Data Storytelling", "KPI Tracking", "Recruiter-ready Reports"],
  },
  {
    title: "Tools & Platforms",
    items: ["Databricks", "Google BigQuery", "Looker Studio", "Power BI", "Miro", "Canva"],
  },
  {
    title: "Programming & Other",
    items: ["SQL", "Python (Basic)", "Database Management", "Data Entry & Reporting"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">
              02 — Toolkit
            </p>
            <h2 className="font-display text-4xl lg:text-5xl max-w-xl leading-tight">
              The instruments behind the insight.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            A practical stack tuned for cleaning, modelling and communicating data clearly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-sm overflow-hidden">
          {groups.map((g, i) => (
            <div
              key={g.title}
              className="bg-background p-8 hover:bg-card transition-colors group"
            >
              <div className="flex items-baseline justify-between mb-6">
                <h3 className="font-display text-xl">{g.title}</h3>
                <span className="text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <ul className="space-y-3 text-sm">
                {g.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                    <span className="text-primary mt-1.5 text-[8px]">●</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
