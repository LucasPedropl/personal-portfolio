"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    "nav.home": "Início",
    "nav.about": "Sobre",
    "nav.experience": "Experiência",
    "nav.projects": "Projetos",
    "nav.admin": "Admin",
    "nav.contact": "Contato",
    "nav.cv": "Baixar CV",
    "hero.available": "Disponível para novas oportunidades",
    "hero.title1": "Olá, sou Pedro Mota,",
    "hero.title2": "desenvolvedor JS Full-Stack.",
    "hero.desc": "Sou um Desenvolvedor Full-Stack apaixonado por criar experiências digitais modernas, escaláveis e focadas no usuário. Especialista no ecossistema NextJS, TypeScript e NestJS.",
    "about.title": "Sobre Mim",
    "about.p1": "Olá! Sou Pedro Mota, um desenvolvedor apaixonado por tecnologia e por resolver problemas complexos através do código. Minha jornada na programação começou com a curiosidade de entender como as coisas funcionam por trás das telas, e desde então, venho aprimorando minhas habilidades no desenvolvimento web.",
    "about.p2": "Tenho foco especial no ecossistema JavaScript/TypeScript, construindo desde interfaces de usuário modernas e responsivas até APIs robustas e escaláveis. Acredito que um bom software não deve ser apenas funcional, mas também oferecer uma experiência incrível para o usuário e possuir um código limpo e manutenível.",
    "about.p3": "Estou sempre em busca de novos desafios e aprendizados, acompanhando as melhores práticas e as tecnologias emergentes do mercado para entregar soluções de alto impacto.",
    "about.skills.frontend": "Frontend",
    "about.skills.backend": "Backend",
    "about.skills.languages": "Linguagens",
    "about.skills.database": "Banco de Dados",
    "experience.title": "Experiência Profissional",
    "experience.1.title": "Desenvolvedor Full-Stack",
    "experience.1.company": "Empresa Atual",
    "experience.1.period": "Jan 2023 - Presente",
    "experience.1.desc": "Desenvolvimento e manutenção de aplicações web utilizando Next.js, React e Node.js. Implementação de arquiteturas escaláveis, integração com APIs RESTful e otimização de performance.",
    "experience.2.title": "Desenvolvedor Frontend",
    "experience.2.company": "Empresa Anterior",
    "experience.2.period": "Mar 2021 - Dez 2022",
    "experience.2.desc": "Criação de interfaces de usuário responsivas e acessíveis. Colaboração direta com times de design para transformar protótipos do Figma em componentes React reutilizáveis e de alta fidelidade.",
    "experience.3.title": "Desenvolvedor Júnior",
    "experience.3.company": "Primeira Empresa",
    "experience.3.period": "Jun 2019 - Fev 2021",
    "experience.3.desc": "Atuação no desenvolvimento de landing pages e sistemas internos. Manutenção de código legado, correção de bugs e participação ativa em code reviews e ritos ágeis.",
    "projects.title": "Meus Projetos",
    "projects.seeMore": "Ver Mais Projetos",
    "contact.title": "Contato",
    "contact.subtitle": "Tem um projeto em mente ou quer apenas dizer um olá? Preencha o formulário abaixo ou me chame nas redes sociais. Estou sempre aberto a novas oportunidades e parcerias incríveis.",
    "contact.name": "Seu Nome",
    "contact.name.placeholder": "Digite seu nome completo",
    "contact.email": "Seu Email",
    "contact.email.placeholder": "Digite seu melhor e-mail",
    "contact.message": "Sua Mensagem",
    "contact.message.placeholder": "Escreva sua mensagem aqui...",
    "contact.send": "Enviar Mensagem",
    "contact.info": "Informações de Contato",
    "contact.location": "Localização",
    "contact.location.value": "Cornélio Procópio, Paraná, Brasil",
    "contact.phone": "Telefone / WhatsApp",
    "contact.social": "Minhas Redes",
    "admin.featured": "Destacar na página inicial (Máx 3)",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.admin": "Admin",
    "nav.contact": "Contact",
    "nav.cv": "Download CV",
    "hero.available": "Available for new opportunities",
    "hero.title1": "Hi, I'm Pedro Mota,",
    "hero.title2": "Full-Stack JS Developer.",
    "hero.desc": "I'm a Full-Stack Developer passionate about creating modern, scalable, and user-focused digital experiences. Specialist in the NextJS, TypeScript, and NestJS ecosystem.",
    "about.title": "About Me",
    "about.p1": "Hello! I'm Pedro Mota, a developer passionate about technology and solving complex problems through code. My programming journey started with the curiosity to understand how things work behind the screens, and since then, I've been improving my web development skills.",
    "about.p2": "I have a special focus on the JavaScript/TypeScript ecosystem, building everything from modern and responsive user interfaces to robust and scalable APIs. I believe good software shouldn't just be functional, but also offer an amazing user experience and have clean, maintainable code.",
    "about.p3": "I'm always looking for new challenges and learning opportunities, following best practices and emerging market technologies to deliver high-impact solutions.",
    "about.skills.frontend": "Frontend",
    "about.skills.backend": "Backend",
    "about.skills.languages": "Languages",
    "about.skills.database": "Database",
    "experience.title": "Work Experience",
    "experience.1.title": "Full-Stack Developer",
    "experience.1.company": "Current Company",
    "experience.1.period": "Jan 2023 - Present",
    "experience.1.desc": "Development and maintenance of web applications using Next.js, React, and Node.js. Implementation of scalable architectures, integration with RESTful APIs, and performance optimization.",
    "experience.2.title": "Frontend Developer",
    "experience.2.company": "Previous Company",
    "experience.2.period": "Mar 2021 - Dec 2022",
    "experience.2.desc": "Creation of responsive and accessible user interfaces. Direct collaboration with design teams to transform Figma prototypes into reusable, high-fidelity React components.",
    "experience.3.title": "Junior Developer",
    "experience.3.company": "First Company",
    "experience.3.period": "Jun 2019 - Feb 2021",
    "experience.3.desc": "Worked on developing landing pages and internal systems. Legacy code maintenance, bug fixing, and active participation in code reviews and agile ceremonies.",
    "projects.title": "My Projects",
    "projects.seeMore": "See More Projects",
    "contact.title": "Contact",
    "contact.subtitle": "Have a project in mind or just want to say hi? Fill out the form below or reach out on social media. I am always open to new opportunities and amazing partnerships.",
    "contact.name": "Your Name",
    "contact.name.placeholder": "Enter your full name",
    "contact.email": "Your Email",
    "contact.email.placeholder": "Enter your best email",
    "contact.message": "Your Message",
    "contact.message.placeholder": "Write your message here...",
    "contact.send": "Send Message",
    "contact.info": "Contact Information",
    "contact.location": "Location",
    "contact.location.value": "Cornélio Procópio, Paraná, Brazil",
    "contact.phone": "Phone / WhatsApp",
    "contact.social": "My Socials",
    "admin.featured": "Feature on home page (Max 3)",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(saved);
    } else {
      const browserLang = navigator.language.toLowerCase();
      const defaultLang = browserLang.startsWith('pt') ? 'pt' : 'en';
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(defaultLang);
      localStorage.setItem('language', defaultLang);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'pt' ? 'en' : 'pt';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key: string): string => {
    // @ts-ignore
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div className={mounted ? "contents" : "contents invisible"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
