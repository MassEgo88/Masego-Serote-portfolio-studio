import { resume, RESUME_BASENAME } from "./resumeData";

export const RESUME_TXT_FILENAME = `${RESUME_BASENAME}.txt`;

export function buildResumeText(): string {
  const L: string[] = [];
  const hr = () => L.push("");
  const heading = (s: string) => {
    L.push("");
    L.push(s.toUpperCase());
    L.push("=".repeat(s.length));
  };

  L.push(resume.name);
  L.push(resume.title);
  L.push(resume.location);
  L.push(`Email: ${resume.email} | Phone: ${resume.phone}`);
  L.push(`LinkedIn: ${resume.linkedin}`);
  L.push(`GitHub: ${resume.github}`);

  heading("Summary");
  L.push(resume.summary);

  heading("Skills");
  resume.skills.forEach((s) => L.push(`${s.group}: ${s.items}`));

  heading("Professional Experience");
  resume.experience.forEach((r) => {
    hr();
    L.push(`${r.title}, ${r.org} - ${r.location}`);
    L.push(r.period);
    r.bullets.forEach((b) => L.push(`- ${b}`));
  });

  heading("Projects");
  resume.projects.forEach((p) => {
    hr();
    L.push(p.title);
    L.push(`Tools: ${p.tools}`);
    L.push(`Link: ${p.url}`);
    p.bullets.forEach((b) => L.push(`- ${b}`));
  });

  heading("Education");
  resume.education.forEach((e) => L.push(e));

  heading("Certifications");
  resume.certifications.forEach((c) => L.push(`- ${c}`));

  heading("Languages");
  L.push(resume.languages);

  return L.join("\n") + "\n";
}

export function generateResumeTxtBlobUrl(): string {
  const blob = new Blob([buildResumeText()], { type: "text/plain;charset=utf-8" });
  return URL.createObjectURL(blob);
}

export function downloadResumeTxt() {
  const blob = new Blob([buildResumeText()], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = RESUME_TXT_FILENAME;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
