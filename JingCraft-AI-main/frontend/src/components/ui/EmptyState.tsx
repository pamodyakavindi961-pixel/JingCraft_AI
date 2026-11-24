
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Search, ImagePlus, Database } from 'lucide-react'

export interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  variant?: 'default' | 'compact'
  className?: string
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  variant = 'default',
  className = '',
}: EmptyStateProps) {
  const prefersReducedMotion = useReducedMotion()

  const defaultIcon = (
    <Database
      size={variant === 'compact' ? 24 : 32}
      strokeWidth={1.5}
      aria-hidden="true"
    />
  )

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`
        flex w-full flex-col items-center justify-center
        rounded-2xl border border-dashed border-border
        bg-surface text-center
        ${variant === 'compact' ? 'gap-3 p-6' : 'gap-4 p-10 sm:p-14'}
        ${className}
      `}
    >
      <div
        className={`
          flex items-center justify-center rounded-2xl
          bg-porcelain text-primary
          ${variant === 'compact' ? 'size-12' : 'size-16'}
        `}
        aria-hidden="true"
      >
        {icon ?? defaultIcon}
      </div>

      <div className="max-w-md space-y-2">
        <h3
          className={`font-semibold text-ink ${
            variant === 'compact' ? 'text-base' : 'text-lg'
          }`}
        >
          {title}
        </h3>

        {description && (
          <p className="text-sm leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>

      {action && <div className="pt-1">{action}</div>}
    </motion.div>
  )
}

export const EmptyStateIcons = {
  search: Search,
  upload: ImagePlus,
  database: Database,
}
