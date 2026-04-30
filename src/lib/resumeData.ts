// Single source of truth for the resume content.
// Used by the PDF, DOCX and TXT generators so they stay in sync.

export const RESUME_BASENAME = "Masego-Serote-Data-Analyst-CV";

export const resume = {
  name: "Masego Serote",
  title: "Data Analyst",
  location: "Johannesburg, South Africa",
  email: "msgpl117@gmail.com",
  phone: "+27 63 093 5634",
  linkedin: "https://www.linkedin.com/in/masego-peele-serote-16476a95",
  github: "https://github.com/MassEgo88",

  summary:
    "Data Analyst with hands-on experience in data cleaning, analysis, and visualisation using SQL, Excel, Power BI, Looker Studio, and Python. Proven ability to transform raw data into clear, decision-ready insights through three end-to-end case studies covering streaming consumption, retail sales, and vehicle pricing. Strong administrative background with high attention to detail, data accuracy, and reporting.",

  skills: [
    {
      group: "Data Analysis",
      items:
        "SQL, Microsoft Excel, Pivot Tables, Data Cleaning, Data Validation, Aggregation, KPI Tracking",
    },
    {
      group: "Visualisation",
      items: "Power BI, Looker Studio, Dashboards, Data Storytelling, Reporting",
    },
    {
      group: "Tools and Platforms",
      items: "Google BigQuery, Databricks, Miro, Canva",
    },
    {
      group: "Programming",
      items: "SQL, Python (Basic), Database Management",
    },
    {
      group: "Soft Skills",
      items:
        "Analytical Thinking, Attention to Detail, Communication, Problem Solving, Collaboration",
    },
  ],

  experience: [
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
  ],

  projects: [
    {
      title: "Bright TV - Consumption Analysis and Growth Strategy",
      tools: "SQL, Dashboards",
      url: "https://github.com/MassEgo88/Bright-TV-Case-Study",
      bullets: [
        "Analysed approximately 9,000 users and 91,000+ consumption records to surface engagement drivers.",
        "Identified that the top 20% of users drive the majority of consumption and recommended a retention strategy.",
        "Delivered a SQL-driven dashboard summarising key KPIs for product and growth stakeholders.",
      ],
    },
    {
      title: "Bright Coffee Shop - Sales and Customer Insights",
      tools: "SQL, Microsoft Excel",
      url: "https://github.com/MassEgo88",
      bullets: [
        "Cleaned and structured sales transactions to identify top-selling products and peak trading hours.",
        "Mapped customer behaviour patterns to inform staffing and inventory decisions.",
        "Recommended product-mix and promotional changes projected to lift revenue.",
      ],
    },
    {
      title: "Bright Car Sales - Vehicle Sales Data Analysis",
      tools: "SQL, Excel, Data Cleaning",
      url: "https://github.com/MassEgo88",
      bullets: [
        "Evaluated price, condition, mileage, and location to expose pricing trends and demand patterns.",
        "Surfaced the key factors influencing sale velocity and margin.",
        "Translated findings into a clear inventory and pricing strategy.",
      ],
    },
  ],

  education: [
    "Full Stack Web Development - IT Varsity (2025)",
    "Data Analytics Programme - BrightLearn (2026)",
  ],

  certifications: [
    "Data Analytics - BrightLearn (2026)",
    "Full Stack Web Development - IT Varsity (2025)",
    "Relaxation Massage Certificate - Face to Face Beauty School (2021)",
    "Radio and Voice Over Training - Ndovela Communication (2020)",
  ],

  languages: "English (Professional), Setswana (Native)",
};
