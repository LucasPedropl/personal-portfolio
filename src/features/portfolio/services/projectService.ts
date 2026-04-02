import { collection, getDocs } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { Project } from "../types";

/**
 * Busca os projetos do Firestore.
 * 
 * @returns {Promise<Project[]>} Lista de projetos
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projects: Project[] = [];
    
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() } as Project);
    });

    // Se não houver projetos no Firebase ainda, retorna os de exemplo para a tela não ficar vazia
    if (projects.length === 0) {
      return [
        {
          id: "1",
          title: "E-Commerce Dashboard",
          description: "Painel administrativo completo com gráficos em tempo real, gestão de inventário e processamento de pedidos.",
          imageUrl: "https://picsum.photos/seed/dashboard/800/600",
          tags: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
          type: "fullstack",
          githubUrl: "https://github.com",
          liveUrl: "https://example.com",
          featured: true
        },
        {
          id: "2",
          title: "API de Pagamentos",
          description: "Microsserviço de pagamentos escalável com integração Stripe, webhooks e conciliação automática.",
          imageUrl: "https://picsum.photos/seed/api/800/600",
          tags: ["Node.js", "Express", "PostgreSQL", "Docker"],
          type: "backend",
          githubUrl: "https://github.com",
          featured: true
        },
        {
          id: "3",
          title: "App de Finanças Pessoais",
          description: "Aplicativo mobile-first para controle financeiro, com categorização inteligente usando IA.",
          imageUrl: "https://picsum.photos/seed/finance/800/600",
          tags: ["React Native", "Expo", "Zustand", "Firebase"],
          type: "frontend",
          githubUrl: "https://github.com",
          liveUrl: "https://example.com",
          featured: true
        },
        {
          id: "4",
          title: "Plataforma EAD",
          description: "Sistema de gerenciamento de aprendizado com suporte a vídeos, quizzes e emissão de certificados.",
          imageUrl: "https://picsum.photos/seed/ead/800/600",
          tags: ["React", "Node.js", "MongoDB", "AWS"],
          type: "fullstack",
          githubUrl: "https://github.com",
          liveUrl: "https://example.com"
        },
        {
          id: "5",
          title: "Social Media Analytics",
          description: "Ferramenta para análise de métricas de redes sociais com geração de relatórios em PDF.",
          imageUrl: "https://picsum.photos/seed/analytics/800/600",
          tags: ["Vue.js", "Python", "FastAPI", "PostgreSQL"],
          type: "fullstack",
          githubUrl: "https://github.com"
        },
        {
          id: "6",
          title: "App de Delivery",
          description: "Aplicativo de entregas com rastreamento em tempo real e integração com Google Maps.",
          imageUrl: "https://picsum.photos/seed/delivery/800/600",
          tags: ["Flutter", "Firebase", "Google Maps API"],
          type: "frontend",
          githubUrl: "https://github.com",
          liveUrl: "https://example.com"
        },
        {
          id: "7",
          title: "Microserviço de Notificações",
          description: "Serviço de envio de emails, SMS e push notifications em massa com alta disponibilidade.",
          imageUrl: "https://picsum.photos/seed/notifications/800/600",
          tags: ["Go", "RabbitMQ", "Redis", "Docker"],
          type: "backend",
          githubUrl: "https://github.com"
        },
        {
          id: "8",
          title: "Portfólio Minimalista",
          description: "Template de portfólio focado em performance e acessibilidade, com pontuação 100 no Lighthouse.",
          imageUrl: "https://picsum.photos/seed/portfolio/800/600",
          tags: ["Astro", "Tailwind CSS", "TypeScript"],
          type: "frontend",
          githubUrl: "https://github.com",
          liveUrl: "https://example.com"
        },
        {
          id: "9",
          title: "Sistema de Reservas",
          description: "Plataforma para agendamento de consultas e serviços com sincronização com Google Calendar.",
          imageUrl: "https://picsum.photos/seed/booking/800/600",
          tags: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
          type: "fullstack",
          githubUrl: "https://github.com",
          liveUrl: "https://example.com"
        }
      ];
    }

    return projects;
  } catch (error) {
    console.error("Erro ao buscar projetos do Firebase:", error);
    return [];
  }
}
