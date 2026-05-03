import { useEffect, useState } from "react";
import { generateResumeBlobUrl, generateResumePDF } from "@/lib/generateResume";
import { downloadResumeDocx } from "@/lib/generateResumeDocx";
import { downloadResumeTxt } from "@/lib/generateResumeTxt";
import {
  generateCoverLetterBlobUrl,
  generateCoverLetterPDF,
} from "@/lib/generateCoverLetter";
import { downloadCoverLetterDocx } from "@/lib/generateCoverLetterDocx";
import { downloadCoverLetterTxt } from "@/lib/generateCoverLetterTxt";

interface ResumePreviewModalProps {
  open: boolean;
  onClose: () => void;
}

type DocTab = "resume" | "cover";

export function ResumePreviewModal({ open, onClose }: ResumePreviewModalProps) {
  const [tab, setTab] = useState<DocTab>("resume");
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (!open) return;
    const blobUrl =
      tab === "resume" ? generateResumeBlobUrl() : generateCoverLetterBlobUrl();
    setUrl(blobUrl);
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      setUrl("");
    };
  }, [open, tab]);

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

        <div className="flex-1 bg-muted">
          {url ? (
            <iframe
              src={`${url}#view=FitH`}
              title={`${tab} PDF preview`}
              className="w-full h-full border-0"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
              Generating preview…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
