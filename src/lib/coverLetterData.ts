import { resume } from "./resumeData";

export const COVER_LETTER_BASENAME = "Masego-Serote-Data-Analyst-Cover-Letter";

const today = new Date().toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const coverLetter = {
  name: resume.name,
  title: resume.title,
  location: resume.location,
  email: resume.email,
  phone: resume.phone,
  linkedin: resume.linkedin,
  github: resume.github,
  date: today,
  recipient: {
    name: "Hiring Manager",
    company: "[Company Name]",
    address: "[Company Address]",
  },
  subject: "Application for Data Analyst Position",
  greeting: "Dear Hiring Manager,",
  paragraphs: [
    "I am writing to express my interest in the Data Analyst position at your organisation. With hands-on experience in SQL, Excel, Power BI, Looker Studio and Python, and a strong administrative background built on accuracy and reliable reporting, I am confident I can deliver clear, decision-ready insights for your team.",
    "Through three end-to-end case studies covering streaming consumption, retail sales and vehicle pricing, I have analysed datasets of up to 91,000+ records, surfaced the drivers behind customer engagement, and translated findings into practical product, pricing and retention recommendations. In my Bright TV case study I identified that the top 20% of users drive the majority of consumption, and proposed a retention strategy supported by a SQL-driven KPI dashboard.",
    "Previously, as an Administrator at Diet & Nutrigym Center, I managed and validated 500+ client records, standardised reporting workflows in Excel, and produced weekly and monthly reports that informed scheduling and operational decisions. This experience sharpened my attention to detail, data hygiene and ability to communicate findings to non-technical stakeholders.",
    "I would welcome the opportunity to bring this combination of analytical rigour, business awareness and self-driven learning to your team. Thank you for considering my application; I have attached my CV and would be glad to discuss how I can contribute to your goals.",
  ],
  closing: "Kind regards,",
};
