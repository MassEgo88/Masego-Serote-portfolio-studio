import { useState } from "react";
import portrait from "@/assets/masego.jpeg";
import { ResumePreviewModal } from "./ResumePreviewModal";

export function Hero() {
  const [previewOpen, setPreviewOpen] = useState(false);
  return (
    <>
    <section id="top" className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-7 reveal">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8">
            <span className="h-px w-10 bg-primary" />
            Data Analyst · Johannesburg, ZA
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight text-balance">
            Turning raw data
            <br />
            into <em className="italic text-primary font-light">decisions</em> that
            <br />
            move business.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            I'm <span className="text-foreground">Masego Serote</span> — an aspiring data
            analyst building dashboards, cleaning messy datasets, and uncovering the
            stories behind the numbers with SQL, Excel and modern BI tools.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition"
            >
              View projects
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-full text-sm hover:bg-secondary transition"
            >
              Get in touch
            </a>
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="group inline-flex items-center gap-2 border border-primary/40 text-foreground px-6 py-3 rounded-full text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition"
              aria-label="Preview Masego Serote resume"
            >
              Preview Resume
              <span className="transition-transform group-hover:translate-y-0.5">↓</span>
            </button>
          </div>

          <dl className="mt-16 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { k: "9K+", v: "Users analysed" },
              { k: "91K+", v: "Records processed" },
              { k: "3+", v: "Live case studies" },
            ].map((s) => (
              <div key={s.v} className="border-t border-border pt-4">
                <dt className="font-display text-3xl text-primary">{s.k}</dt>
                <dd className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5 reveal" style={{ animationDelay: "0.15s" }}>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border">
              <img
                src={portrait}
                alt="Portrait of Masego Serote, Data Analyst"
                className="h-full w-full object-cover grayscale-[15%] contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border px-5 py-4 rounded-sm max-w-[220px]">
              <p className="font-display text-sm leading-snug">
                "Data with curiosity, delivered with clarity."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ResumePreviewModal open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </>
  );
}
