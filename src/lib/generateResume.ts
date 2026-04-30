import { jsPDF } from "jspdf";

type Section = { title: string; render: (y: number) => number };

const PRIMARY: [number, number, number] = [156, 124, 56]; // muted gold
const INK: [number, number, number] = [22, 28, 45]; // deep ink
const MUTED: [number, number, number] = [110, 116, 130];
const RULE: [number, number, number] = [210, 205, 195];

export function generateResumePDF() {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 56;
  const contentW = pageW - marginX * 2;
  let y = 64;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageH - 56) {
      doc.addPage();
      y = 64;
    }
  };

  // ===== HEADER =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(...INK);
  doc.text("MASEGO SEROTE", marginX, y);
  y += 22;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...PRIMARY);
  doc.text("Data Analyst  ·  Transforming Data into Insightful Decisions", marginX, y);
  y += 18;

  doc.setTextColor(...MUTED);
  doc.setFontSize(9.5);
  const contactLine =
    "Johannesburg, South Africa  ·  msgpl117@gmail.com  ·  063 093 5634";
  doc.text(contactLine, marginX, y);
  y += 12;

  // Links (clickable)
  const linkedInLabel = "linkedin.com/in/masego-peele-serote-16476a95";
  const githubLabel = "github.com/MassEgo88";
  doc.setTextColor(...PRIMARY);
  doc.textWithLink(linkedInLabel, marginX, y, {
    url: "https://www.linkedin.com/in/masego-peele-serote-16476a95",
  });
  const liWidth = doc.getTextWidth(linkedInLabel);
  doc.setTextColor(...MUTED);
  doc.text("  ·  ", marginX + liWidth, y);
  doc.setTextColor(...PRIMARY);
  doc.textWithLink(githubLabel, marginX + liWidth + 18, y, {
    url: "https://github.com/MassEgo88",
  });
  y += 18;

  // Hairline rule
  doc.setDrawColor(...RULE);
  doc.setLineWidth(0.6);
  doc.line(marginX, y, pageW - marginX, y);
  y += 22;

  // ===== Helpers =====
  const sectionHeading = (label: string) => {
    ensureSpace(36);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...PRIMARY);
    doc.text(label.toUpperCase(), marginX, y);
    y += 6;
    doc.setDrawColor(...RULE);
    doc.line(marginX, y, pageW - marginX, y);
    y += 16;
  };

  const paragraph = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(...INK);
    const lines = doc.splitTextToSize(text, contentW) as string[];
    lines.forEach((ln) => {
      ensureSpace(14);
      doc.text(ln, marginX, y);
      y += 14;
    });
  };

  const bullet = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(...INK);
    const lines = doc.splitTextToSize(text, contentW - 14) as string[];
    lines.forEach((ln, i) => {
      ensureSpace(14);
      if (i === 0) {
        doc.setTextColor(...PRIMARY);
        doc.text("•", marginX, y);
        doc.setTextColor(...INK);
      }
      doc.text(ln, marginX + 14, y);
      y += 13.5;
    });
  };

  const roleHeader = (title: string, org: string, period: string) => {
    ensureSpace(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...INK);
    doc.text(title, marginX, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...MUTED);
    doc.text(period, pageW - marginX, y, { align: "right" });
    y += 13;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(...PRIMARY);
    doc.text(org, marginX, y);
    y += 14;
  };

  // ===== SUMMARY =====
  sectionHeading("Professional Summary");
  paragraph(
    "Aspiring Data Analyst with hands-on experience in data cleaning, analysis and visualisation using SQL, Excel and modern analytics tools. Strong foundation in administrative data handling, transitioning into analytics with three end-to-end case studies covering streaming consumption, retail sales and vehicle pricing. Skilled at turning messy datasets into clear, decision-ready insights."
  );
  y += 6;

  // ===== SKILLS =====
  sectionHeading("Core Skills");
  const skills: [string, string][] = [
    ["Data Analysis", "SQL, Excel & Pivot Tables, Data Cleaning, Aggregation, Validation"],
    ["Visualisation", "Dashboards, Data Storytelling, KPI Tracking, Recruiter-ready Reports"],
    ["Tools", "Databricks, Google BigQuery, Looker Studio, Power BI, Miro, Canva"],
    ["Programming", "SQL, Python (Basic), Database Management, Data Entry & Reporting"],
  ];
  skills.forEach(([k, v]) => {
    ensureSpace(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...INK);
    doc.text(k, marginX, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    const lines = doc.splitTextToSize(v, contentW - 110) as string[];
    lines.forEach((ln, i) => {
      if (i > 0) {
        ensureSpace(14);
        y += 13;
      }
      doc.text(ln, marginX + 110, y);
    });
    y += 16;
  });
  y += 4;

  // ===== PROJECTS =====
  sectionHeading("Selected Projects");

  const projects = [
    {
      title: "Bright TV — Consumption Analysis & Growth Strategy",
      tag: "SQL · Dashboards · Retention",
      url: "https://github.com/MassEgo88/Bright-TV-Case-Study",
      bullets: [
        "Analysed ~9,000 users and 91,000+ consumption records to surface engagement drivers.",
        "Identified that the top 20% of users drive the majority of consumption; recommended retention strategy.",
        "Delivered SQL-driven dashboard summarising key KPIs for product and growth stakeholders.",
      ],
    },
    {
      title: "Bright Coffee Shop — Sales & Customer Insights",
      tag: "SQL · Excel · Behavioural Analysis",
      url: "https://github.com/MassEgo88",
      bullets: [
        "Cleaned and structured sales transactions to identify top-selling products and peak trading hours.",
        "Mapped customer behaviour patterns to inform staffing and inventory decisions.",
        "Recommended product-mix and promotional changes projected to lift revenue.",
      ],
    },
    {
      title: "Bright Car Sales — Vehicle Sales Data Analysis",
      tag: "Data Cleaning · Pricing · Demand",
      url: "https://github.com/MassEgo88",
      bullets: [
        "Evaluated price, condition, mileage and location to expose pricing trends and demand patterns.",
        "Surfaced the key factors influencing sale velocity and margin.",
        "Translated findings into a clear inventory and pricing strategy.",
      ],
    },
  ];

  projects.forEach((p) => {
    ensureSpace(40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...INK);
    doc.text(p.title, marginX, y);
    y += 13;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(...PRIMARY);
    doc.text(p.tag, marginX, y);

    const linkLabel = "View on GitHub →";
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    doc.textWithLink(linkLabel, pageW - marginX, y, {
      url: p.url,
      align: "right",
    } as never);
    y += 14;

    p.bullets.forEach(bullet);
    y += 4;
  });

  // ===== EXPERIENCE =====
  sectionHeading("Experience");
  const roles = [
    {
      title: "Administrator",
      org: "Diet & Nutrigym Center",
      period: "Jun 2023 — Sept 2024",
      bullets: [
        "Managed and maintained client databases and operational records.",
        "Performed data entry, cleaning and validation to keep records analysis-ready.",
        "Generated reports that informed scheduling and operational decisions.",
      ],
    },
    {
      title: "Beauty Therapist",
      org: "Dibabes Hair Salon",
      period: "Jan 2022 — Jun 2023",
      bullets: [
        "Managed booking systems and customer records with high accuracy.",
        "Improved organisation of day-to-day business operations and scheduling data.",
      ],
    },
    {
      title: "Radio Operator",
      org: "Universal Church (Online Radio)",
      period: "Mar 2021 — Jun 2021",
      bullets: [
        "Managed scheduling and content data; maintained digital logs and records.",
        "Assisted with reporting and content organisation for live programming.",
      ],
    },
  ];
  roles.forEach((r) => {
    roleHeader(r.title, r.org, r.period);
    r.bullets.forEach(bullet);
    y += 4;
  });

  // ===== CERTIFICATIONS =====
  sectionHeading("Certifications");
  [
    "Data Analytics — BrightLearn (2026)",
    "Full Stack Web Development — IT Varsity (2025)",
    "Relaxation Massage Certificate — Face to Face Beauty School (2021)",
    "Radio & Voice Over Training — Ndovela Communication (2020)",
  ].forEach(bullet);

  // ===== FOOTER on every page =====
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(...MUTED);
    doc.text("Masego Serote — Data, with clarity.", marginX, pageH - 28);
    doc.text(`${i} / ${pageCount}`, pageW - marginX, pageH - 28, { align: "right" });
  }

  doc.save(RESUME_FILENAME);
}

export const RESUME_FILENAME = "Masego-Serote-Data-Analyst-CV.pdf";

export function buildResumeDoc() {
  // Re-runs the same builder but returns the jsPDF instance instead of saving.
  // Implemented by calling generateResumePDF logic indirectly is messy; instead
  // we expose a blob URL builder that wraps generateResumePDF via monkey-save.
  throw new Error("Use generateResumeBlobUrl() instead");
}

export function generateResumeBlobUrl(): string {
  // Temporarily override save to capture the blob.
  let url = "";
  const originalSave = (jsPDF.prototype as unknown as { save: typeof jsPDF.prototype.save }).save;
  (jsPDF.prototype as unknown as { save: (filename?: string) => jsPDF }).save = function () {
    const blob = (this as unknown as { output: (t: string) => Blob }).output("blob");
    url = URL.createObjectURL(blob);
    return this as unknown as jsPDF;
  };
  try {
    generateResumePDF();
  } finally {
    (jsPDF.prototype as unknown as { save: typeof originalSave }).save = originalSave;
  }
  return url;
}
