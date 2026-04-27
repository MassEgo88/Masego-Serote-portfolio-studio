const roles = [
  {
    role: "Administrator",
    org: "Diet & Nutrigym Center",
    period: "Jun 2023 — Sept 2024",
    bullets: [
      "Managed and maintained client databases and records",
      "Performed data entry, cleaning and validation",
      "Generated reports for operational decision-making",
      "Tracked scheduling and client activity data",
    ],
  },
  {
    role: "Beauty Therapist",
    org: "Dibabes Hair Salon",
    period: "Jan 2022 — Jun 2023",
    bullets: [
      "Managed booking systems and customer records",
      "Maintained accurate scheduling and client data",
      "Improved organisation of business operations",
    ],
  },
  {
    role: "Radio Operator",
    org: "Universal Church (Online Radio)",
    period: "Mar 2021 — Jun 2021",
    bullets: [
      "Managed scheduling and content data",
      "Maintained digital logs and records",
      "Assisted with reporting and content organisation",
    ],
  },
];

const certs = [
  "Full Stack Web Development — IT Varsity (2025)",
  "Relaxation Massage Certificate — Face to Face Beauty School (2021)",
  "Radio & Voice Over Training — Ndovela Communication (2020)",
];

export function Experience() {
  return (
    <section id="experience" className="py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">
            04 — Experience
          </p>
          <h2 className="font-display text-4xl lg:text-5xl leading-tight">
            A path built on records, reporting & rigour.
          </h2>
        </div>

        <div className="lg:col-span-8 space-y-12">
          {roles.map((r) => (
            <div key={r.org} className="grid sm:grid-cols-12 gap-6 hairline pt-8 first:hairline">
              <div className="sm:col-span-4">
                <p className="font-display text-xl">{r.role}</p>
                <p className="text-sm text-primary mt-1">{r.org}</p>
                <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">
                  {r.period}
                </p>
              </div>
              <ul className="sm:col-span-8 space-y-2 text-muted-foreground">
                {r.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="text-primary mt-2 text-[8px]">●</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="hairline pt-8">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Certifications
            </p>
            <ul className="space-y-2">
              {certs.map((c) => (
                <li key={c} className="text-foreground flex gap-3">
                  <span className="text-primary">✦</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
