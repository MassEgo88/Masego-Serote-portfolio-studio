import { coverLetter, COVER_LETTER_BASENAME } from "./coverLetterData";

export const COVER_LETTER_TXT_FILENAME = `${COVER_LETTER_BASENAME}.txt`;

export function buildCoverLetterText(): string {
  const L: string[] = [];
  L.push(coverLetter.name);
  L.push(coverLetter.title);
  L.push(coverLetter.location);
  L.push(`Email: ${coverLetter.email} | Phone: ${coverLetter.phone}`);
  L.push(`LinkedIn: ${coverLetter.linkedin}`);
  L.push(`GitHub: ${coverLetter.github}`);
  L.push("");
  L.push(coverLetter.date);
  L.push("");
  L.push(coverLetter.recipient.name);
  L.push(coverLetter.recipient.company);
  L.push(coverLetter.recipient.address);
  L.push("");
  L.push(`Subject: ${coverLetter.subject}`);
  L.push("");
  L.push(coverLetter.greeting);
  L.push("");
  coverLetter.paragraphs.forEach((p) => {
    L.push(p);
    L.push("");
  });
  L.push(coverLetter.closing);
  L.push("");
  L.push(coverLetter.name);
  return L.join("\n") + "\n";
}

export function downloadCoverLetterTxt() {
  const blob = new Blob([buildCoverLetterText()], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = COVER_LETTER_TXT_FILENAME;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
