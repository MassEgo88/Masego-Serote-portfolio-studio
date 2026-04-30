import { useEffect, useState } from "react";
import { generateResumeBlobUrl, generateResumePDF } from "@/lib/generateResume";
import { downloadResumeDocx } from "@/lib/generateResumeDocx";
import { downloadResumeTxt } from "@/lib/generateResumeTxt";

interface ResumePreviewModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResumePreviewModal({ open, onClose }: ResumePreviewModalProps) {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (!open) return;
    const blobUrl = generateResumeBlobUrl();
    setUrl(blobUrl);
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      setUrl("");
    };
  }, [open]);

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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-background/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Resume preview"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[90vh] bg-card border border-border rounded-sm shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-border bg-card">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Preview
            </p>
            <h3 className="font-display text-lg leading-tight">
              Masego Serote — Data Analyst CV
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => generateResumePDF()}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm px-4 py-2 rounded-full hover:opacity-90 transition"
            >
              Download ↓
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
        <div className="flex-1 bg-muted">
          {url ? (
            <iframe
              src={`${url}#view=FitH`}
              title="Resume PDF preview"
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
