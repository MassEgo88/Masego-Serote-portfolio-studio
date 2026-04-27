export function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-40 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-6">
          06 — Let's connect
        </p>
        <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight max-w-4xl text-balance">
          Have a dataset that
          <br />
          deserves a <em className="italic text-primary font-light">story?</em>
        </h2>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">
          I'm open to entry-level data analyst roles, internships and project
          collaborations. Let's turn questions into clarity.
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-px bg-border rounded-sm overflow-hidden max-w-3xl">
          <a
            href="mailto:msgpl117@gmail.com"
            className="bg-background hover:bg-card transition-colors p-8 group"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
            <p className="font-display text-2xl mt-2 group-hover:text-primary transition-colors">
              msgpl117@gmail.com
            </p>
          </a>
          <a
            href="tel:+27630935634"
            className="bg-background hover:bg-card transition-colors p-8 group"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Phone</p>
            <p className="font-display text-2xl mt-2 group-hover:text-primary transition-colors">
              063 093 5634
            </p>
          </a>
          <a
            href="https://www.linkedin.com/in/masego-peele-serote-16476a95"
            target="_blank"
            rel="noreferrer noopener"
            className="bg-background hover:bg-card transition-colors p-8 group"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground">LinkedIn</p>
            <p className="font-display text-2xl mt-2 group-hover:text-primary transition-colors">
              /in/masego-peele-serote ↗
            </p>
          </a>
          <a
            href="https://github.com/MassEgo88"
            target="_blank"
            rel="noreferrer noopener"
            className="bg-background hover:bg-card transition-colors p-8 group"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground">GitHub</p>
            <p className="font-display text-2xl mt-2 group-hover:text-primary transition-colors">
              @MassEgo88 ↗
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Masego Serote. Crafted with care.</p>
        <p className="font-display italic">Data, with clarity.</p>
      </div>
    </footer>
  );
}
