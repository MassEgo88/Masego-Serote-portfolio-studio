import { ContactForm } from "./ContactForm";
import { NewsletterForm } from "./NewsletterForm";
import { RecruiterQuickActions } from "./RecruiterQuickActions";
import { contactConfig } from "@/lib/contactConfig";

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

        <div className="mt-12">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
            Quick actions for recruiters
          </p>
          <RecruiterQuickActions />
        </div>

        <div className="mt-16 grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
              Or send a detailed message
            </p>
            <ContactForm />
          </div>

          <aside className="lg:col-span-2 space-y-px bg-border rounded-sm overflow-hidden">
            <a
              href={`mailto:${contactConfig.email}`}
              className="block bg-background hover:bg-card transition-colors p-6 group"
            >
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
              <p className="font-display text-xl mt-1 group-hover:text-primary transition-colors break-all">
                {contactConfig.email}
              </p>
            </a>
            <a
              href={`tel:${contactConfig.phone}`}
              className="block bg-background hover:bg-card transition-colors p-6 group"
            >
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Phone</p>
              <p className="font-display text-xl mt-1 group-hover:text-primary transition-colors">
                063 093 5634
              </p>
            </a>
            <a
              href={contactConfig.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="block bg-background hover:bg-card transition-colors p-6 group"
            >
              <p className="text-xs uppercase tracking-wider text-muted-foreground">LinkedIn</p>
              <p className="font-display text-xl mt-1 group-hover:text-primary transition-colors">
                /in/masego-peele-serote ↗
              </p>
            </a>
            <a
              href={contactConfig.github}
              target="_blank"
              rel="noreferrer noopener"
              className="block bg-background hover:bg-card transition-colors p-6 group"
            >
              <p className="text-xs uppercase tracking-wider text-muted-foreground">GitHub</p>
              <p className="font-display text-xl mt-1 group-hover:text-primary transition-colors">
                @MassEgo88 ↗
              </p>
            </a>
          </aside>
        </div>

        <div id="newsletter" className="mt-24 border-t border-border pt-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">
                Stay in the loop
              </p>
              <h3 className="font-display text-3xl sm:text-4xl leading-tight">
                Occasional notes on data, dashboards & what I'm learning.
              </h3>
              <p className="mt-3 text-muted-foreground max-w-md text-sm">
                No spam — just a short update when I publish a new case study or insight.
                Unsubscribe anytime.
              </p>
            </div>
            <NewsletterForm source="contact-section" variant="inline" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 grid gap-10 lg:grid-cols-3 items-start">
        <div className="lg:col-span-1">
          <p className="font-display italic text-lg">Data, with clarity.</p>
          <p className="mt-2 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Masego Serote. Crafted with care.
          </p>
        </div>
        <div className="lg:col-span-2">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Newsletter
          </p>
          <NewsletterForm source="footer" variant="inline" />
        </div>
      </div>
    </footer>
  );
}
