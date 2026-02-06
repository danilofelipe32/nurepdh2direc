import React from 'react';
import { X, GraduationCap, Briefcase } from 'lucide-react';

interface CVModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md" onClick={onClose}>
            <div 
                className="dark:bg-slate-900/80 bg-white/95 backdrop-blur-xl border dark:border-white/10 border-slate-200 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-5 md:p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-[fade-in-up_0.3s_ease-out]" 
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 p-2 rounded-full dark:bg-white/5 bg-slate-100 text-slate-400 hover:text-white dark:hover:text-white hover:bg-red-500/20 hover:border-red-500/50 border border-transparent transition-all z-20"
                >
                    <X size={24} />
                </button>
                
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 pt-2">Sobre as Autoras</h2>

                <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                    {/* Person 1 */}
                    <div className="space-y-6 dark:bg-white/5 bg-slate-50 p-5 md:p-6 rounded-2xl border dark:border-white/5 border-slate-100">
                        <div className="flex items-center gap-4 md:gap-5 border-b dark:border-white/10 border-slate-200 pb-6">
                            <img src="https://i.imgur.com/lG4TKTk.png" alt="Albeísa" className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-orange-500 p-1 object-cover" />
                            <div>
                                <h3 className="text-lg md:text-xl font-bold dark:text-white text-slate-800">Albeísa Cleyse</h3>
                                <p className="text-orange-500 text-sm font-medium">Batista Farias</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <GraduationCap className="text-blue-500 w-6 h-6 shrink-0" />
                                <div>
                                    <h4 className="dark:text-slate-200 text-slate-700 font-semibold text-sm uppercase tracking-wider mb-1">Formação</h4>
                                    <p className="dark:text-slate-400 text-slate-600 text-sm leading-relaxed">Bacharela e Licenciada em Ciências Biológicas pela UFRN, pós-graduação em Gestão Ambiental.</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Briefcase className="text-purple-500 w-6 h-6 shrink-0" />
                                <div>
                                    <h4 className="dark:text-slate-200 text-slate-700 font-semibold text-sm uppercase tracking-wider mb-1">Experiência</h4>
                                    <p className="dark:text-slate-400 text-slate-600 text-sm leading-relaxed">Professora da Rede Estadual do RN desde 2012. Atua na 2ª DIREC/NUREPDH como técnica multiplicadora de EDH e mediadora de conflitos.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Person 2 */}
                    <div className="space-y-6 dark:bg-white/5 bg-slate-50 p-5 md:p-6 rounded-2xl border dark:border-white/5 border-slate-100">
                         <div className="flex items-center gap-4 md:gap-5 border-b dark:border-white/10 border-slate-200 pb-6">
                            <img src="https://i.imgur.com/ujSR6FD.png" alt="Terezinha" className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-orange-500 p-1 object-cover" />
                            <div>
                                <h3 className="text-lg md:text-xl font-bold dark:text-white text-slate-800">Terezinha de Jesus</h3>
                                <p className="text-orange-500 text-sm font-medium">Saraiva</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <GraduationCap className="text-blue-500 w-6 h-6 shrink-0" />
                                <div>
                                    <h4 className="dark:text-slate-200 text-slate-700 font-semibold text-sm uppercase tracking-wider mb-1">Formação</h4>
                                    <p className="dark:text-slate-400 text-slate-600 text-sm leading-relaxed">Licenciatura em Pedagogia pela UVA, pós-graduação na UNP em Ensino Fundamental.</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Briefcase className="text-purple-500 w-6 h-6 shrink-0" />
                                <div>
                                    <h4 className="dark:text-slate-200 text-slate-700 font-semibold text-sm uppercase tracking-wider mb-1">Experiência</h4>
                                    <p className="dark:text-slate-400 text-slate-600 text-sm leading-relaxed">Professora da Rede Estadual desde 2001 e Municipal de Parnamirim desde 1997. Atua na 2ª DIREC/NUREPDH como técnica multiplicadora.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ImageModalProps {
    src: string | null;
    onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ src, onClose }) => {
    if (!src) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4" onClick={onClose}>
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 hover:text-white bg-white/10 hover:bg-orange-500/80 p-2 md:p-3 rounded-full transition-all z-50"
            >
                <X size={24} className="md:w-8 md:h-8" />
            </button>
            <img 
                src={src} 
                alt="Full size" 
                className="max-w-full max-h-[85vh] md:max-h-[90vh] rounded-xl shadow-2xl border border-white/10 animate-[scale-in_0.3s_cubic-bezier(0.16,1,0.3,1)]"
                onClick={e => e.stopPropagation()}
            />
        </div>
    );
};

interface VideoModalProps {
    src: string | null;
    onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ src, onClose }) => {
    if (!src) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4" onClick={onClose}>
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 hover:text-white bg-white/10 hover:bg-orange-500/80 p-2 md:p-3 rounded-full transition-all z-50"
            >
                <X size={24} className="md:w-8 md:h-8" />
            </button>
            <div 
                className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 animate-[scale-in_0.3s_cubic-bezier(0.16,1,0.3,1)] bg-black"
                onClick={e => e.stopPropagation()}
            >
                <iframe 
                    src={src} 
                    className="w-full h-full" 
                    allowFullScreen 
                    title="Video Player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
            </div>
        </div>
    );
};