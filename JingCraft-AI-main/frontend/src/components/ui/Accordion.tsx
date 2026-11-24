
import { useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'

export interface AccordionItem {
  id: string
  title: ReactNode
  content: ReactNode
  disabled?: boolean
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultOpenItems?: string[]
  variant?: 'default' | 'bordered' | 'separated'
  className?: string
}

function Accordion({
  items,
  allowMultiple = false,
  defaultOpenItems = [],
  variant = 'default',
  className = '',
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpenItems)
  const shouldReduceMotion = useReducedMotion()

  const toggleItem = (id: string) => {
    setOpenItems((current) => {
      const isOpen = current.includes(id)

      if (isOpen) {
        return current.filter((itemId) => itemId !== id)
      }

      return allowMultiple ? [...current, id] : [id]
    })
  }

  const containerClasses = {
    default: 'divide-y divide-border',
    bordered: 'overflow-hidden rounded-xl border border-border divide-y divide-border',
    separated: 'space-y-3',
  }

  return (
    <div className={`${containerClasses[variant]} ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)
        const panelId = `accordion-panel-${item.id}`
        const triggerId = `accordion-trigger-${item.id}`

        return (
          <div
            key={item.id}
            className={
              variant === 'separated'
                ? 'overflow-hidden rounded-xl border border-border bg-white'
                : ''
            }
          >
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={item.disabled}
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>{item.title}</span>

                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.2,
                  }}
                  className="shrink-0 text-text-muted"
                >
                  <ChevronDown size={18} aria-hidden="true" />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { height: 0, opacity: 0 }
                  }
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { height: 'auto', opacity: 1 }
                  }
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-sm leading-relaxed text-text-muted">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
