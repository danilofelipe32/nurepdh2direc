import React, { useState } from 'react';
import { TimelineEvent } from '../types';
import { ArrowRight } from 'lucide-react';

const FlashCard: React.FC<{ event: TimelineEvent }> = ({ event }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div 
            className="w-full h-80 relative cursor-pointer group perspective-1000 mb-10 md:mb-0 md:w-[48%] mx-auto"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div 
                className={`
                    w-full h-full relative transition-transform duration-700 transform-style-3d
                    ${isFlipped ? 'rotate-y-180' : ''}
                `}
            >
                {/* Front */}
                <div className="absolute inset-0 w-full h-full dark:bg-slate-900/60 bg-white/80 backdrop-blur-xl border dark:border-white/10 border-slate-200 rounded-3xl flex flex-col justify-center items-center p-6 text-center backface-hidden z-20 shadow-2xl group-hover:border-orange-500/30 transition-colors">
                    <div className="neon-border-animation absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <h3 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 mb-4 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                        {event.year}
                    </h3>
                    <p className="text-2xl dark:text-white text-slate-800 font-medium">{event.title}</p>
                    <div className="mt-8 flex items-center text-xs text-orange-500 font-bold uppercase tracking-widest gap-2 bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20">
                        <span>Ver Detalhes</span> <ArrowRight size={14} />
                    </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 w-full h-full dark:bg-slate-800/90 bg-white border border-orange-500/30 rounded-3xl flex flex-col justify-center items-center p-8 text-center backface-hidden rotate-y-180 z-10 shadow-[0_0_30px_rgba(249,115,22,0.15)]">
                    <h4 className="font-bold text-xl mb-4 text-orange-500">{event.title}</h4>
                    <p className="text-base dark:text-slate-200 text-slate-600 leading-relaxed font-light">{event.description}</p>
                    <button className="mt-6 dark:text-slate-500 text-slate-400 hover:text-orange-500 dark:hover:text-white transition-colors">Voltar</button>
                </div>
            </div>
        </div>
    );
};

export const Timeline: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
    return (
        <div className="relative py-12">
            {/* Vertical Line for Desktop */}
            <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-orange-500/50 to-transparent"></div>

            <div className="flex flex-col gap-16 md:gap-24">
                {events.map((event, index) => (
                    <div 
                        key={event.year} 
                        className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center w-full relative`}
                    >
                        {/* Timeline Dot */}
                        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 dark:bg-slate-900 bg-slate-50 border border-orange-500 rounded-full z-30 items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                        </div>
                        
                        {/* Card Container */}
                        <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'}`}>
                            <FlashCard event={event} />
                        </div>
                        {/* Empty Space for the other side */}
                        <div className="hidden md:block w-1/2"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};