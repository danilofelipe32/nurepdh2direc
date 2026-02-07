"use client"

import { useState, type ReactNode } from "react"
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "framer-motion"
import { cn } from "../../lib/utils"
import { Grid3X3, Layers, LayoutList } from "lucide-react"

export type LayoutMode = "stack" | "grid" | "list"

export interface CardData {
  id: string
  title: string
  description: string
  icon?: ReactNode
  color?: string
  url?: string // Added specifically for this app integration
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

  if (!cards || cards.length === 0) {
    return null
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x

    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      // Swiped left - go to next card
      setActiveIndex((prev) => (prev + 1) % cards.length)
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      // Swiped right - go to previous card
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
    }
    setIsDragging(false)
  }

  const getStackOrder = () => {
    const reordered = []
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length
      reordered.push({ ...cards[index], stackPosition: i })
    }
    return reordered.reverse() // Reverse so top card renders last (on top)
  }

  const getLayoutStyles = (stackPosition: number) => {
    switch (layout) {
      case "stack":
        return {
          top: stackPosition * 8,
          left: stackPosition * 8,
          zIndex: cards.length - stackPosition,
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
    stack: "relative h-80 w-72 sm:h-80 sm:w-96", // Adjusted size for better content fit
    grid: "grid grid-cols-1 sm:grid-cols-2 gap-4",
    list: "flex flex-col gap-3",
  }

  const displayCards = layout === "stack" ? getStackOrder() : cards.map((c, i) => ({ ...c, stackPosition: i }))

  return (
    <div className={cn("space-y-6", className)}>
      {/* Layout Toggle */}
      <div className="flex items-center justify-center gap-1 rounded-lg dark:bg-slate-800/50 bg-slate-200/50 p-1 w-fit mx-auto backdrop-blur-sm border dark:border-white/5 border-slate-300">
        {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
          const Icon = layoutIcons[mode]
          return (
            <button
              key={mode}
              onClick={() => setLayout(mode)}
              className={cn(
                "rounded-md p-2 transition-all",
                layout === mode
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-300/50 dark:hover:bg-slate-700/50",
              )}
              aria-label={`Switch to ${mode} layout`}
            >
              <Icon className="h-4 w-4" />
            </button>
          )
        })}
      </div>

      {/* Cards Container */}
      <LayoutGroup>
        <motion.div layout className={cn(containerStyles[layout], "mx-auto transition-all duration-500")}>
          <AnimatePresence mode="popLayout">
            {displayCards.map((card) => {
              const styles = getLayoutStyles(card.stackPosition)
              const isExpanded = expandedCard === card.id
              const isTopCard = layout === "stack" && card.stackPosition === 0

              return (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: isExpanded ? 1.02 : 1,
                    x: 0,
                    ...styles,
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: -200 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  drag={isTopCard ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                  onClick={() => {
                    if (isDragging) return
                    // If simple click in stack mode on non-top card, do nothing (or rotate)
                    // If grid/list or top card, handle interaction
                    onCardClick?.(card)
                  }}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-6 flex flex-col justify-between shadow-xl backdrop-blur-xl",
                    "dark:bg-slate-900/90 bg-white/90 dark:border-white/10 border-slate-200", // Theme colors adapted
                    "hover:border-orange-500/50 transition-colors duration-300",
                    layout === "stack" && "absolute w-full h-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]",
                    layout === "stack" && isTopCard && "cursor-grab active:cursor-grabbing",
                    layout === "grid" && "w-full aspect-[4/3]",
                    layout === "list" && "w-full",
                    isExpanded && "ring-2 ring-orange-500",
                  )}
                >
                  <div className="flex items-start gap-4">
                    {card.icon && (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-orange-500 shadow-sm">
                        {card.icon}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-lg dark:text-slate-100 text-slate-800 leading-tight mb-2 line-clamp-2">{card.title}</h3>
                      <p
                        className={cn(
                          "text-sm dark:text-slate-400 text-slate-600 font-light leading-relaxed",
                          layout === "stack" && "line-clamp-4",
                          layout === "grid" && "line-clamp-3",
                          layout === "list" && "line-clamp-2",
                        )}
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {layout === "stack" && isTopCard && (
                    <div className="mt-4 pt-4 border-t dark:border-white/10 border-slate-200 flex justify-between items-center text-xs dark:text-slate-500 text-slate-400">
                      <span>Arraste para navegar</span>
                      <span className="font-medium text-orange-500">Clique para abrir</span>
                    </div>
                  )}

                  {layout !== 'stack' && (
                     <div className="mt-4 flex justify-end">
                        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full">Acessar</span>
                     </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {layout === "stack" && cards.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === activeIndex ? "w-8 bg-orange-500" : "w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-orange-500/50",
              )}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
