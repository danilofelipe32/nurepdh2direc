

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
    BookOpen, Home, Activity, TrendingUp, Users, Video, Image as ImageIcon, 
    FileText, Award, QrCode, Share2, Info, ArrowRight, ExternalLink, Play,
    Sun, Moon, Menu, X, BookMarked, Target, Search, Instagram, FolderOpen
} from 'lucide-react';
import { SectionWrapper } from './components/SectionWrapper';
import { ChartGroup } from './components/ChartGroup';
import { Timeline } from './components/Timeline';
import { CVModal, ImageModal, VideoModal } from './components/Modals';
import { MorphingCardStack, CardData } from './components/ui/morphing-card-stack';
import { charts2024, charts2025, timelineEvents, plans, documents, galleryImages, references } from './data';

// Interface para itens de busca
interface SearchItem {
    id: string;
    title: string;
    content: string;
    type: 'Seção' | 'Gráfico' | 'Evento' | 'Documento' | 'Vídeo';
}

const App: React.FC = () => {
    const [cvOpen, setCvOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Search State
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Theme State initialization checking localStorage
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'dark';
        }
        return 'dark';
    });

    // Construção do Índice de Busca
    const searchIndex: SearchItem[] = useMemo(() => {
        const items: SearchItem[] = [
            // Conteúdo Estático (Manual)
            { id: 'resumo', title: 'Resumo', type: 'Seção', content: 'Trajetória de três anos do Núcleo Regional de Educação para a Paz e Direitos Humanos. Transformação significativa nas escolas, integração comunitária, redução de conflitos.' },
            { id: 'introducao', title: '1. Introdução', type: 'Seção', content: 'Relatório consolidado 2023-2025. NUEEPDHs, multiplicadoras, 41 escolas, práticas restaurativas, formações continuadas.' },
            { id: 'objetivo', title: '2. Objetivo Geral', type: 'Seção', content: 'Promover cultura de não violência, fortalecer vínculos, cuidado emocional, convivência pacífica, justiça restaurativa.' },
            { id: 'fundamentacao', title: '3. Fundamentação Teórica', type: 'Seção', content: 'Xesús R. Jares, Edgar Morin. Educar para a paz, competências para o diálogo, ética planetária, espaços escolares seguros.' },
            { id: 'metodologia', title: '4. Metodologia', type: 'Seção', content: 'Natureza qualitativa e descritiva, análise documental, planos de ação, relatórios anuais, formulários digitais.' },
            { id: 'clima-2024', title: '5. Avaliação do Clima Escolar 2024', type: 'Seção', content: 'Diagnóstico com 4.271 participantes. Pontos fortes e atenção necessária.' },
            { id: 'clima-2025', title: '6. Avaliação do Clima Escolar 2025', type: 'Seção', content: 'Resultados com 1.399 respostas. Avanços significativos e consolidação.' },
            { id: 'desenvolvimento', title: '7. Desenvolvimento e Resultados', type: 'Seção', content: 'Timeline, linha do tempo, marcos históricos do projeto.' },
            { id: 'impactos', title: '8. Impactos e Considerações', type: 'Seção', content: 'Fortalecimento do clima escolar, redução de conflitos, referência estadual, portaria SEEC/RN.' },
            { id: 'galeria', title: 'Galeria de Momentos', type: 'Seção', content: 'Fotos, imagens e registros visuais das ações.' },
            { id: 'referencias', title: 'Referências Bibliográficas', type: 'Seção', content: 'Bibliografia, autores, leis e bases teóricas.' },
        ];

        // Dados Dinâmicos
        charts2024.forEach(c => items.push({ id: 'clima-2024', title: c.title, type: 'Gráfico', content: c.summary || '' }));
        charts2025.forEach(c => items.push({ id: 'clima-2025', title: c.title, type: 'Gráfico', content: c.summary || '' }));
        timelineEvents.forEach(e => items.push({ id: 'desenvolvimento', title: `${e.year} - ${e.title}`, type: 'Evento', content: e.description }));
        plans.forEach(p => items.push({ id: 'planos', title: p.title, type: 'Documento', content: 'Plano de ação estratégico.' }));
        documents.forEach(d => items.push({ id: 'planos', title: d.title, type: 'Documento', content: 'Material de apoio e protocolos.' }));

        return items;
    }, []);

    const filteredResults = useMemo(() => {
        if (!searchQuery) return [];
        const q = searchQuery.toLowerCase();
        return searchIndex.filter(item => 
            item.title.toLowerCase().includes(q) || 
            item.content.toLowerCase().includes(q)
        );
    }, [searchQuery, searchIndex]);

    // Prepare Cards for MorphingStack
    const documentCards: CardData[] = useMemo(() => {
        const planCards = plans.map((p, i) => ({
            id: `plan-${i}`,
            title: p.title,
            description: "Plano de ação estratégico para implementação das metodologias do NUREPDH nas escolas.",
            url: p.url,
            icon: <Target className="w-6 h-6" />,
            color: "#f97316", // Orange
            category: "Plano"
        }));

        const docCards = documents.map((d, i) => ({
            id: `doc-${i}`,
            title: d.title,
            description: "Documentação oficial, protocolos e relatórios de acompanhamento das atividades.",
            url: d.url,
            icon: <FileText className="w-6 h-6" />,
            color: "#3b82f6", // Blue
            category: "Documento"
        }));

        return [...planCards, ...docCards];
    }, []);

    const handleCardClick = (card: CardData) => {
        // A navegação agora é gerenciada nativamente pelo componente MorphingCardStack
        // Isso permite comportamento padrão de links (middle click, hover, etc)
        console.log("Card acessado:", card.title);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            if (mobileMenuOpen) setMobileMenuOpen(false);
        };
        
        // Atalho de teclado para abrir busca (Ctrl+K ou Cmd+K)
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setSearchOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('keydown', handleKeyDown);
        
        const root = document.documentElement;
        const body = document.body;
        if (theme === 'dark') {
            root.classList.add('dark');
            body.classList.add('dark');
        } else {
            root.classList.remove('dark');
            body.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [theme, mobileMenuOpen]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        setMobileMenuOpen(false);
        setSearchOpen(false); // Fecha a busca ao navegar
    };

    const getOptimizedImgurUrl = (url: string) => {
        return url.replace(/(\.[^.]+)$/, 'l$1');
    };

    const navItems = [
        { id: 'resumo', label: 'Resumo' },
        { id: 'clima-2024', label: 'Diagnóstico' },
        { id: 'clima-2025', label: 'Resultados' },
        { id: 'desenvolvimento', label: 'Trajetória' },
        { id: 'galeria', label: 'Galeria' },
        { id: 'planos', label: 'Documentos' },
    ];

    const videoData = [
        {
            url: "https://drive.google.com/file/d/1r-v9MShjYoGLVXi90s2AvkPyaQ8yFaRO/preview",
            thumb: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop",
            title: "Formações e justiça restaurativa"
        },
        {
            url: "https://drive.google.com/file/d/1flWtDGONILOhzwHCnF33XzsQosUaITpR/preview",
            thumb: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1000&auto=format&fit=crop",
            title: "Projeto Trilhando a Paz - NUREPDH 2ª DIREC/MP RN e Escola Estadual Francisco Barbosa"
        },
        {
            url: "https://drive.google.com/file/d/1l4BMRWVp8Bt7iN-9TtwJwYauh7Ql9p8h/preview",
            thumb: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000&auto=format&fit=crop",
            title: "Embaixadores da Paz - Escola Estadual Dr. Antônio de Souza"
        },
        {
            url: "https://drive.google.com/file/d/1emSVCo-wr5Ob2QVqwpVl9PdhCspK_6tp/preview",
            thumb: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop",
            title: "Cerimônia de posse - Alunos Embaixadores da Paz"
        },
        {
            url: "https://drive.google.com/file/d/1avm8DrXCy15Zgy9W05zvIMbVif81Ter1/preview",
            thumb: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop",
            title: "Relato de Experiência: Protagonismo Juvenil e Cultura de Paz - CEEP Lourdinha Guerra."
        }
    ];

    return (
        <div className="min-h-screen font-sans selection:bg-orange-500/30 transition-colors duration-300">
            
            {/* Search Modal Overlay */}
            {searchOpen && (
                <div 
                    className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-[fade-in_0.2s_ease-out]"
                    onClick={() => setSearchOpen(false)}
                >
                    <div 
                        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border dark:border-white/10 border-slate-200 overflow-hidden flex flex-col max-h-[70vh] animate-[scale-in_0.2s_cubic-bezier(0.16,1,0.3,1)]"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Search Input Header */}
                        <div className="flex items-center p-4 border-b dark:border-white/10 border-slate-200 relative">
                            <Search className="w-5 h-5 text-slate-400 absolute left-6" />
                            <input 
                                autoFocus
                                type="text" 
                                placeholder="Buscar conteúdo, gráficos ou eventos..." 
                                className="w-full bg-transparent pl-10 pr-10 py-2 outline-none dark:text-white text-slate-800 placeholder:text-slate-400 font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button 
                                onClick={() => setSearchOpen(false)}
                                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                            >
                                <X size={18} className="inline" />
                            </button>
                        </div>

                        {/* Search Results */}
                        <div className="overflow-y-auto p-2">
                            {searchQuery.length > 0 ? (
                                filteredResults.length > 0 ? (
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-slate-400 px-3 py-2 uppercase tracking-wider">
                                            {filteredResults.length} resultados encontrados
                                        </p>
                                        {filteredResults.map((item, idx) => (
                                            <button
                                                key={`${item.id}-${idx}`}
                                                onClick={() => scrollToSection(item.id)}
                                                className="w-full text-left p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group flex items-start gap-3"
                                            >
                                                <div className="mt-1 p-1.5 rounded-lg bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                                    {item.type === 'Gráfico' ? <TrendingUp size={14} /> : 
                                                     item.type === 'Evento' ? <Activity size={14} /> :
                                                     item.type === 'Documento' ? <FileText size={14} /> :
                                                     <BookOpen size={14} />}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm group-hover:text-orange-500 transition-colors flex items-center gap-2">
                                                        {item.title}
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 font-normal">{item.type}</span>
                                                    </h4>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                                        {item.content}
                                                    </p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center text-slate-500 dark:text-slate-400">
                                        <Search size={32} className="mx-auto mb-3 opacity-20" />
                                        <p>Nenhum resultado encontrado para "{searchQuery}"</p>
                                    </div>
                                )
                            ) : (
                                <div className="py-12 text-center text-slate-500 dark:text-slate-400">
                                    <p className="text-sm">Digite para pesquisar em toda a apresentação</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Navbar Glass */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'dark:bg-slate-900/90 bg-white/90 backdrop-blur-md dark:border-white/5 border-slate-200/50 border-b py-3 shadow-sm' : 'bg-transparent py-4 sm:py-6'}`}>
                <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center relative">
                    <div 
                        className="dark:text-white text-slate-800 font-bold text-lg tracking-wider flex items-center gap-2 z-20 cursor-pointer"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        NUREPDH
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="hidden lg:flex items-center gap-6 mr-4 border-r dark:border-white/10 border-slate-300 pr-6 h-6">
                            {navItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="text-sm font-medium dark:text-slate-300 text-slate-600 hover:text-orange-500 dark:hover:text-white transition-colors relative group"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
                                </button>
                            ))}
                        </div>

                        {/* Search Trigger Button */}
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="p-2 rounded-full dark:bg-white/10 bg-slate-200 dark:text-slate-200 text-slate-600 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-all duration-300 border dark:border-white/10 border-transparent group"
                            aria-label="Pesquisar"
                        >
                            <Search size={18} className="group-hover:scale-110 transition-transform" />
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full dark:bg-white/10 bg-slate-200 dark:text-slate-200 text-slate-600 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-all duration-300 border dark:border-white/10 border-transparent"
                            aria-label="Alternar tema"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <button 
                            onClick={() => setCvOpen(true)}
                            className="px-4 py-2 dark:bg-white/10 bg-slate-100 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 backdrop-blur-md border dark:border-white/10 border-slate-200 rounded-full text-sm font-medium dark:text-slate-200 text-slate-700 transition-all duration-300 flex items-center gap-2 group"
                        >
                            <Users size={16} />
                            <span className="hidden sm:inline">Autoras</span>
                        </button>
                    </div>

                    {/* Mobile Controls */}
                    <div className="md:hidden flex items-center gap-3 z-20">
                         <button
                            onClick={() => setSearchOpen(true)}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                        >
                            <Search size={22} />
                        </button>

                        <button 
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Abrir menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Menu Overlay */}
                    {mobileMenuOpen && (
                        <div className="md:hidden absolute top-full left-0 right-0 p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 shadow-2xl flex flex-col gap-3 animate-[fade-in-down_0.3s_ease-out] max-h-[80vh] overflow-y-auto">
                            {navItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 text-left text-slate-700 dark:text-slate-200 font-medium active:scale-95 transition-transform hover:bg-slate-100 dark:hover:bg-white/10"
                                >
                                    {item.label}
                                </button>
                            ))}

                            <div className="h-px bg-slate-200 dark:bg-white/10 my-2"></div>

                            <button 
                                onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
                                className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 font-medium active:scale-95 transition-transform"
                            >
                                <span className="flex items-center gap-3">
                                    {theme === 'dark' ? <Sun size={20} className="text-orange-500" /> : <Moon size={20} className="text-blue-500" />}
                                    <span>{theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}</span>
                                </span>
                            </button>
                            <button 
                                onClick={() => { setCvOpen(true); setMobileMenuOpen(false); }}
                                className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 font-medium active:scale-95 transition-transform"
                            >
                                <span className="flex items-center gap-3">
                                    <Users size={20} className="text-orange-500" />
                                    <span>Sobre as Autoras</span>
                                </span>
                                <ArrowRight size={16} className="opacity-50" />
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Header / Hero */}
            <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://i.imgur.com/JCgD9ej.png" 
                        className="w-full h-full object-cover opacity-40 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
                        alt="Background"
                    />
                    <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-slate-950/80 dark:via-slate-900/80 dark:to-slate-950 bg-gradient-to-b from-white/80 via-slate-100/80 to-slate-50"></div>
                </div>
                
                <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
                    <div className="animate-[fade-in-up_1s_ease-out]">
                        <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            2ª DIREC/RN
                        </div>
                        
                        {/* Título Atualizado com 2 cores e animação e Z-INDEX AJUSTADO */}
                        <h1 className="relative z-50 text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-8 drop-shadow-2xl max-w-6xl mx-auto leading-tight">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-b dark:from-slate-100 dark:to-slate-400 from-slate-900 to-slate-600 pb-2">
                                A cultura de paz como prática institucional:
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 animate-[pulse_4s_ease-in-out_infinite] pb-4">
                                identidade pedagógica da 2ª DIREC
                            </span>
                        </h1>

                        <p className="text-base sm:text-2xl dark:text-slate-300 text-slate-700 max-w-3xl mx-auto font-light leading-relaxed mb-10">
                            Uma experiência de transformação social: promovendo a <span className="dark:text-white text-slate-900 font-medium border-b border-orange-500/50">Cultura de Paz</span> e <span className="dark:text-white text-slate-900 font-medium border-b border-orange-500/50">Direitos Humanos</span> nas escolas (2023-2026).
                        </p>
                        
                        <div className="flex justify-center gap-4">
                            <button onClick={() => scrollToSection('resumo')} className="px-6 py-3 sm:px-8 sm:py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center gap-2 text-sm sm:text-base">
                                Iniciar Leitura <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce dark:text-slate-500 text-slate-400 cursor-pointer" onClick={() => scrollToSection('resumo')}>
                    <ArrowRight className="rotate-90 w-6 h-6" />
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-8 sm:space-y-12 max-w-6xl">
                
                <SectionWrapper id="resumo" title="Resumo" icon={<Home className="w-6 h-6" />} defaultExpanded>
                    <p>
                        Este projeto apresenta a trajetória de três anos do Núcleo Regional de Educação para a Paz e Direitos Humanos (NUREPDH) da 2ª DIREC/RN. 
                        A experiência foi pioneira no estado e inspirou a institucionalização de núcleos em todas as 16 regionais. 
                        Os resultados expressam uma transformação significativa nas escolas, com maior integração comunitária, fortalecimento de vínculos e redução de conflitos.
                    </p>
                </SectionWrapper>

                <SectionWrapper id="introducao" title="1. Introdução" icon={<BookOpen className="w-6 h-6" />}>
                    <p>
                        O presente relatório consolidado reúne as ações desenvolvidas pelo NUREPDH da 2ª DIREC entre os anos de 2023 e 2025. 
                        A partir da criação dos NUEEPDHs, o trabalho das multiplicadoras passou a abranger 41 escolas, articulando práticas restaurativas, 
                        formações continuadas e projetos de protagonismo juvenil.
                    </p>
                </SectionWrapper>

                <SectionWrapper id="objetivo" title="2. Objetivo Geral" icon={<Target className="w-6 h-6" />}>
                    <p>
                        Promover uma cultura de não violência no ambiente escolar, fortalecendo vínculos, o cuidado emocional e a convivência pacífica, por meio de ações integradas de educação para a paz, justiça restaurativa, saúde mental, protagonismo juvenil e fortalecimento da rede escola-família.
                    </p>
                </SectionWrapper>

                <SectionWrapper id="fundamentacao" title="3. Fundamentação Teórica" icon={<Info className="w-6 h-6" />}>
                    <p>
                        A construção de uma cultura de paz na escola exige uma abordagem educativa integral. Segundo Xesús R. Jares (1999), 
                        educar para a paz implica desenvolver competências para o diálogo. Edgar Morin (2000) reforça a ética planetária. 
                        A fundamentação apoia-se em espaços escolares seguros e reflexivos onde o respeito às diferenças é prática cotidiana.
                    </p>
                </SectionWrapper>

                <SectionWrapper id="metodologia" title="4. Metodologia" icon={<Activity className="w-6 h-6" />}>
                    <p>
                        A metodologia adotada foi de natureza qualitativa e descritiva, baseada em análise documental dos planos de ação, 
                        relatórios anuais e projetos específicos. Foram utilizados instrumentos de monitoramento como formulários digitais 
                        e protocolos de mediação.
                    </p>
                </SectionWrapper>

                <SectionWrapper id="clima-2024" title="5. Avaliação do Clima Escolar 2024" icon={<TrendingUp className="w-6 h-6" />}>
                    <p className="mb-8 p-4 dark:bg-slate-800/50 bg-blue-50/80 rounded-xl border-l-4 border-blue-500 text-slate-700 dark:text-slate-300">
                        Com base nas respostas de <strong className="dark:text-white text-slate-900">4.271 participantes</strong>, esta avaliação analisa o clima escolar nas instituições da 2ª DIREC.
                    </p>
                    <ChartGroup charts={charts2024} />
                    <div className="mt-8 grid md:grid-cols-2 gap-6 text-sm">
                        <div className="dark:bg-white/5 bg-white p-6 rounded-xl border dark:border-white/5 border-slate-200 shadow-sm backdrop-blur-sm">
                            <h4 className="text-green-500 font-bold mb-2 text-lg flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Pontos Fortes</h4>
                            <p className="dark:text-slate-300 text-slate-600 leading-relaxed">
                                A clareza sobre os canais de suporte foi um destaque positivo, com 86,5% dos participantes afirmando saber a quem recorrer em situações de conflito. Além disso, o ambiente escolar demonstrou-se acolhedor, sendo percebido como inclusivo por 70,1% da comunidade. As relações institucionais também se mostraram sólidas, com 80,78% relatando respeito frequente entre professores e funcionários.
                            </p>
                        </div>
                        <div className="dark:bg-white/5 bg-white p-6 rounded-xl border dark:border-white/5 border-slate-200 shadow-sm backdrop-blur-sm">
                            <h4 className="text-red-500 font-bold mb-2 text-lg flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Atenção Necessária</h4>
                            <p className="dark:text-slate-300 text-slate-600 leading-relaxed">
                                O cenário revelou desafios críticos: 26,9% dos respondentes presenciaram ou sofreram violência, e o respeito entre alunos foi classificado como instável ("às vezes") por 45,19%. Um dado alarmante foi a percepção sobre o bullying, onde 80% sentiram falta de suporte específico da escola, indicando uma lacuna urgente nas estratégias de intervenção.
                            </p>
                        </div>
                    </div>
                </SectionWrapper>

                <SectionWrapper id="clima-2025" title="6. Avaliação do Clima Escolar 2025" icon={<TrendingUp className="w-6 h-6" />}>
                    <p className="mb-8 p-4 dark:bg-slate-800/50 bg-purple-50/80 rounded-xl border-l-4 border-purple-500 text-slate-700 dark:text-slate-300">
                        Dados consolidados de 2025 (<strong className="dark:text-white text-slate-900">1.399 respostas</strong>) mostrando a evolução dos indicadores após intervenções.
                    </p>
                    <ChartGroup charts={charts2025} />
                    <div className="mt-8 grid md:grid-cols-2 gap-6 text-sm">
                        <div className="dark:bg-white/5 bg-white p-6 rounded-xl border dark:border-white/5 border-slate-200 shadow-sm backdrop-blur-sm">
                            <h4 className="text-orange-500 font-bold mb-2 text-lg flex items-center gap-2"><div className="w-2 h-2 bg-orange-500 rounded-full"></div> Avanços Significativos</h4>
                            <p className="dark:text-slate-300 text-slate-600 leading-relaxed">
                                Houve uma melhora substancial na sensação de segurança, com o índice "Sempre" subindo para 45,2%. A incidência de violência presenciada caiu para 21,5%, e a frequência diária desses atos reduziu pela metade (10,5%). Destaca-se o salto na percepção de suporte ao bullying, que saiu de 19% para 44,6%, refletindo a eficácia das novas políticas implementadas.
                            </p>
                        </div>
                        <div className="dark:bg-white/5 bg-white p-6 rounded-xl border dark:border-white/5 border-slate-200 shadow-sm backdrop-blur-sm">
                            <h4 className="text-blue-500 font-bold mb-2 text-lg flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Consolidação</h4>
                            <p className="dark:text-slate-300 text-slate-600 leading-relaxed">
                                A rede de apoio se fortaleceu, com 89,2% sabendo exatamente a quem recorrer. O engajamento discente cresceu, com 45,5% sentindo-se sempre confortáveis em participar. A cultura de respeito institucional atingiu quase 90%, e a percepção de um ambiente inclusivo consolidou-se em 79,3%, demonstrando o enraizamento das práticas restaurativas.
                            </p>
                        </div>
                    </div>
                </SectionWrapper>

                <SectionWrapper id="desenvolvimento" title="7. Desenvolvimento e Resultados" icon={<Award className="w-6 h-6" />} defaultExpanded>
                    <Timeline events={timelineEvents} />
                </SectionWrapper>

                <SectionWrapper id="impactos" title="8. Impactos e Considerações Finais" icon={<FileText className="w-6 h-6" />}>
                    <div className="space-y-6">
                        <p>
                            Os resultados demonstraram fortalecimento do clima escolar, redução dos conflitos interpessoais e ampliação 
                            do sentimento de pertencimento. O legado deste trabalho é um exemplo de que a educação pode ser instrumento 
                            de reconstrução social.
                        </p>
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 p-6 sm:p-8 text-white shadow-2xl">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                            <h4 className="font-bold text-xl sm:text-2xl mb-2 relative z-10">Referência Estadual</h4>
                            <p className="text-white/90 relative z-10 text-base sm:text-lg">O NUREPDH consolidou-se como modelo, inspirando a portaria SEEC/RN que instituiu núcleos em todas as regionais.</p>
                        </div>
                    </div>
                </SectionWrapper>

                {/* Photos */}
                <section id="galeria" className="py-8 sm:py-12">
                    <h2 className="flex items-center text-2xl sm:text-3xl font-bold dark:text-white text-slate-900 mb-6 sm:mb-8 pl-4 border-l-4 border-orange-500">
                        <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 text-orange-500" />
                        <span>Galeria de Momentos</span>
                    </h2>
                    {/* Alteração: grid-cols-2 no mobile (padrao) e grid-cols-3 no desktop */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {galleryImages.slice(0, 12).map((src, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer dark:border-white/10 border-slate-200 border bg-slate-200 dark:bg-slate-800 shadow-lg"
                                onClick={() => setSelectedImage(src)}
                            >
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10" />
                                <img 
                                    src={getOptimizedImgurUrl(src)} 
                                    alt={`Galeria ${idx}`} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                    loading="lazy"
                                    decoding="async"
                                    fetchPriority="low"
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Videos */}
                <section className="py-8">
                    <h2 className="flex items-center text-2xl sm:text-3xl font-bold dark:text-white text-slate-900 mb-6 sm:mb-8 pl-4 border-l-4 border-blue-500">
                        <Video className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 text-blue-500" />
                        <span>Registros Audiovisuais</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                         {videoData.map((video, idx) => (
                             <div 
                                key={idx} 
                                className="aspect-video bg-slate-900 rounded-2xl overflow-hidden border dark:border-white/10 border-slate-200 shadow-2xl relative group cursor-pointer"
                                onClick={() => setSelectedVideo(video.url)}
                             >
                                <img 
                                    src={video.thumb} 
                                    alt={video.title} 
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                        <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white ml-1" />
                                    </div>
                                    <h3 className="mt-4 px-4 text-center text-sm sm:text-lg font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">{video.title}</h3>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Planos e Documentos REPLACED WITH MORPHING STACK */}
                <section id="planos" className="py-8">
                    <h2 className="flex items-center text-2xl sm:text-3xl font-bold dark:text-white text-slate-900 mb-6 sm:mb-8 pl-4 border-l-4 border-orange-500">
                        <FolderOpen className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 text-orange-500" />
                        <span>Documentos e Planos</span>
                    </h2>
                    <MorphingCardStack 
                        cards={documentCards} 
                        defaultLayout="stack"
                        onCardClick={handleCardClick}
                    />
                </section>

                <SectionWrapper 
                    id="referencias" 
                    title="Referências" 
                    icon={<BookMarked className="w-6 h-6" />}
                >
                    <ul className="space-y-4">
                        {references.map((ref, idx) => (
                            <li key={idx} className="flex gap-3 text-sm sm:text-base dark:text-slate-400 text-slate-600 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5 shrink-0"></span>
                                <span>{ref}</span>
                            </li>
                        ))}
                    </ul>
                </SectionWrapper>

                {/* QR Code */}
                <section className="py-12 sm:py-20 flex flex-col items-center justify-center text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent rounded-3xl -z-10"></div>
                    <h2 className="flex items-center text-2xl sm:text-3xl font-bold dark:text-white text-slate-900 mb-6 sm:mb-8">
                        <QrCode className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 text-orange-500" />
                        Acesse o Aplicativo
                    </h2>
                    <div className="bg-white p-4 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.1)] dark:shadow-[0_0_40px_rgba(0,0,0,0.3)] relative group border border-slate-100">
                        <div className="absolute inset-0 bg-orange-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                        <img src="https://i.imgur.com/5N6Lt0f.png" alt="QR Code" className="w-40 h-40 sm:w-56 sm:h-56 relative z-10" />
                    </div>
                    <p className="mt-6 dark:text-slate-400 text-slate-600 text-base sm:text-lg">Escaneie para acessar o material completo e dados detalhados.</p>
                </section>

                {/* Instagram Minimalista */}
                <div className="flex justify-center items-center pb-8">
                    <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-pink-500/50 hover:bg-pink-500/5 transition-all duration-300 shadow-sm"
                    >
                        <Instagram className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-pink-500 transition-colors" />
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-pink-500 transition-colors">Siga-nos no Instagram</span>
                    </a>
                </div>

            </main>

            {/* Footer */}
            <footer className="dark:bg-slate-950 bg-slate-100 border-t dark:border-white/5 border-slate-200 py-8 sm:py-12 text-center text-slate-500">
                <div className="container mx-auto px-6">
                    <p className="text-base font-medium dark:text-slate-400 text-slate-600">Autoras: Albeísa Farias e Terezinha Saraiva</p>
                    <p className="text-sm mt-2">Parnamirim - RN, 2025</p>
                    <div className="mt-8 flex justify-center items-center gap-2 text-xs opacity-50 hover:opacity-100 transition-opacity">
                        <span>Desenvolvido com</span> 
                        <span className="text-red-500">❤</span> 
                        <span>por Danilo Arruda</span>
                    </div>
                </div>
            </footer>

            {/* Modals */}
            <CVModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
            <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
            <VideoModal src={selectedVideo} onClose={() => setSelectedVideo(null)} />
        </div>
    );
};

export default App;
