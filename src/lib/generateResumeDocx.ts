import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  LevelFormat,
  ExternalHyperlink,
} from "docx";
import { resume, RESUME_BASENAME } from "./resumeData";

export const RESUME_DOCX_FILENAME = `${RESUME_BASENAME}.docx`;

const para = (text: string, opts: { bold?: boolean; size?: number } = {}) =>
  new Paragraph({
    children: [
      new TextRun({ text, bold: opts.bold ?? false, size: opts.size ?? 22, font: "Calibri" }),
    ],
  });

const bullet = (text: string) =>
  new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: [new TextRun({ text, size: 22, font: "Calibri" })],
  });

const sectionHeading = (text: string) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 24, font: "Calibri" })],
  });

function buildDoc(): Document {
  const children: Paragraph[] = [];

  // Header
  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [new TextRun({ text: resume.name, bold: true, size: 36, font: "Calibri" })],
    }),
    para(resume.title, { size: 24 }),
    para(resume.location),
    para(`Email: ${resume.email} | Phone: ${resume.phone}`),
    new Paragraph({
      children: [
        new TextRun({ text: "LinkedIn: ", size: 22, font: "Calibri" }),
        new ExternalHyperlink({
          link: resume.linkedin,
          children: [
            new TextRun({ text: resume.linkedin, size: 22, font: "Calibri", style: "Hyperlink" }),
          ],
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "GitHub: ", size: 22, font: "Calibri" }),
        new ExternalHyperlink({
          link: resume.github,
          children: [
            new TextRun({ text: resume.github, size: 22, font: "Calibri", style: "Hyperlink" }),
          ],
        }),
      ],
    }),
  );

  children.push(sectionHeading("Summary"));
  children.push(para(resume.summary));

  children.push(sectionHeading("Skills"));
  resume.skills.forEach((s) =>
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${s.group}: `, bold: true, size: 22, font: "Calibri" }),
          new TextRun({ text: s.items, size: 22, font: "Calibri" }),
        ],
      }),
    ),
  );

  children.push(sectionHeading("Professional Experience"));
  resume.experience.forEach((r) => {
    children.push(para(`${r.title}, ${r.org} - ${r.location}`, { bold: true }));
    children.push(para(r.period));
    r.bullets.forEach((b) => children.push(bullet(b)));
  });

  children.push(sectionHeading("Projects"));
  resume.projects.forEach((p) => {
    children.push(para(p.title, { bold: true }));
    children.push(para(`Tools: ${p.tools}`));
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "Link: ", size: 22, font: "Calibri" }),
          new ExternalHyperlink({
            link: p.url,
            children: [
              new TextRun({ text: p.url, size: 22, font: "Calibri", style: "Hyperlink" }),
            ],
          }),
        ],
      }),
    );
    p.bullets.forEach((b) => children.push(bullet(b)));
  });

  children.push(sectionHeading("Education"));
  resume.education.forEach((e) => children.push(para(e)));

  children.push(sectionHeading("Certifications"));
  resume.certifications.forEach((c) => children.push(bullet(c)));

  children.push(sectionHeading("Languages"));
  children.push(para(resume.languages));

  return new Document({
    creator: resume.name,
    title: `${resume.name} - ${resume.title} CV`,
    description: "ATS-friendly resume",
    styles: {
      default: { document: { run: { font: "Calibri", size: 22 } } },
    },
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "\u2022",
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 720, hanging: 360 } } },
            },
          ],
        },
      ],
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

export async function generateResumeDocxBlobUrl(): Promise<string> {
  const blob = await Packer.toBlob(buildDoc());
  return URL.createObjectURL(blob);
}

export async function downloadResumeDocx() {
  const blob = await Packer.toBlob(buildDoc());
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = RESUME_DOCX_FILENAME;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
