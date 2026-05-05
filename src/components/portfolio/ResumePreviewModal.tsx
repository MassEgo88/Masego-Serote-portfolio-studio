import { useEffect, useState } from "react";
import { generateResumePDF } from "@/lib/generateResume";
import { downloadResumeDocx } from "@/lib/generateResumeDocx";
import { downloadResumeTxt } from "@/lib/generateResumeTxt";
import { generateCoverLetterPDF } from "@/lib/generateCoverLetter";
import { downloadCoverLetterDocx } from "@/lib/generateCoverLetterDocx";
import { downloadCoverLetterTxt } from "@/lib/generateCoverLetterTxt";
import { resume } from "@/lib/resumeData";
import { coverLetter } from "@/lib/coverLetterData";

interface ResumePreviewModalProps {
  open: boolean;
  onClose: () => void;
}

type DocTab = "resume" | "cover";

export function ResumePreviewModal({ open, onClose }: ResumePreviewModalProps) {
  const [tab, setTab] = useState<DocTab>("resume");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const isResume = tab === "resume";
  const title = isResume
    ? "Masego Serote — Data Analyst CV"
    : "Masego Serote — Cover Letter";

  const onPdf = () => (isResume ? generateResumePDF() : generateCoverLetterPDF());
  const onDocx = () => (isResume ? downloadResumeDocx() : downloadCoverLetterDocx());
  const onTxt = () => (isResume ? downloadResumeTxt() : downloadCoverLetterTxt());

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-background/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Document preview"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[90vh] bg-card border border-border rounded-sm shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-3 px-5 py-3 border-b border-border bg-card sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Preview
            </p>
            <h3 className="font-display text-lg leading-tight">{title}</h3>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onPdf}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm px-4 py-2 rounded-full hover:opacity-90 transition"
            >
              PDF ↓
            </button>
            <button
              type="button"
              onClick={onDocx}
              className="inline-flex items-center gap-2 border border-border text-sm px-4 py-2 rounded-full hover:bg-secondary transition"
            >
              DOCX ↓
            </button>
            <button
              type="button"
              onClick={onTxt}
              className="inline-flex items-center gap-2 border border-border text-sm px-4 py-2 rounded-full hover:bg-secondary transition"
            >
              TXT ↓
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition"
            >
              ✕
            </button>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Document type"
          className="flex items-center gap-1 px-5 pt-3 border-b border-border bg-card"
        >
          {(
            [
              { id: "resume", label: "Resume" },
              { id: "cover", label: "Cover Letter" },
            ] as const
          ).map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 text-sm rounded-t-sm border-b-2 -mb-px transition ${
                  active
                    ? "border-primary text-foreground font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-auto bg-muted p-4 sm:p-8">
          <div className="mx-auto max-w-3xl bg-white text-black rounded-sm shadow-md p-8 sm:p-12 font-sans text-[13px] leading-relaxed">
            {isResume ? <ResumeBody /> : <CoverLetterBody />}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-6 mb-2 text-[12px] font-bold uppercase tracking-[0.12em] border-b border-gray-300 pb-1">
      {children}
    </h2>
  );
}

function ResumeBody() {
  return (
    <div>
      <h1 className="text-2xl font-bold leading-tight">{resume.name}</h1>
      <p className="text-sm font-medium">{resume.title}</p>
      <p className="text-[12px] text-gray-700 mt-1">{resume.location}</p>
      <p className="text-[12px] text-gray-700">
        Email: {resume.email} | Phone: {resume.phone}
      </p>
      <p className="text-[12px] text-gray-700 break-all">LinkedIn: {resume.linkedin}</p>
      <p className="text-[12px] text-gray-700 break-all">GitHub: {resume.github}</p>

      <SectionHeading>Summary</SectionHeading>
      <p>{resume.summary}</p>

      <SectionHeading>Skills</SectionHeading>
      <ul className="space-y-1">
        {resume.skills.map((s) => (
          <li key={s.group}>
            <span className="font-semibold">{s.group}:</span> {s.items}
          </li>
        ))}
      </ul>

      <SectionHeading>Professional Experience</SectionHeading>
      {resume.experience.map((r) => (
        <div key={`${r.title}-${r.org}`} className="mb-3">
          <p className="font-semibold">
            {r.title}, {r.org} — {r.location}
          </p>
          <p className="text-[12px] text-gray-600 italic">{r.period}</p>
          <ul className="list-disc pl-5 mt-1 space-y-0.5">
            {r.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ))}

      <SectionHeading>Projects</SectionHeading>
      {resume.projects.map((p) => (
        <div key={p.title} className="mb-3">
          <p className="font-semibold">{p.title}</p>
          <p className="text-[12px] text-gray-600">
            Tools: {p.tools} · <span className="break-all">{p.url}</span>
          </p>
          <ul className="list-disc pl-5 mt-1 space-y-0.5">
            {p.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ))}

      <SectionHeading>Education</SectionHeading>
      <ul className="space-y-0.5">
        {resume.education.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>

      <SectionHeading>Certifications</SectionHeading>
      <ul className="list-disc pl-5 space-y-0.5">
        {resume.certifications.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>

      <SectionHeading>Languages</SectionHeading>
      <p>{resume.languages}</p>
    </div>
  );
}

function CoverLetterBody() {
  return (
    <div>
      <h1 className="text-2xl font-bold leading-tight">{coverLetter.name}</h1>
      <p className="text-sm font-medium">{coverLetter.title}</p>
      <p className="text-[12px] text-gray-700 mt-1">{coverLetter.location}</p>
      <p className="text-[12px] text-gray-700">
        Email: {coverLetter.email} | Phone: {coverLetter.phone}
      </p>
      <p className="text-[12px] text-gray-700 break-all">
        LinkedIn: {coverLetter.linkedin}
      </p>
      <p className="text-[12px] text-gray-700 break-all">GitHub: {coverLetter.github}</p>

      <p className="mt-6">{coverLetter.date}</p>

      <div className="mt-4">
        <p>{coverLetter.recipient.name}</p>
        <p>{coverLetter.recipient.company}</p>
        <p>{coverLetter.recipient.address}</p>
      </div>

      <p className="mt-4 font-semibold">Subject: {coverLetter.subject}</p>
      <p className="mt-4">{coverLetter.greeting}</p>

      <div className="mt-4 space-y-3">
        {coverLetter.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <p className="mt-6">{coverLetter.closing}</p>
      <p className="mt-6 font-semibold">{coverLetter.name}</p>
    </div>
  );
}
