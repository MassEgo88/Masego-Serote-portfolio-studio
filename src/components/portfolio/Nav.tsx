import { useEffect, useState } from "react";
import { ResumePreviewModal } from "./ResumePreviewModal";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md bg-background/70 border-b border-border" : ""
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-12 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <span className="font-display text-xl tracking-tight">
            Masego<span className="text-primary">.</span>
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-foreground transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
          >
            Resume ↓
          </button>
          <a
            href="mailto:msgpl117@gmail.com"
            className="inline-flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            Hire me
          </a>
        </div>
      </nav>
    </header>
    <ResumePreviewModal open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </>
  );
}
