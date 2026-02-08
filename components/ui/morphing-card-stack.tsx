
"use client"

import React, { useState, useEffect, useMemo, type ReactNode } from "react"
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "framer-motion"
import { cn } from "../../lib/utils"
import { Grid3X3, Layers, LayoutList, ExternalLink, Filter } from "lucide-react"

export type LayoutMode = "stack" | "grid" | "list"

export interface CardData {
  id: string
  title: string
  description: string
  icon?: ReactNode
  color?: string
  url?: string
  category?: string
}

export interface MorphingCardStackProps {
  cards?: CardData[]
  className?: string
  defaultLayout?: LayoutMode
  onCardClick?: (card: CardData) => void
}

const layoutIcons = {
  stack: Layers,
  grid: Grid3X3,
  list: LayoutList,
}

const layoutDescriptions: Record<LayoutMode, string> = {
  stack: "Modo Pilha: Interativo (Arraste)",
  grid: "Modo Grade: Visão Geral",
  list: "Modo Lista: Compacto",
}

const SWIPE_THRESHOLD = 50

export function MorphingCardStack({
  cards = [],
  className,
  defaultLayout = "stack",
  onCardClick,
}: MorphingCardStackProps) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [filter, setFilter] = useState("Todos")

  if (!cards || cards.length === 0) {
    return null
  }

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(cards.map(c => c.category).filter(Boolean) as string[])
    return ["Todos", ...Array.from(cats)]
  }, [cards])

  // Filter cards based on selection
  const filteredCards = useMemo(() => {
    if (filter === "Todos") return cards
    return cards.filter(c => c.category === filter)
  }, [cards, filter])

  // Reset active index when filter changes to avoid out of bounds
  useEffect(() => {
    setActiveIndex(0)
  }, [filter])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x
    const len = filteredCards.length

    if (len === 0) return

    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      // Swiped left - go to next card
      setActiveIndex((prev) => (prev + 1) % len)
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      // Swiped right - go to previous card
      setActiveIndex((prev) => (prev - 1 + len) % len)
    }
    setIsDragging(false)
  }

  const getStackOrder = () => {
    if (filteredCards.length === 0) return []
    const reordered = []
    for (let i = 0; i < filteredCards.length; i++) {
      const index = (activeIndex + i) % filteredCards.length
      reordered.push({ ...filteredCards[index], stackPosition: i })
    }
    return reordered.reverse() // Reverse so top card renders last (on top)
  }

  const getLayoutStyles = (stackPosition: number) => {
    switch (layout) {
      case "stack":
        return {
          top: stackPosition * 8,
          left: stackPosition * 8,
          zIndex: filteredCards.length - stackPosition,
          rotate: (stackPosition - 1) * 2,
        }
      case "grid":
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0,
        }
      case "list":
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0,
        }
    }
  }

  const containerStyles = {
    stack: "relative h-80 w-72 sm:w-80 mx-auto mt-8 mb-64",
    grid: "grid grid-cols-1 sm:grid-cols-2 gap-4",
    list: "flex flex-col gap-3",
  }

  const displayCards = layout === "stack" ? getStackOrder() : filteredCards.map((c, i) => ({ ...c, stackPosition: i }))

  return (
    <div className={cn("space-y-6 w-full max-w-4xl mx-auto p-4", className)}>
      {/* Header with Filter and Layout Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <h3 className="text-xl font-bold dark:text-white text-slate-800">
                Biblioteca Digital
            </h3>
            {categories.length > 1 && (
                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium transition-all border",
                                filter === cat
                                    ? "bg-orange-500 border-orange-500 text-white shadow-md"
                                    : "bg-transparent border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-orange-500/50 hover:text-orange-500 dark:hover:text-orange-400"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-1 rounded-lg bg-slate-200 dark:bg-white/10 p-1 w-fit self-start sm:self-auto">
            {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
              const Icon = layoutIcons[mode]
              return (
                <button
                  key={mode}
                  onClick={() => setLayout(mode)}
                  className={cn(
                    "group relative rounded-md p-2 transition-all",
                    layout === mode
                      ? "bg-white dark:bg-slate-700 text-orange-500 shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-white/20",
                  )}
                  aria-label={`Switch to ${mode} layout`}
                >
                  <Icon className="h-4 w-4" />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-medium text-white bg-slate-900 dark:bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg z-50">
                      {layoutDescriptions[mode]}
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-slate-900 dark:border-t-slate-800"></div>
                  </div>
                </button>
              )
            })}
          </div>
      </div>

      {/* Cards Container */}
      <LayoutGroup>
        <motion.div layout className={cn(containerStyles[layout])}>
          <AnimatePresence mode="popLayout">
            {displayCards.length > 0 ? (
                displayCards.map((card) => {
                const styles = getLayoutStyles(card.stackPosition)
                const isExpanded = expandedCard === card.id
                const isTopCard = layout === "stack" && card.stackPosition === 0
                
                // Determine interactivity and link status
                const hasUrl = card.url && card.url !== '#'
                const isInteractive = layout !== "stack" || isTopCard
                
                // Use 'a' tag for valid links to ensure native browser behavior (middle click, open in new tab)
                const Component = (hasUrl && isInteractive) ? motion.a : motion.div

                return (
                    <Component
                    key={card.id}
                    layoutId={card.id}
                    // Link specific props
                    href={(hasUrl && isInteractive) ? card.url : undefined}
                    target={(hasUrl && isInteractive) ? "_blank" : undefined}
                    rel={(hasUrl && isInteractive) ? "noopener noreferrer" : undefined}
                    
                    // Animation props
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: isExpanded ? 1.05 : 1,
                        x: 0,
                        ...styles,
                    }}
                    exit={{ opacity: 0, scale: 0.8, x: -200 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                    }}
                    
                    // Drag props (only for top card in stack)
                    drag={isTopCard ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.7}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={handleDragEnd}
                    whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                    
                    // Interaction handler
                    onClick={(e: React.MouseEvent) => {
                        if (isDragging) {
                            e.preventDefault() // Prevent link navigation if dragging
                            return
                        }
                        
                        if (isInteractive) {
                            onCardClick?.(card)
                        } else {
                            e.preventDefault() // Prevent clicks on background stack cards
                        }
                    }}
                    
                    className={cn(
                        "rounded-2xl border p-5 backdrop-blur-xl shadow-xl flex flex-col h-full",
                        "dark:bg-slate-900/90 bg-white/90 dark:border-white/10 border-slate-200",
                        "hover:border-orange-500/50 transition-colors",
                        layout === "stack" && "absolute w-full h-full",
                        layout === "stack" && isTopCard && "cursor-grab active:cursor-grabbing shadow-[0_0_30px_rgba(0,0,0,0.2)]",
                        layout === "grid" && "w-full aspect-[4/3]",
                        layout === "list" && "w-full",
                        isExpanded && "ring-2 ring-orange-500",
                        (hasUrl && isInteractive) ? "cursor-pointer" : "cursor-default"
                    )}
                    >
                        <div className="flex items-start gap-4 mb-3">
                        {card.icon && (
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-orange-500 border border-slate-200 dark:border-white/10">
                            {card.icon}
                            </div>
                        )}
                        <div className="min-w-0 flex-1">
                            <div className="flex justify-between items-start gap-2">
                                <h3 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-2 leading-tight text-lg group-hover:text-orange-500 transition-colors">
                                    {card.title}
                                </h3>
                                {hasUrl && isInteractive && (
                                    <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                                )}
                            </div>
                            {hasUrl && isInteractive && (
                                <p className="text-xs font-mono text-orange-500 mt-1 uppercase tracking-wider opacity-80 flex items-center gap-1">
                                    Acessar Documento
                                </p>
                            )}
                        </div>
                        </div>
                        
                        <p
                            className={cn(
                            "text-sm text-slate-600 dark:text-slate-400 mt-auto leading-relaxed",
                            layout === "stack" && "line-clamp-3",
                            layout === "grid" && "line-clamp-3",
                            layout === "list" && "line-clamp-2",
                            )}
                        >
                            {card.description}
                        </p>

                    {isTopCard && layout === "stack" && (
                        <div className="absolute -bottom-10 left-0 right-0 text-center animate-pulse pointer-events-none">
                        <span className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-200 dark:bg-white/10 px-3 py-1 rounded-full">Arraste para navegar</span>
                        </div>
                    )}
                    </Component>
                )
                })
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                    className="col-span-full py-10 text-center text-slate-400"
                >
                    Nenhum documento encontrado nesta categoria.
                </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {layout === "stack" && filteredCards.length > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {filteredCards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === activeIndex ? "w-6 bg-orange-500" : "w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-orange-500/50",
              )}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
