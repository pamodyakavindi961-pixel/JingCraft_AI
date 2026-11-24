
import type { HTMLAttributes } from 'react'

export type ProgressVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'

export type ProgressSize = 'sm' | 'md' | 'lg'

export interface ProgressProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  value?: number
  max?: number
  label?: string
  showValue?: boolean
  variant?: ProgressVariant
  size?: ProgressSize
}

const variantStyles: Record<ProgressVariant, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
}

const sizeStyles: Record<ProgressSize, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ProgressProps) {
  const isIndeterminate = value === undefined
  const safeMax = max > 0 ? max : 100
  const safeValue = isIndeterminate
    ? 0
    : Math.min(Math.max(value, 0), safeMax)

  const percentage = (safeValue / safeMax) * 100

  return (
    <div className={`w-full ${className}`} {...props}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between gap-4">
          {label && (
            <span className="text-sm font-medium text-foreground">
              {label}
            </span>
          )}

          {showValue && !isIndeterminate && (
            <span className="text-sm font-medium tabular-nums text-text-muted">
              {Math.round(percentage)}%
            </span>
          )}

          {showValue && isIndeterminate && (
            <span className="text-sm text-text-muted">
              Processing...
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-label={label || 'Progress'}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={isIndeterminate ? undefined : safeValue}
        aria-valuetext={
          isIndeterminate
            ? 'Loading'
            : `${Math.round(percentage)}% complete`
        }
        className={`w-full overflow-hidden rounded-full bg-border/70 ${sizeStyles[size]}`}
      >
        <div
          className={[
            'h-full rounded-full transition-[width] duration-300 ease-out',
            variantStyles[variant],
            isIndeterminate
              ? 'w-2/5 animate-pulse'
              : '',
          ].join(' ')}
          style={
            isIndeterminate
              ? undefined
              : { width: `${percentage}%` }
          }
        />
      </div>
    </div>
  )
}

export default Progress
