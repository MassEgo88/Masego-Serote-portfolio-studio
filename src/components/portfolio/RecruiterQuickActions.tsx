import { useState } from "react";
import { contactConfig, whatsappUrl } from "@/lib/contactConfig";
import { ResumePreviewModal } from "./ResumePreviewModal";

const baseBtn =
  "inline-flex items-center justify-center gap-2 text-sm border border-border px-4 py-3 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors";

export function RecruiterQuickActions() {
  const [resumeOpen, setResumeOpen] = useState(false);
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => setResumeOpen(true)} className={baseBtn}>
          Download Resume ↓
        </button>
        <a href={contactConfig.linkedin} target="_blank" rel="noreferrer noopener" className={baseBtn}>
          LinkedIn ↗
        </a>
        <a href={contactConfig.github} target="_blank" rel="noreferrer noopener" className={baseBtn}>
          GitHub ↗
        </a>
        <a
          href={whatsappUrl(contactConfig.whatsappMeetingMessage)}
          target="_blank"
          rel="noreferrer noopener"
          className={baseBtn}
        >
          Schedule a Meeting
        </a>
        <a href={`mailto:${contactConfig.email}`} className={baseBtn}>
          Send Email
        </a>
      </div>
      <ResumePreviewModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
