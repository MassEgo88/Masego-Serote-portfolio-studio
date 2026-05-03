import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  ExternalHyperlink,
} from "docx";
import { coverLetter, COVER_LETTER_BASENAME } from "./coverLetterData";

export const COVER_LETTER_DOCX_FILENAME = `${COVER_LETTER_BASENAME}.docx`;

const para = (text: string, opts: { bold?: boolean; size?: number } = {}) =>
  new Paragraph({
    children: [
      new TextRun({
        text,
        bold: opts.bold ?? false,
        size: opts.size ?? 22,
        font: "Calibri",
      }),
    ],
  });

const spacer = () => new Paragraph({ children: [new TextRun({ text: "" })] });

function buildDoc(): Document {
  const children: Paragraph[] = [];

  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({ text: coverLetter.name, bold: true, size: 32, font: "Calibri" }),
      ],
    }),
    para(coverLetter.title, { size: 24 }),
    para(coverLetter.location),
    para(`Email: ${coverLetter.email} | Phone: ${coverLetter.phone}`),
    new Paragraph({
      children: [
        new TextRun({ text: "LinkedIn: ", size: 22, font: "Calibri" }),
        new ExternalHyperlink({
          link: coverLetter.linkedin,
          children: [
            new TextRun({
              text: coverLetter.linkedin,
              size: 22,
              font: "Calibri",
              style: "Hyperlink",
            }),
          ],
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "GitHub: ", size: 22, font: "Calibri" }),
        new ExternalHyperlink({
          link: coverLetter.github,
          children: [
            new TextRun({
              text: coverLetter.github,
              size: 22,
              font: "Calibri",
              style: "Hyperlink",
            }),
          ],
        }),
      ],
    }),
    spacer(),
    para(coverLetter.date),
    spacer(),
    para(coverLetter.recipient.name),
    para(coverLetter.recipient.company),
    para(coverLetter.recipient.address),
    spacer(),
    para(`Subject: ${coverLetter.subject}`, { bold: true }),
    spacer(),
    para(coverLetter.greeting),
    spacer(),
  );

  coverLetter.paragraphs.forEach((p) => {
    children.push(para(p));
    children.push(spacer());
  });

  children.push(para(coverLetter.closing));
  children.push(spacer());
  children.push(spacer());
  children.push(para(coverLetter.name, { bold: true }));

  return new Document({
    creator: coverLetter.name,
    title: `${coverLetter.name} - Cover Letter`,
    description: "ATS-friendly cover letter",
    styles: {
      default: { document: { run: { font: "Calibri", size: 22 } } },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
          },
        },
        children,
      },
    ],
  });
}

export async function generateCoverLetterDocxBlobUrl(): Promise<string> {
  const blob = await Packer.toBlob(buildDoc());
  return URL.createObjectURL(blob);
}

export async function downloadCoverLetterDocx() {
  const blob = await Packer.toBlob(buildDoc());
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = COVER_LETTER_DOCX_FILENAME;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
