"use client";

import { useState, useEffect } from "react";
import { auth, db, googleProvider } from "@/src/lib/firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { Project } from "@/src/features/portfolio/types";
import { Pencil, Trash2, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const ADMIN_EMAIL = "pedrolucasmota2005@gmail.com";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    description: "",
    descriptionEn: "",
    imageUrl: "",
    tags: "",
    type: "frontend",
    githubUrl: "",
    liveUrl: "",
    featured: false
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: "", titleEn: "", description: "", descriptionEn: "", imageUrl: "", tags: "", type: "frontend", githubUrl: "", liveUrl: "", featured: false });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projs: Project[] = [];
      querySnapshot.forEach((doc) => {
        projs.push({ id: doc.id, ...doc.data() } as Project);
      });
      setProjects(projs);
    } catch (error) {
      console.error("Erro ao buscar projetos", error);
    }
  };

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email === ADMIN_EMAIL) {
        fetchProjects();
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!auth || !googleProvider) return;
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };

  const handleLogout = () => {
    if (auth) signOut(auth);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.email !== ADMIN_EMAIL) return;

    setIsSubmitting(true);
    setMessage(null);
    try {
      const projectData = {
        ...formData,
        tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
        updatedAt: new Date().toISOString()
      };
      
      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), projectData);
        setMessage({ text: "Projeto atualizado com sucesso!", type: "success" });
        setEditingId(null);
      } else {
        await addDoc(collection(db, "projects"), {
          ...projectData,
          createdAt: new Date().toISOString()
        });
        setMessage({ text: "Projeto adicionado com sucesso!", type: "success" });
      }
      
      setFormData({ title: "", titleEn: "", description: "", descriptionEn: "", imageUrl: "", tags: "", type: "frontend", githubUrl: "", liveUrl: "", featured: false });
      fetchProjects();
      closeModal();
    } catch (error) {
      console.error("Erro ao salvar projeto", error);
      setMessage({ text: "Erro ao salvar projeto. Verifique o console.", type: "error" });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      titleEn: project.titleEn || "",
      description: project.description,
      descriptionEn: project.descriptionEn || "",
      imageUrl: project.imageUrl,
      tags: project.tags.join(", "),
      type: project.type,
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      featured: project.featured || false
    });
    setEditingId(project.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      setMessage({ text: "Projeto removido com sucesso!", type: "success" });
      fetchProjects();
    } catch (error) {
      console.error("Erro ao deletar projeto", error);
      setMessage({ text: "Erro ao deletar projeto.", type: "error" });
    } finally {
      setTimeout(() => setMessage(null), 5000);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-zinc-50">Carregando...</div>;
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-zinc-50 gap-6 p-4 text-center">
        <h1 className="text-3xl font-bold">Acesso Restrito</h1>
        <p className="text-zinc-400 max-w-md">
          Esta página é restrita para a administração do portfólio. Faça login com a conta autorizada para continuar.
        </p>
        <Button onClick={handleLogin} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Login com Google
        </Button>
        {user && user.email !== ADMIN_EMAIL && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mt-4 max-w-md">
            A conta <strong>{user.email}</strong> não tem permissão de administrador.
          </div>
        )}
        {user && (
          <Button variant="outline" onClick={handleLogout} className="border-zinc-700 text-zinc-300">
            Sair da conta atual
          </Button>
        )}
        <Link href="/" className="text-indigo-400 hover:underline mt-8">
          Voltar para o Portfólio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8 text-zinc-50">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-10 mt-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-zinc-400 text-sm mt-1">Logado como {user.email}</p>
          </div>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                Ver Site
              </Button>
            </Link>
            <Button variant="destructive" onClick={handleLogout}>Sair</Button>
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/50 text-green-400' : 'bg-red-500/10 border border-red-500/50 text-red-400'}`}>
            {message.text}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-zinc-100">Projetos Cadastrados</h2>
          <Button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2">
            <Plus className="w-4 h-4" /> Novo Projeto
          </Button>
        </div>

        <div className="flex flex-col gap-4 mb-20">
          {projects.length === 0 ? (
            <p className="text-zinc-500 bg-zinc-900/30 p-8 rounded-xl border border-zinc-800/50 text-center">
              Nenhum projeto cadastrado ainda.
            </p>
          ) : (
            projects.map(project => (
              <div key={project.id} className="flex items-center justify-between bg-zinc-900/50 p-5 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div>
                  <h3 className="font-semibold text-zinc-100 text-lg">{project.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                      {project.type}
                    </span>
                    <span className="text-sm text-zinc-500 truncate max-w-[200px] sm:max-w-xs">
                      {project.tags.join(", ")}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleEdit(project)} 
                    className="border-zinc-700 text-zinc-300 hover:text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-500/50"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleDelete(project.id)} 
                    className="border-zinc-700 text-zinc-300 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                    title="Deletar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal de Cadastro/Edição */}
        <AnimatePresence>
          {isModalOpen && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={closeModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
              >
                <div className="flex justify-between items-center p-6 border-b border-zinc-800 bg-zinc-900/50">
                  <h2 className="text-xl font-semibold text-indigo-400">
                    {editingId ? "Editar Projeto" : "Adicionar Novo Projeto"}
                  </h2>
                  <button onClick={closeModal} className="text-zinc-400 hover:text-zinc-100 transition-colors p-1 rounded-md hover:bg-zinc-800">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="overflow-y-auto p-6">
                  <form id="project-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-zinc-400">Título do Projeto (PT)</label>
                        <input type="text" required className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-zinc-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-zinc-400">Project Title (EN)</label>
                        <input type="text" className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-zinc-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-zinc-400">Descrição (PT)</label>
                        <textarea required className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-zinc-100 h-32 resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-zinc-400">Description (EN)</label>
                        <textarea className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-zinc-100 h-32 resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" value={formData.descriptionEn} onChange={e => setFormData({...formData, descriptionEn: e.target.value})} />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-zinc-400">URL da Imagem de Capa (Fallback)</label>
                      <input type="url" required className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-zinc-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-zinc-400">Tags (separadas por vírgula)</label>
                      <input type="text" placeholder="Ex: React, Node.js, Tailwind" required className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-zinc-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-zinc-400">Tipo de Projeto</label>
                      <select className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-zinc-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="fullstack">Fullstack</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-zinc-400">URL do GitHub (Opcional)</label>
                        <input type="url" className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-zinc-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-zinc-400">URL do Deploy (Opcional)</label>
                        <input type="url" className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-zinc-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} placeholder="Ex: https://meu-app.com" />
                        <p className="text-xs text-zinc-500">Se preenchido, o site será exibido como miniatura.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <input 
                        type="checkbox" 
                        id="featured" 
                        className="w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-zinc-950"
                        checked={formData.featured}
                        onChange={e => setFormData({...formData, featured: e.target.checked})}
                      />
                      <label htmlFor="featured" className="text-sm font-medium text-zinc-300 cursor-pointer">
                        Destacar na página inicial (Máx 3)
                      </label>
                    </div>
                  </form>
                </div>
                
                <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 flex justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={closeModal} className="text-zinc-300 hover:text-white hover:bg-zinc-800">
                    Cancelar
                  </Button>
                  <Button type="submit" form="project-form" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    {isSubmitting ? "Salvando..." : (editingId ? "Atualizar Projeto" : "Salvar Projeto")}
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
