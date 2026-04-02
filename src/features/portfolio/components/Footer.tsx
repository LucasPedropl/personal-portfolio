"use client";

import { useLanguage } from "@/src/contexts/LanguageContext";
import { Github, Linkedin, Mail } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    if (pathname !== '/') {
      router.push(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Altura da navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="py-12 border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-8">
        
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/LucasPedropl"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-zinc-900/50 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/pedro-lucas-silva-mota-769a70267/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-zinc-900/50 rounded-full text-zinc-400 hover:text-[#0a66c2] hover:bg-zinc-800 transition-all"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:pedrolucasmota2005.pl@gmail.com"
            className="p-3 bg-zinc-900/50 rounded-full text-zinc-400 hover:text-[#ea4335] hover:bg-zinc-800 transition-all"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
          <a href="#home" onClick={(e) => handleScrollTo(e, 'home')} className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
            {t('nav.home')}
          </a>
          <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
            {t('nav.about')}
          </a>
          <a href="#experience" onClick={(e) => handleScrollTo(e, 'experience')} className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
            {t('nav.experience')}
          </a>
          <a href="#projects" onClick={(e) => handleScrollTo(e, 'projects')} className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
            {t('nav.projects')}
          </a>
        </nav>

        <div className="text-center">
          <a href="mailto:pedrolucasmota2005.pl@gmail.com" className="text-zinc-500 hover:text-indigo-400 transition-colors text-sm">
            pedrolucasmota2005.pl@gmail.com
          </a>
        </div>
        
        <div className="text-zinc-600 text-xs mt-4">
          © {new Date().getFullYear()} Pedro Mota. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
