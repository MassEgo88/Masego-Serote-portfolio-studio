import { jsPDF } from "jspdf";
import { coverLetter, COVER_LETTER_BASENAME } from "./coverLetterData";

export const COVER_LETTER_FILENAME = `${COVER_LETTER_BASENAME}.pdf`;

function buildDoc(): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  doc.setProperties({
    title: `${coverLetter.name} - Data Analyst Cover Letter`,
    subject: "Cover Letter",
    author: coverLetter.name,
    keywords: "Data Analyst, Cover Letter, SQL, Excel, Power BI, Looker Studio",
    creator: coverLetter.name,
  });

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 54;
  const contentW = pageW - marginX * 2;
  let y = 56;

  doc.setTextColor(0, 0, 0);

  const ensure = (needed: number) => {
    if (y + needed > pageH - 48) {
      doc.addPage();
      y = 56;
    }
  };

  const line = (
    str: string,
    opts: { bold?: boolean; size?: number; gap?: number } = {},
  ) => {
    const { bold = false, size = 10.5, gap = 14 } = opts;
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(str, contentW) as string[];
    lines.forEach((ln) => {
      ensure(gap);
      doc.text(ln, marginX, y);
      y += gap;
    });
  };

  // Sender block
  line(coverLetter.name, { bold: true, size: 14 });
  line(coverLetter.title, { size: 11 });
  line(coverLetter.location);
  line(`Email: ${coverLetter.email} | Phone: ${coverLetter.phone}`);
  line(`LinkedIn: ${coverLetter.linkedin}`);
  line(`GitHub: ${coverLetter.github}`);
  y += 8;

  // Date
  line(coverLetter.date);
  y += 6;

  // Recipient
  line(coverLetter.recipient.name);
  line(coverLetter.recipient.company);
  line(coverLetter.recipient.address);
  y += 10;

  // Subject
  line(`Subject: ${coverLetter.subject}`, { bold: true });
  y += 6;

  // Greeting
  line(coverLetter.greeting);
  y += 6;

  // Body
  coverLetter.paragraphs.forEach((p) => {
    line(p);
    y += 8;
  });

  // Closing
  line(coverLetter.closing);
  y += 24;
  line(coverLetter.name, { bold: true });

  return doc;
}

export function generateCoverLetterPDF() {
  buildDoc().save(COVER_LETTER_FILENAME);
}

export function generateCoverLetterBlobUrl(): string {
  const blob = buildDoc().output("blob");
  return URL.createObjectURL(blob);
}
