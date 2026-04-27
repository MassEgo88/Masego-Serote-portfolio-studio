import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Approach } from "@/components/portfolio/Approach";
import { Contact, Footer } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Masego Serote — Data Analyst Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Masego Serote, a Johannesburg-based Data Analyst transforming raw data into clear, actionable insights with SQL, Excel and modern BI tools.",
      },
      { property: "og:title", content: "Masego Serote — Data Analyst Portfolio" },
      {
        property: "og:description",
        content:
          "SQL, dashboards and data storytelling case studies — from Bright TV consumption analysis to retail sales insights.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Approach />
      <Contact />
      <Footer />
    </main>
  );
}
