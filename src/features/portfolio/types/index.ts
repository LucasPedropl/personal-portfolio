/**
 * Representa a estrutura de um projeto no portfólio.
 */
export interface Project {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  imageUrl: string;
  tags: string[];
  type: 'frontend' | 'backend' | 'fullstack';
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}
