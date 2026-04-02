"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { Globe, Download, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function Navbar({ alwaysVisible = false }: { alwaysVisible?: boolean }) {
  const [isVisible, setIsVisible] = useState(alwaysVisible);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { language, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  // Pré-carrega a página de projetos para navegação instantânea
  useEffect(() => {
    router.prefetch('/projects');
  }, [router]);

  // Controle de visibilidade da navbar
  useEffect(() => {
    if (alwaysVisible) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Fecha o menu ao voltar pro topo
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [alwaysVisible]);

  // Scroll Spy para atualizar o link ativo automaticamente
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = ['home', 'about', 'experience', 'projects', 'contact'];
    
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Ativa quando a seção atinge 20% do topo
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Fecha o menu mobile ao clicar
    
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

  const getLinkClass = (id: string) => {
    const isActive = activeSection === id && pathname === '/';
    return `text-sm font-medium transition-colors ${isActive ? 'text-indigo-400' : 'text-zinc-400 hover:text-zinc-100'}`;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 shadow-lg shadow-black/20"
        >
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold font-mono text-zinc-100">
              <span className="text-indigo-500">{'<'}</span>
              Dev
              <span className="text-indigo-500">{' />'}</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <a href="#home" onClick={(e) => handleScrollTo(e, 'home')} className={getLinkClass('home')}>
                {t('nav.home')}
              </a>
              <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className={getLinkClass('about')}>
                {t('nav.about')}
              </a>
              <a href="#experience" onClick={(e) => handleScrollTo(e, 'experience')} className={getLinkClass('experience')}>
                {t('nav.experience')}
              </a>
              <a href="#projects" onClick={(e) => handleScrollTo(e, 'projects')} className={getLinkClass('projects')}>
                {t('nav.projects')}
              </a>
              <a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')} className={getLinkClass('contact')}>
                {t('nav.contact')}
              </a>
              <Link href="/admin" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                {t('nav.admin')}
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                {language === 'pt' ? 'PT' : 'EN'}
              </button>
              
              <a href="/CV%20Pedro%20Mota.pdf" download="CV Pedro Mota.pdf" className="hidden sm:block">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  {t('nav.cv')}
                </Button>
              </a>

              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden text-zinc-400 hover:text-zinc-100 p-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-zinc-950 border-b border-zinc-800 overflow-hidden"
              >
                <nav className="flex flex-col px-4 py-4 gap-4">
                  <a href="#home" onClick={(e) => handleScrollTo(e, 'home')} className={getLinkClass('home')}>
                    {t('nav.home')}
                  </a>
                  <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className={getLinkClass('about')}>
                    {t('nav.about')}
                  </a>
                  <a href="#experience" onClick={(e) => handleScrollTo(e, 'experience')} className={getLinkClass('experience')}>
                    {t('nav.experience')}
                  </a>
                  <a href="#projects" onClick={(e) => handleScrollTo(e, 'projects')} className={getLinkClass('projects')}>
                    {t('nav.projects')}
                  </a>
                  <a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')} className={getLinkClass('contact')}>
                    {t('nav.contact')}
                  </a>
                  <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                    {t('nav.admin')}
                  </Link>
                  <div className="pt-2 mt-2 border-t border-zinc-800/50 sm:hidden">
                    <a href="/CV%20Pedro%20Mota.pdf" download="CV Pedro Mota.pdf" className="block w-full">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full flex items-center justify-center gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        {t('nav.cv')}
                      </Button>
                    </a>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
