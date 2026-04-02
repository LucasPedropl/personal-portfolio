import { Navbar } from "@/src/features/portfolio/components/Navbar";
import { ProjectsSection } from "@/src/features/portfolio/components/ProjectsSection";
import { getProjects } from "@/src/features/portfolio/services/projectService";
import { MouseGlow } from "@/src/components/ui/mouse-glow";
import { Footer } from "@/src/features/portfolio/components/Footer";

export const revalidate = 60; // Revalida a cada 60 segundos para cache rápido

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="relative min-h-screen bg-black text-zinc-50 selection:bg-indigo-500/30">
      <MouseGlow />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar alwaysVisible={true} />
        <div className="flex-1 pt-24">
          <ProjectsSection initialProjects={projects} featuredOnly={false} />
        </div>
        <Footer />
      </div>
    </main>
  );
}
