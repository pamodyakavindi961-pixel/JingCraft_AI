
import { useState } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  XCircle,
  X,
} from 'lucide-react'

export type AlertVariant = 'success' | 'info' | 'warning' | 'error'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  title?: string
  children: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

const variantStyles: Record<AlertVariant, string> = {
  success: 'border-success/30 bg-success/5 text-success',
  info: 'border-info/30 bg-info/5 text-info',
  warning: 'border-warning/30 bg-warning/5 text-warning',
  error: 'border-error/30 bg-error/5 text-error',
}

const iconMap = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
}

function Alert({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  className = '',
  ...props
}: AlertProps) {
  const [visible, setVisible] = useState(true)
  const Icon = iconMap[variant]

  const handleDismiss = () => {
    setVisible(false)
    onDismiss?.()
  }

  if (!visible) return null

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={[
        'flex items-start gap-3 rounded-xl border p-4',
        variantStyles[variant],
        className,
      ].join(' ')}
      {...props}
    >
      <Icon
        size={20}
        strokeWidth={2}
        className="mt-0.5 shrink-0"
        aria-hidden="true"
      />

      <div className="min-w-0 flex-1">
        {title && (
          <h3 className="text-sm font-semibold">
            {title}
          </h3>
        )}

        <div className={`text-sm leading-relaxed ${title ? 'mt-1' : ''}`}>
          {children}
        </div>
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          className="shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export default Alert
