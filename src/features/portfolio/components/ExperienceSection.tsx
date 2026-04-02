"use client";

import { motion } from "motion/react";
import { Briefcase } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";

export function ExperienceSection() {
  const { t } = useLanguage();

  const experiences = [
    {
      id: 1,
      title: t('experience.1.title'),
      company: t('experience.1.company'),
      period: t('experience.1.period'),
      description: t('experience.1.desc')
    },
    {
      id: 2,
      title: t('experience.2.title'),
      company: t('experience.2.company'),
      period: t('experience.2.period'),
      description: t('experience.2.desc')
    },
    {
      id: 3,
      title: t('experience.3.title'),
      company: t('experience.3.company'),
      period: t('experience.3.period'),
      description: t('experience.3.desc')
    }
  ];

  return (
    <section id="experience" className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-100 whitespace-nowrap">{t('experience.title')}</h2>
          </div>
          <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Linha Central (Desktop) / Linha Lateral (Mobile) */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800 transform md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-24">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex flex-col md:flex-row items-start md:items-center w-full"
                >
                  {/* Círculo com Número */}
                  <div className="absolute left-[28px] md:left-1/2 w-10 h-10 rounded-full bg-zinc-950 border-2 border-indigo-500 flex items-center justify-center text-indigo-400 font-bold z-10 transform -translate-x-1/2 mt-1 md:mt-0 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                    0{index + 1}
                  </div>

                  {/* Layout Mobile (Tudo à direita da linha) */}
                  <div className="md:hidden ml-16 flex flex-col gap-3 w-[calc(100%-4rem)]">
                    <div>
                      <h3 className="text-xl font-bold text-zinc-100">{exp.title}</h3>
                      <div className="text-indigo-400 font-medium">{exp.company}</div>
                      <div className="text-zinc-500 text-sm mt-1">{exp.period}</div>
                    </div>
                    <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-sm leading-relaxed">
                      {exp.description}
                    </div>
                  </div>

                  {/* Layout Desktop (Alternado) */}
                  <div className="hidden md:flex w-full items-center">
                    {/* Metade Esquerda */}
                    <div className="w-1/2 pr-12 flex justify-end">
                      {isEven ? (
                        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-left shadow-xl hover:border-indigo-500/30 transition-colors max-w-md w-full">
                          {exp.description}
                        </div>
                      ) : (
                        <div className="text-right flex flex-col items-end max-w-md w-full">
                          <h3 className="text-2xl font-bold text-zinc-100">{exp.title}</h3>
                          <div className="text-indigo-400 font-medium text-lg mt-1">{exp.company}</div>
                          <div className="text-zinc-500 text-sm mt-2">{exp.period}</div>
                        </div>
                      )}
                    </div>

                    {/* Metade Direita */}
                    <div className="w-1/2 pl-12 flex justify-start">
                      {isEven ? (
                        <div className="text-left flex flex-col items-start max-w-md w-full">
                          <h3 className="text-2xl font-bold text-zinc-100">{exp.title}</h3>
                          <div className="text-indigo-400 font-medium text-lg mt-1">{exp.company}</div>
                          <div className="text-zinc-500 text-sm mt-2">{exp.period}</div>
                        </div>
                      ) : (
                        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-left shadow-xl hover:border-indigo-500/30 transition-colors max-w-md w-full">
                          {exp.description}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
