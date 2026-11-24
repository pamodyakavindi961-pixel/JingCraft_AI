
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from 'lucide-react'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface ToastProps {
  variant?: ToastVariant
  title: string
  description?: string
  duration?: number
  onClose: () => void
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

const variantConfig = {
  success: {
    icon: CheckCircle2,
    iconClass: 'text-success',
    borderClass: 'border-l-success',
  },
  error: {
    icon: XCircle,
    iconClass: 'text-error',
    borderClass: 'border-l-error',
  },
  warning: {
    icon: AlertTriangle,
    iconClass: 'text-warning',
    borderClass: 'border-l-warning',
  },
  info: {
    icon: Info,
    iconClass: 'text-info',
    borderClass: 'border-l-info',
  },
}

export default function Toast({
  variant = 'info',
  title,
  description,
  duration = 4000,
  onClose,
  action,
  className = '',
}: ToastProps) {
  const [progress, setProgress] = useState(100)
  const prefersReducedMotion = useReducedMotion()
  const config = variantConfig[variant]
  const Icon = config.icon

  useEffect(() => {
    if (duration <= 0) return

    const interval = 50
    const decrement = (interval / duration) * 100

    const timer = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.max(0, current - decrement)

        if (next === 0) {
          window.clearInterval(timer)
          onClose()
        }

        return next
      })
    }, interval)

    return () => window.clearInterval(timer)
  }, [duration, onClose])

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: -12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      className={`
        relative w-full max-w-md overflow-hidden rounded-xl
        border border-border border-l-4 ${config.borderClass}
        bg-surface shadow-lg
        ${className}
      `}
    >
      <div className="flex items-start gap-3 p-4">
        <Icon
          size={21}
          className={`mt-0.5 shrink-0 ${config.iconClass}`}
          aria-hidden="true"
        />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink">
            {title}
          </p>

          {description && (
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {description}
            </p>
          )}

          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className="mt-3 text-sm font-semibold text-primary transition-colors hover:text-jade focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {action.label}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="shrink-0 rounded-md p-1 text-muted transition-colors hover:bg-porcelain hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <X size={17} aria-hidden="true" />
        </button>
      </div>

      {duration > 0 && (
        <div
          className="h-1 w-full bg-border"
          aria-hidden="true"
        >
          <div
            className="h-full bg-primary"
            style={{
              width: `${progress}%`,
              transition: prefersReducedMotion ? 'none' : 'width 50ms linear',
            }}
          />
        </div>
      )}
    </motion.div>
  )
}

export interface ToastContainerProps {
  children: React.ReactNode
  className?: string
}

export function ToastContainer({
  children,
  className = '',
}: ToastContainerProps) {
  return (
    <div
      className={`fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-md flex-col gap-3 ${className}`}
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {children}
      </AnimatePresence>
    </div>
  )
}
