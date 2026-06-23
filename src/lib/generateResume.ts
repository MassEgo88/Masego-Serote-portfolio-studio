import { jsPDF } from "jspdf";

// ATS-friendly resume:
// - Single column, left-aligned
// - Standard section headings (Summary, Skills, Experience, Projects, Education, Certifications)
// - Plain ASCII bullets ("- ")
// - Standard font (Helvetica)
// - No tables, columns, text boxes, images, or headers/footers with critical info
// - Machine-readable contact line, plain URLs

export const RESUME_FILENAME = "Masego-Serote-Data-Analyst-CV.pdf";

const BLACK: [number, number, number] = [0, 0, 0];

function buildDoc(): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  doc.setProperties({
    title: "Masego Serote - Data Analyst CV",
    subject: "Resume",
    author: "Masego Serote",
    keywords:
      "Data Analyst, SQL, Excel, Power BI, Looker Studio, BigQuery, Databricks, Python, Data Cleaning, Dashboards",
    creator: "Masego Serote",
  });

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 54;
  const contentW = pageW - marginX * 2;
  let y = 56;

  doc.setTextColor(...BLACK);

  const ensure = (needed: number) => {
    if (y + needed > pageH - 48) {
      doc.addPage();
      y = 56;
    }
  };

  const text = (
    str: string,
    opts: { bold?: boolean; size?: number; gap?: number } = {}
  ) => {
    const { bold = false, size = 10.5, gap = 13 } = opts;
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(str, contentW) as string[];
    lines.forEach((ln) => {
      ensure(gap);
      doc.text(ln, marginX, y);
      y += gap;
    });
  };

  const heading = (label: string) => {
    ensure(28);
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.text(label.toUpperCase(), marginX, y);
    y += 4;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(marginX, y, pageW - marginX, y);
    y += 12;
  };

  const bullet = (str: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize("- " + str, contentW) as string[];
    lines.forEach((ln) => {
      ensure(13);
      doc.text(ln, marginX, y);
      y += 13;
    });
  };

  // ===== HEADER (plain text, parseable) =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Masego Serote", marginX, y);
  y += 18;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Data Analyst", marginX, y);
  y += 14;

  doc.setFontSize(10);
  doc.text("Johannesburg, South Africa", marginX, y);
  y += 12;
  doc.text("Email: msgpl117@gmail.com | Phone: +27 63 093 5634", marginX, y);
  y += 12;
  doc.text(
    "LinkedIn: https://www.linkedin.com/in/masego-peele-serote-16476a95",
    marginX,
    y
  );
  y += 12;
  doc.text("GitHub: https://github.com/MassEgo88", marginX, y);
  y += 8;

  // ===== SUMMARY =====
  heading("Summary");
  text(
    "Data Analyst with hands-on experience in data cleaning, analysis, and visualisation using SQL, Excel, Power BI, Looker Studio, and Python. Proven ability to transform raw data into clear, decision-ready insights through three end-to-end case studies covering streaming consumption, retail sales, and vehicle pricing. Strong administrative background with high attention to detail, data accuracy, and reporting."
  );

  // ===== SKILLS (plain comma-separated, ATS keyword-rich) =====
  heading("Skills");
  text("Data Analysis: SQL, Microsoft Excel, Pivot Tables, Data Cleaning, Data Validation, Aggregation, KPI Tracking", { bold: false });
  text("Visualisation: Power BI, Looker Studio, Dashboards, Data Storytelling, Reporting", { bold: false });
  text("Tools and Platforms: Google BigQuery, Databricks, Miro, Canva", { bold: false });
  text("Programming: SQL, Python (Basic), Database Management", { bold: false });
  text("Soft Skills: Analytical Thinking, Attention to Detail, Communication, Problem Solving, Collaboration", { bold: false });

  // ===== EXPERIENCE =====
  heading("Professional Experience");

  const roles = [
    {
      title: "Administrator",
      org: "Diet & Nutrigym Center",
      location: "Johannesburg, South Africa",
      period: "June 2023 - September 2024",
      bullets: [
        "Managed and maintained client databases and operational records, ensuring data accuracy across 500+ records.",
        "Performed data entry, cleaning, and validation to keep records analysis-ready and audit-compliant.",
        "Generated weekly and monthly reports in Excel that informed scheduling and operational decisions.",
        "Standardised reporting workflows, reducing manual data preparation time.",
      ],
    },
    {
      title: "Beauty Therapist",
      org: "Dibabes Hair Salon",
      location: "Johannesburg, South Africa",
      period: "January 2022 - June 2023",
      bullets: [
        "Managed booking systems and customer records with high accuracy and consistency.",
        "Improved organisation of day-to-day business operations and scheduling data.",
        "Tracked customer history to support repeat-business and retention efforts.",
      ],
    },
    {
      title: "Radio Operator",
      org: "Universal Church (Online Radio)",
      location: "Remote",
      period: "March 2021 - June 2021",
      bullets: [
        "Managed scheduling and content data; maintained digital logs and broadcast records.",
        "Assisted with reporting and content organisation for live programming.",
      ],
    },
  ];

  roles.forEach((r) => {
    text(`${r.title}, ${r.org} - ${r.location}`, { bold: true, size: 11 });
    text(r.period, { size: 10 });
    r.bullets.forEach(bullet);
    y += 4;
  });

  // ===== PROJECTS =====
  heading("Projects");

  const projects = [
    {
      title: "Data Warehouse Pipeline - Bronze to Gold with EDA",
      tools: "Tools: SQL, Python, Data Warehouse",
      url: "https://github.com/MassEgo88",
      bullets: [
        "Designed and implemented a multi-layer data warehouse pipeline (bronze, silver, gold) to transform raw data into analysis-ready datasets.",
        "Performed exploratory data analysis (EDA) at each layer to validate data quality, identify anomalies, and ensure downstream reliability.",
        "Applied data cleansing, type casting, deduplication, and business-rule validation in the silver layer to standardise ingested data.",
        "Delivered curated gold-layer tables optimised for BI reporting, dashboarding, and stakeholder analytics.",
      ],
    },
    {
      title: "Bright TV - Consumption Analysis and Growth Strategy",
      tools: "Tools: SQL, Dashboards",
      url: "https://github.com/MassEgo88/Bright-TV-Case-Study",
      bullets: [
        "Analysed approximately 9,000 users and 91,000+ consumption records to surface engagement drivers.",
        "Identified that the top 20% of users drive the majority of consumption and recommended a retention strategy.",
        "Delivered a SQL-driven dashboard summarising key KPIs for product and growth stakeholders.",
      ],
    },
    {
      title: "Bright Coffee Shop - Sales and Customer Insights",
      tools: "Tools: SQL, Microsoft Excel",
      url: "https://github.com/MassEgo88",
      bullets: [
        "Cleaned and structured sales transactions to identify top-selling products and peak trading hours.",
        "Mapped customer behaviour patterns to inform staffing and inventory decisions.",
        "Recommended product-mix and promotional changes projected to lift revenue.",
      ],
    },
    {
      title: "Bright Car Sales - Vehicle Sales Data Analysis",
      tools: "Tools: SQL, Excel, Data Cleaning",
      url: "https://github.com/MassEgo88",
      bullets: [
        "Evaluated price, condition, mileage, and location to expose pricing trends and demand patterns.",
        "Surfaced the key factors influencing sale velocity and margin.",
        "Translated findings into a clear inventory and pricing strategy.",
      ],
    },
  ];

  projects.forEach((p) => {
    text(p.title, { bold: true, size: 11 });
    text(p.tools, { size: 10 });
    text(`Link: ${p.url}`, { size: 10 });
    p.bullets.forEach(bullet);
    y += 4;
  });

  // ===== EDUCATION =====
  heading("Education");
  text("Full Stack Web Development - IT Varsity (2025)", { bold: true });
  text("Data Analytics Programme - BrightLearn (2026)", { bold: true });

  // ===== CERTIFICATIONS =====
  heading("Certifications");
  bullet("Data Analytics - BrightLearn (2026)");
  bullet("Full Stack Web Development - IT Varsity (2025)");
  bullet("Relaxation Massage Certificate - Face to Face Beauty School (2021)");
  bullet("Radio and Voice Over Training - Ndovela Communication (2020)");

  // ===== LANGUAGES =====
  heading("Languages");
  text("English (Professional), Setswana (Native)");

  return doc;
}

export function generateResumePDF() {
  const doc = buildDoc();
  doc.save(RESUME_FILENAME);
}

export function generateResumeBlobUrl(): string {
  const doc = buildDoc();
  const blob = doc.output("blob");
  return URL.createObjectURL(blob);
}
