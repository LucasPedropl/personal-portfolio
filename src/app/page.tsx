import { Navbar } from "@/src/features/portfolio/components/Navbar";
import { HeroSection } from "@/src/features/portfolio/components/HeroSection";
import { AboutSection } from "@/src/features/portfolio/components/AboutSection";
import { ExperienceSection } from "@/src/features/portfolio/components/ExperienceSection";
import { ProjectsSection } from "@/src/features/portfolio/components/ProjectsSection";
import { ContactSection } from "@/src/features/portfolio/components/ContactSection";
import { Footer } from "@/src/features/portfolio/components/Footer";
import { getProjects } from "@/src/features/portfolio/services/projectService";
import { MouseGlow } from "@/src/components/ui/mouse-glow";

export const revalidate = 60; // Revalida a cada 60 segundos para cache rápido

export default async function HomePage() {
  // Fetch de dados no Server Component (Padrão de arquitetura)
  const projects = await getProjects();

  return (
    <main className="relative min-h-screen bg-black text-zinc-50 selection:bg-indigo-500/30">
      <MouseGlow />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection initialProjects={projects} featuredOnly={true} />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
