const tools = [
  "SQL", "Excel", "Power BI", "Looker Studio", "BigQuery",
  "Databricks", "Python", "Miro", "Canva", "Pivot Tables",
];

export function Marquee() {
  return (
    <section className="border-y border-border py-8 overflow-hidden">
      <div className="flex marquee-track whitespace-nowrap">
        {[...tools, ...tools].map((t, i) => (
          <span
            key={i}
            className="font-display text-3xl md:text-4xl mx-8 text-muted-foreground"
          >
            {t}
            <span className="text-primary mx-8">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
