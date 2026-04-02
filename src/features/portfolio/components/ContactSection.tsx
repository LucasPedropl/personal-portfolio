"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { Button } from "@/src/components/ui/button";
import { Mail, MapPin, Send, Phone, Instagram, Github, Linkedin, MessageCircle } from "lucide-react";

export function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Contato via Portfolio de ${formData.name}`;
    const body = `Nome: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0A${formData.message}`;
    window.location.href = `mailto:pedrolucasmota2005.pl@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-24 px-4 border-t border-zinc-800/50" id="contact">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">{t('contact.title')}</h2>
          <p className="text-zinc-400 max-w-3xl mx-auto text-lg leading-relaxed">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-[#121214] p-8 rounded-2xl border border-zinc-800/50 shadow-xl">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-zinc-400">{t('contact.name')}</label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder={t('contact.name.placeholder')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black border border-zinc-800/50 rounded-lg p-3.5 text-zinc-100 placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-400">{t('contact.email')}</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder={t('contact.email.placeholder')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-black border border-zinc-800/50 rounded-lg p-3.5 text-zinc-100 placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-400">{t('contact.message')}</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder={t('contact.message.placeholder')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-black border border-zinc-800/50 rounded-lg p-3.5 text-zinc-100 placeholder:text-zinc-600 resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <Button type="submit" className="bg-[#6366f1] hover:bg-[#4f46e5] text-white py-6 rounded-lg font-medium flex items-center justify-center gap-2 group transition-colors mt-2">
                {t('contact.send')}
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center gap-10 lg:pl-4"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-zinc-100 mb-8">{t('contact.info')}</h3>
              
              <div className="flex flex-col gap-8 items-center lg:items-start">
                <div className="flex items-center gap-5 text-left w-full max-w-xs lg:max-w-none">
                  <div className="p-4 bg-[#121214] rounded-xl border border-zinc-800/50 text-[#6366f1] shadow-lg shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-500 mb-1">Email</p>
                    <a href="mailto:pedrolucasmota2005.pl@gmail.com" className="text-zinc-200 hover:text-[#6366f1] transition-colors font-medium text-[13px] sm:text-base lg:text-lg truncate block">
                      pedrolucasmota2005.pl@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-5 text-left w-full max-w-xs lg:max-w-none">
                  <div className="p-4 bg-[#121214] rounded-xl border border-zinc-800/50 text-[#6366f1] shadow-lg shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-500 mb-1">{t('contact.phone')}</p>
                    <a href="https://wa.me/5527995176920" target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-[#6366f1] transition-colors font-medium text-sm sm:text-base lg:text-lg truncate block">
                      +55 (27) 99517-6920
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-5 text-left w-full max-w-xs lg:max-w-none">
                  <div className="p-4 bg-[#121214] rounded-xl border border-zinc-800/50 text-[#6366f1] shadow-lg shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-500 mb-1">{t('contact.location')}</p>
                    <p className="text-zinc-200 font-medium text-sm sm:text-base lg:text-lg truncate block">{t('contact.location.value')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <h3 className="text-lg font-bold text-zinc-100 mb-6">{t('contact.social')}</h3>
              <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 flex-wrap">
                <a href="https://github.com/LucasPedropl" target="_blank" rel="noopener noreferrer" className="p-3 sm:p-4 bg-[#121214] rounded-xl border border-zinc-800/50 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all shadow-lg hover:-translate-y-1">
                  <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="https://www.linkedin.com/in/pedro-lucas-silva-mota-769a70267/" target="_blank" rel="noopener noreferrer" className="p-3 sm:p-4 bg-[#121214] rounded-xl border border-zinc-800/50 text-zinc-400 hover:text-[#0a66c2] hover:border-[#0a66c2]/50 transition-all shadow-lg hover:-translate-y-1">
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="https://www.instagram.com/lucaspedropl_/" target="_blank" rel="noopener noreferrer" className="p-3 sm:p-4 bg-[#121214] rounded-xl border border-zinc-800/50 text-zinc-400 hover:text-[#e1306c] hover:border-[#e1306c]/50 transition-all shadow-lg hover:-translate-y-1">
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="https://wa.me/5527995176920" target="_blank" rel="noopener noreferrer" className="p-3 sm:p-4 bg-[#121214] rounded-xl border border-zinc-800/50 text-zinc-400 hover:text-[#25D366] hover:border-[#25D366]/50 transition-all shadow-lg hover:-translate-y-1">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="mailto:pedrolucasmota2005.pl@gmail.com" className="p-3 sm:p-4 bg-[#121214] rounded-xl border border-zinc-800/50 text-zinc-400 hover:text-[#ea4335] hover:border-[#ea4335]/50 transition-all shadow-lg hover:-translate-y-1">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
