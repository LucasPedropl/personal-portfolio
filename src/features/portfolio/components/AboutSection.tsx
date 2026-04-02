"use client";

import { motion } from "motion/react";
import { Code2, Database, Layout, Server } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();

  const skills = [
    { name: t('about.skills.frontend'), icon: <Layout className="w-5 h-5" />, desc: "React, Next.js, Tailwind CSS" },
    { name: t('about.skills.backend'), icon: <Server className="w-5 h-5" />, desc: "Node.js, NestJS, Express" },
    { name: t('about.skills.languages'), icon: <Code2 className="w-5 h-5" />, desc: "TypeScript, JavaScript" },
    { name: t('about.skills.database'), icon: <Database className="w-5 h-5" />, desc: "PostgreSQL, Firebase, MongoDB" },
  ];

  return (
    <section id="about" className="relative py-24 px-4 bg-zinc-950/50 border-y border-zinc-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">{t('about.title')}</h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 text-zinc-400 text-lg leading-relaxed text-center lg:text-left"
          >
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {skills.map((skill, index) => (
              <div key={index} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/50 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold text-zinc-100 mb-2">{skill.name}</h3>
                <p className="text-sm text-zinc-400">{skill.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
