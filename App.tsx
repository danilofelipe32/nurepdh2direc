import React, { useState, useEffect } from 'react';
import { 
    BookOpen, Home, Activity, TrendingUp, Users, Video, Image as ImageIcon, 
    FileText, Award, QrCode, Share2, Info, ArrowRight, ExternalLink, Play,
    Sun, Moon, Menu, X, BookMarked
} from 'lucide-react';
import { SectionWrapper } from './components/SectionWrapper';
import { ChartGroup } from './components/ChartGroup';
import { Timeline } from './components/Timeline';
import { CVModal, ImageModal, VideoModal } from './components/Modals';
import { charts2024, charts2025, timelineEvents, plans, documents, galleryImages, references } from './data';

const App: React.FC = () => {
    const [cvOpen, setCvOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Theme State initialization checking localStorage
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'dark';
        }
        return 'dark';
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            if (mobileMenuOpen) setMobileMenuOpen(false); // Close menu on scroll
        };
        window.addEventListener('scroll', handleScroll);
        
        // Apply theme class to html/body
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

        return () => window.removeEventListener('scroll', handleScroll);
    }, [theme, mobileMenuOpen]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const shareLink = async (title: string, url: string) => {
        if (navigator.share) {
            try {
                await navigator.share({ title, url });
            } catch (error) {
                console.log('Error sharing', error);
            }
        } else {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    const videoData = [
        {
            url: "https://drive.google.com/file/d/1r-v9MShjYoGLVXi90s2AvkPyaQ8yFaRO/preview",
            thumb: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop",
            title: "Ações Educativas 2023"
        },
        {
            url: "https://drive.google.com/file/d/1flWtDGONILOhzwHCnF33XzsQosUaITpR/preview",
            thumb: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1000&auto=format&fit=crop",
            title: "Círculos de Paz"
        },
        {
            url: "https://drive.google.com/file/d/1l4BMRWVp8Bt7iN-9TtwJwYauh7Ql9p8h/preview",
            thumb: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000&auto=format&fit=crop",
            title: "Mediação de Conflitos"
        },
        {
            url: "https://drive.google.com/file/d/1emSVCo-wr5Ob2QVqwpVl9PdhCspK_6tp/preview",
            thumb: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop",
            title: "Depoimentos e Impacto"
        },
        {
            url: "https://drive.google.com/file/d/1r-v9MShjYoGLVXi90s2AvkPyaQ8yFaRO/preview",
            thumb: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop",
            title: "Entrevista Rádio Escolar"
        }
    ];

    return (
        <div className="min-h-screen font-sans selection:bg-orange-500/30 transition-colors duration-300">
            
            {/* Navbar Glass */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'dark:bg-slate-900/90 bg-white/90 backdrop-blur-md dark:border-white/5 border-slate-200/50 border-b py-3 shadow-sm' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center relative">
                    <div className="dark:text-white text-slate-800 font-bold text-lg tracking-wider flex items-center gap-2 z-20">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        NUREPDH
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-3">
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

                    {/* Mobile Hamburger Button */}
                    <button 
                        className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors z-20"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Abrir menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Mobile Menu Overlay */}
                    {mobileMenuOpen && (
                        <div className="md:hidden absolute top-full left-0 right-0 p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 shadow-2xl flex flex-col gap-4 animate-[fade-in-down_0.3s_ease-out]">
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
                
                <div className="relative z-10 container mx-auto px-6 text-center">
                    <div className="animate-[fade-in-up_1s_ease-out]">
                        <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            2ª DIREC/RN
                        </div>
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b dark:from-white dark:to-slate-400 from-slate-900 to-slate-600 mb-8 drop-shadow-2xl">
                            Trajetória NUREPDH
                        </h1>
                        <p className="text-lg sm:text-2xl dark:text-slate-300 text-slate-700 max-w-3xl mx-auto font-light leading-relaxed mb-10">
                            Uma experiência de transformação social: promovendo a <span className="dark:text-white text-slate-900 font-medium border-b border-orange-500/50">Cultura de Paz</span> e <span className="dark:text-white text-slate-900 font-medium border-b border-orange-500/50">Direitos Humanos</span> nas escolas (2023-2025).
                        </p>
                        
                        <div className="flex justify-center gap-4">
                            <button onClick={() => document.getElementById('resumo')?.scrollIntoView({behavior: 'smooth'})} className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center gap-2">
                                Iniciar Leitura <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce dark:text-slate-500 text-slate-400">
                    <ArrowRight className="rotate-90 w-6 h-6" />
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 py-20 space-y-12 max-w-6xl">
                
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

                <SectionWrapper id="fundamentacao" title="2. Fundamentação Teórica" icon={<Info className="w-6 h-6" />}>
                    <p>
                        A construção de uma cultura de paz na escola exige uma abordagem educativa integral. Segundo Xesús R. Jares (1999), 
                        educar para a paz implica desenvolver competências para o diálogo. Edgar Morin (2000) reforça a ética planetária. 
                        A fundamentação apoia-se em espaços escolares seguros e reflexivos onde o respeito às diferenças é prática cotidiana.
                    </p>
                </SectionWrapper>

                <SectionWrapper id="metodologia" title="3. Metodologia" icon={<Activity className="w-6 h-6" />}>
                    <p>
                        A metodologia adotada foi de natureza qualitativa e descritiva, baseada em análise documental dos planos de ação, 
                        relatórios anuais e projetos específicos. Foram utilizados instrumentos de monitoramento como formulários digitais 
                        e protocolos de mediação.
                    </p>
                </SectionWrapper>

                <SectionWrapper id="clima-2024" title="4. Avaliação do Clima Escolar 2024" icon={<TrendingUp className="w-6 h-6" />}>
                    <p className="mb-8 p-4 dark:bg-slate-800/50 bg-blue-50/80 rounded-xl border-l-4 border-blue-500 text-slate-700 dark:text-slate-300">
                        Com base nas respostas de <strong className="dark:text-white text-slate-900">4.271 participantes</strong>, esta avaliação analisa o clima escolar nas instituições da 2ª DIREC.
                    </p>
                    <ChartGroup charts={charts2024} />
                    <div className="mt-8 grid md:grid-cols-2 gap-6 text-sm">
                        <div className="dark:bg-white/5 bg-white p-6 rounded-xl border dark:border-white/5 border-slate-200 shadow-sm backdrop-blur-sm">
                            <h4 className="text-green-500 font-bold mb-2 text-lg flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Pontos Fortes</h4>
                            <p className="dark:text-slate-300 text-slate-600">Clareza nos canais de suporte (86.5%) e ambiente percebido como inclusivo (70.1%).</p>
                        </div>
                        <div className="dark:bg-white/5 bg-white p-6 rounded-xl border dark:border-white/5 border-slate-200 shadow-sm backdrop-blur-sm">
                            <h4 className="text-red-500 font-bold mb-2 text-lg flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Atenção Necessária</h4>
                            <p className="dark:text-slate-300 text-slate-600">Violência presenciada (26.9%) e respeito entre alunos que ocorre apenas "às vezes" (40%).</p>
                        </div>
                    </div>
                </SectionWrapper>

                <SectionWrapper id="clima-2025" title="5. Avaliação do Clima Escolar 2025" icon={<TrendingUp className="w-6 h-6" />}>
                    <p className="mb-8 p-4 dark:bg-slate-800/50 bg-purple-50/80 rounded-xl border-l-4 border-purple-500 text-slate-700 dark:text-slate-300">
                        Dados consolidados de 2025 (<strong className="dark:text-white text-slate-900">1.399 respostas</strong>) mostrando a evolução dos indicadores após intervenções.
                    </p>
                    <ChartGroup charts={charts2025} />
                    <div className="mt-8 grid md:grid-cols-2 gap-6 text-sm">
                        <div className="dark:bg-white/5 bg-white p-6 rounded-xl border dark:border-white/5 border-slate-200 shadow-sm backdrop-blur-sm">
                            <h4 className="text-orange-500 font-bold mb-2 text-lg flex items-center gap-2"><div className="w-2 h-2 bg-orange-500 rounded-full"></div> Avanços Significativos</h4>
                            <p className="dark:text-slate-300 text-slate-600">Sentimento de segurança "Sempre" subiu para 45.2%. Violência presenciada caiu para 21.5%.</p>
                        </div>
                        <div className="dark:bg-white/5 bg-white p-6 rounded-xl border dark:border-white/5 border-slate-200 shadow-sm backdrop-blur-sm">
                            <h4 className="text-blue-500 font-bold mb-2 text-lg flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Consolidação</h4>
                            <p className="dark:text-slate-300 text-slate-600">89.2% sabem a quem recorrer. Conforto em participar aumentou significativamente.</p>
                        </div>
                    </div>
                </SectionWrapper>

                <SectionWrapper id="desenvolvimento" title="6. Desenvolvimento e Resultados" icon={<Award className="w-6 h-6" />} defaultExpanded>
                    <Timeline events={timelineEvents} />
                </SectionWrapper>

                <SectionWrapper id="impactos" title="7. Impactos e Considerações Finais" icon={<FileText className="w-6 h-6" />}>
                    <div className="space-y-6">
                        <p>
                            Os resultados demonstraram fortalecimento do clima escolar, redução dos conflitos interpessoais e ampliação 
                            do sentimento de pertencimento. O legado deste trabalho é um exemplo de que a educação pode ser instrumento 
                            de reconstrução social.
                        </p>
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 p-8 text-white shadow-2xl">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                            <h4 className="font-bold text-2xl mb-2 relative z-10">Referência Estadual</h4>
                            <p className="text-white/90 relative z-10 text-lg">O NUREPDH consolidou-se como modelo, inspirando a portaria SEEC/RN que instituiu núcleos em todas as regionais.</p>
                        </div>
                    </div>
                </SectionWrapper>

                {/* Photos */}
                <section className="py-12">
                    <h2 className="flex items-center text-3xl font-bold dark:text-white text-slate-900 mb-8 pl-4 border-l-4 border-orange-500">
                        <ImageIcon className="w-8 h-8 mr-4 text-orange-500" />
                        <span>Galeria de Momentos</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {galleryImages.slice(0, 12).map((src, idx) => (
                            <div 
                                key={idx} 
                                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer dark:border-white/10 border-slate-200 border bg-slate-200 dark:bg-slate-800 shadow-lg"
                                onClick={() => setSelectedImage(src)}
                            >
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10" />
                                <img 
                                    src={src} 
                                    alt={`Galeria ${idx}`} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                    loading="lazy" 
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Videos */}
                <section className="py-8">
                    <h2 className="flex items-center text-3xl font-bold dark:text-white text-slate-900 mb-8 pl-4 border-l-4 border-blue-500">
                        <Video className="w-8 h-8 mr-4 text-blue-500" />
                        <span>Registros Audiovisuais</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
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
                                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">{video.title}</h3>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Planos e Documentos */}
                <section className="py-8 grid md:grid-cols-2 gap-10">
                    <div>
                        <h2 className="flex items-center text-2xl font-bold dark:text-white text-slate-900 mb-6">
                            <FileText className="w-6 h-6 mr-3 text-orange-500" />
                            Planos de Ação
                        </h2>
                        <div className="space-y-4">
                            {plans.map((plan, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => shareLink(plan.title, plan.url)}
                                    className="relative neon-border-animation group p-5 dark:bg-slate-900 bg-slate-50 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all duration-300"
                                >
                                    <div className="flex justify-between items-center relative z-10">
                                        <span className="font-medium dark:text-slate-200 text-slate-700 group-hover:text-orange-600 dark:group-hover:text-white transition-colors">{plan.title}</span>
                                        <div className="p-2 rounded-full dark:bg-white/5 bg-slate-100 group-hover:bg-orange-500 dark:group-hover:bg-orange-500 text-slate-400 group-hover:text-white transition-all">
                                            <ExternalLink className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="flex items-center text-2xl font-bold dark:text-white text-slate-900 mb-6">
                            <FileText className="w-6 h-6 mr-3 text-orange-500" />
                            Documentos
                        </h2>
                        <div className="space-y-4">
                            {documents.map((doc, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => shareLink(doc.title, doc.url)}
                                    className="relative neon-border-animation group p-5 dark:bg-slate-900 bg-slate-50 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all duration-300"
                                >
                                    <div className="flex justify-between items-center relative z-10">
                                        <span className="font-medium dark:text-slate-200 text-slate-700 group-hover:text-orange-600 dark:group-hover:text-white transition-colors">{doc.title}</span>
                                        <div className="p-2 rounded-full dark:bg-white/5 bg-slate-100 group-hover:bg-orange-500 dark:group-hover:bg-orange-500 text-slate-400 group-hover:text-white transition-all">
                                            <ExternalLink className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <SectionWrapper id="referencias" title="Referências" icon={<BookMarked className="w-6 h-6" />}>
                    <ul className="space-y-4">
                        {references.map((ref, idx) => (
                            <li key={idx} className="flex gap-3 text-base dark:text-slate-400 text-slate-600 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5 shrink-0"></span>
                                <span>{ref}</span>
                            </li>
                        ))}
                    </ul>
                </SectionWrapper>

                {/* QR Code */}
                <section className="py-20 flex flex-col items-center justify-center text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent rounded-3xl -z-10"></div>
                    <h2 className="flex items-center text-3xl font-bold dark:text-white text-slate-900 mb-8">
                        <QrCode className="w-8 h-8 mr-4 text-orange-500" />
                        Acesse o Aplicativo
                    </h2>
                    <div className="bg-white p-4 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.1)] dark:shadow-[0_0_40px_rgba(0,0,0,0.3)] relative group border border-slate-100">
                        <div className="absolute inset-0 bg-orange-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                        <img src="https://i.imgur.com/5N6Lt0f.png" alt="QR Code" className="w-56 h-56 relative z-10" />
                    </div>
                    <p className="mt-6 dark:text-slate-400 text-slate-600 text-lg">Escaneie para acessar o material completo e dados detalhados.</p>
                </section>
            </main>

            {/* Footer */}
            <footer className="dark:bg-slate-950 bg-slate-100 border-t dark:border-white/5 border-slate-200 py-12 text-center text-slate-500">
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