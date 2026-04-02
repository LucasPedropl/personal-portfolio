"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/src/contexts/LanguageContext";

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const imageRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen overflow-hidden px-4 py-20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="block text-left order-2 lg:order-1 w-full"
        >
          <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
            {t('hero.available')}
          </div>
          
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-zinc-100 mb-6 leading-[1.1]">
            {t('hero.title1')} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              {t('hero.title2')}
            </span>
          </h1>

          {/* Mobile Image - Floated Right */}
          <div className="lg:hidden float-right ml-4 mb-3 mt-2 w-[110px] sm:w-[150px] aspect-[4/5] relative group">
            <div className="absolute inset-0 rounded-2xl border border-zinc-800 bg-zinc-900/50 translate-x-2 translate-y-2 -z-10" />
            <div className="absolute inset-0 rounded-2xl border border-indigo-500/30 bg-indigo-500/5 -translate-x-2 -translate-y-2 -z-10" />
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl">
              <Image
                src="/foto-preto-branco.png"
                alt="Retrato do Desenvolvedor (P&B)"
                fill
                sizes="(max-width: 1024px) 150px, 0px"
                className="object-cover"
                referrerPolicy="no-referrer"
                priority
              />
              <div className="absolute inset-0 opacity-100 transition-opacity duration-700 ease-in-out">
                <Image
                  src="/foto-colorida.png"
                  alt="Retrato do Desenvolvedor (Colorida)"
                  fill
                  sizes="(max-width: 1024px) 150px, 0px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          <p className="text-lg md:text-xl text-zinc-400 max-w-xl mb-10 leading-relaxed">
            {t('hero.desc')}
          </p>

          <div className="flex items-center gap-6 text-zinc-400 clear-both">
            <a href="https://github.com/LucasPedropl" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-all duration-300"><Github className="w-9 h-9" /></a>
            <a href="https://www.linkedin.com/in/pedro-lucas-silva-mota-769a70267/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0a66c2] hover:scale-110 transition-all duration-300"><Linkedin className="w-9 h-9" /></a>
            <a href="mailto:pedrolucasmota2005.pl@gmail.com" className="hover:text-[#ea4335] hover:scale-110 transition-all duration-300"><Mail className="w-9 h-9" /></a>
          </div>
        </motion.div>

        {/* Desktop Image Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="hidden lg:block relative mx-auto lg:ml-auto w-full max-w-[400px] xl:max-w-[450px] aspect-[4/5] order-1 lg:order-2 group"
        >
          {/* Decorative elements behind image */}
          <div className="absolute inset-0 rounded-3xl border border-zinc-800 bg-zinc-900/50 translate-x-4 translate-y-4 -z-10" />
          <div className="absolute inset-0 rounded-3xl border border-indigo-500/30 bg-indigo-500/5 -translate-x-4 -translate-y-4 -z-10" />
          
          <div ref={imageRef} className="relative w-full h-full rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
            {/* Foto Preto e Branco (Base) */}
            <Image
              src="/foto-preto-branco.png"
              alt="Retrato do Desenvolvedor (P&B)"
              fill
              sizes="(min-width: 1024px) 450px, 0px"
              className="object-cover"
              referrerPolicy="no-referrer"
              priority
            />

            {/* Foto Colorida (Efeito de Proximidade da Luz) */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                WebkitMaskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                maskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`
              }}
            >
              <Image
                src="/foto-colorida.png"
                alt="Retrato do Desenvolvedor (Colorida - Proximidade)"
                fill
                sizes="(min-width: 1024px) 450px, 0px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Foto Colorida (Totalmente visível no Hover) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
              <Image
                src="/foto-colorida.png"
                alt="Retrato do Desenvolvedor (Colorida)"
                fill
                sizes="(min-width: 1024px) 450px, 0px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
