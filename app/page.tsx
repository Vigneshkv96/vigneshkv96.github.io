import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";

// Vignesh K V - Portfolio
export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div id="about">
        <HeroSection />
      </div>
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
