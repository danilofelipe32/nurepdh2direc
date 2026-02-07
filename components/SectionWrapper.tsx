import React, { useState, useRef } from 'react';
import { ChevronDown, FileText } from 'lucide-react';

interface SectionWrapperProps {
    id: string;
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    defaultExpanded?: boolean;
    className?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, icon, children, defaultExpanded = false, className = '' }) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <section 
            id={id} 
            className={`
                mb-8 sm:mb-10 p-6 sm:p-8 
                rounded-3xl transition-all duration-500 border shadow-lg
                backdrop-blur-xl
                ${isExpanded 
                    ? 'dark:bg-slate-900/40 bg-white/80 dark:shadow-orange-500/5 shadow-orange-500/5 border-orange-500/20' 
                    : 'dark:bg-slate-900/20 bg-white/50 hover:bg-white/80 dark:hover:bg-slate-900/30 border-slate-200 dark:border-white/10'
                }
                ${className}
            `}
        >
            <div 
                className="flex justify-between items-center cursor-pointer group select-none" 
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center flex-grow">
                    <div className={`
                        p-2 rounded-xl mr-4 transition-all duration-300
                        ${isExpanded 
                            ? 'bg-orange-500/20 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]' 
                            : 'dark:bg-white/5 bg-slate-100 dark:text-slate-400 text-slate-500 group-hover:bg-orange-500/10 group-hover:text-orange-500'
                        }
                    `}>
                        {icon || <FileText className="w-6 h-6" />}
                    </div>
                    <h2 className={`
                        text-xl sm:text-2xl font-semibold tracking-tight transition-colors
                        ${isExpanded ? 'dark:text-white text-slate-800' : 'dark:text-slate-300 text-slate-600 group-hover:text-slate-800 dark:group-hover:text-white'}
                    `}>
                        {title}
                    </h2>
                </div>
                
                <button 
                    className={`
                        w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-500
                        ${isExpanded 
                            ? 'rotate-180 bg-orange-500 text-white border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' 
                            : 'dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200 dark:text-slate-400 text-slate-500 group-hover:border-orange-500/50 group-hover:text-orange-500'
                        }
                    `}
                >
                    <ChevronDown className="w-5 h-5" />
                </button>
            </div>
            
            <div 
                className={`grid transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
            >
                <div className="overflow-hidden">
                    <div className="dark:text-slate-300 text-slate-600 leading-relaxed font-light text-lg">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
};