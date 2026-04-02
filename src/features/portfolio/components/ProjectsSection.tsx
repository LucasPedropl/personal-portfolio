"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";
import { ProjectCard } from "./ProjectCard";
import { Button } from "@/src/components/ui/button";
import { useLanguage } from "@/src/contexts/LanguageContext";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProjectsSectionProps {
  initialProjects: Project[];
  featuredOnly?: boolean;
}

export function ProjectsSection({ initialProjects, featuredOnly = false }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<Project['type'] | 'all'>('all');
  const { t } = useLanguage();

  let displayedProjects = initialProjects;
  if (featuredOnly) {
    displayedProjects = initialProjects.filter(p => p.featured).slice(0, 3);
  }

  const filteredProjects = displayedProjects.filter(
    p => filter === 'all' || p.type === filter
  );

  return (
    <section className={`py-20 w-full ${featuredOnly ? 'border-t border-zinc-800/50' : ''}`} id="projects">
      <div className="px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-zinc-100">{t('projects.title')}</h2>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map(project => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {featuredOnly && (
          <div className="mt-16 flex justify-center">
            <Link href="/projects" prefetch={true}>
              <Button className="bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-800 hover:border-zinc-700 px-8 py-6 text-lg group transition-all">
                {t('projects.seeMore')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
