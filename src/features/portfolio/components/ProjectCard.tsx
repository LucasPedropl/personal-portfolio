import Image from "next/image";
import { Badge } from "@/src/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "../types";
import { useLanguage } from "@/src/contexts/LanguageContext";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { language } = useLanguage();
  
  const displayTitle = language === 'en' && project.titleEn ? project.titleEn : project.title;
  const displayDescription = language === 'en' && project.descriptionEn ? project.descriptionEn : project.description;

  return (
    <div className="group relative flex flex-col rounded-2xl bg-zinc-900/80 border border-zinc-800 overflow-hidden hover:border-indigo-500/50 transition-colors h-full">
      <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105">
          {project.liveUrl ? (
            <div className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none">
              <iframe
                src={project.liveUrl}
                className="w-full h-full border-0 bg-zinc-900"
                sandbox="allow-scripts allow-same-origin"
                tabIndex={-1}
                scrolling="no"
              />
            </div>
          ) : (
            <Image
              src={project.imageUrl}
              alt={displayTitle}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          )}
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-zinc-100">{displayTitle}</h3>
          <div className="flex gap-3">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
        
        <p className="text-zinc-400 text-sm mb-6 flex-grow">{displayDescription}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-zinc-800/50 text-zinc-300">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
