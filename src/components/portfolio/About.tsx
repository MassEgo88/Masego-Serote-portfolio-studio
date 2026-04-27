export function About() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">
            01 — About
          </p>
          <h2 className="font-display text-4xl lg:text-5xl leading-tight">
            A curious mind for numbers, a creative eye for stories.
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            I'm an aspiring Data Analyst with hands-on experience in data cleaning,
            analysis and visualization. My background in administration taught me the
            discipline of clean records — analytics gave me the tools to turn them
            into <span className="text-foreground">actionable insights</span>.
          </p>
          <p>
            I enjoy the full journey: framing the business question, wrangling raw
            data with SQL and Excel, building dashboards that track the right KPIs,
            and translating findings into recommendations decision-makers can act on.
          </p>
          <div className="pt-6 grid sm:grid-cols-2 gap-6 hairline">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Based in</p>
              <p className="text-foreground mt-1">Johannesburg, South Africa</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Open to</p>
              <p className="text-foreground mt-1">Junior & internship roles</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
