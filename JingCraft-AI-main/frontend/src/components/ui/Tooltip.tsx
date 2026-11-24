
import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  placement?: TooltipPlacement
  disabled?: boolean
  className?: string
}

const placementClasses: Record<TooltipPlacement, string> = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
}

function Tooltip({
  content,
  children,
  placement = 'top',
  disabled = false,
  className = '',
}: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const tooltipId = useId()
  const shouldReduceMotion = useReducedMotion()

  if (disabled) {
    return <>{children}</>
  }

  return (
    <span
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      aria-describedby={visible ? tooltipId : undefined}
    >
      {children}

      <AnimatePresence>
        {visible && (
          <motion.span
            id={tooltipId}
            role="tooltip"
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 4 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className={`pointer-events-none absolute z-50 w-max max-w-64 rounded-lg bg-ink px-3 py-2 text-xs font-medium leading-relaxed text-white shadow-lg ${placementClasses[placement]}`}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

export default Tooltip
