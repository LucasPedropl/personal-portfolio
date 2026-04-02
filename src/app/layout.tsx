import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { LanguageProvider } from '@/src/contexts/LanguageContext';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Meu Portfólio | Desenvolvedor Full-Stack',
  description: 'Portfólio pessoal exibindo projetos frontend e backend.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable} dark`} data-scroll-behavior="smooth">
      <body className="font-sans bg-black text-zinc-50 antialiased" suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
