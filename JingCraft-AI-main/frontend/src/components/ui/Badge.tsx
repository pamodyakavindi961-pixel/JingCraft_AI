
import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'
  | 'outline'

export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  pill?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-error/10 text-error',
  info: 'bg-info/10 text-info',
  neutral: 'bg-border/60 text-muted',
  outline: 'border border-border bg-transparent text-foreground',
}

const dotStyles: Record<BadgeVariant, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-info',
  neutral: 'bg-muted',
  outline: 'bg-foreground',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs gap-1.5',
  md: 'px-2.5 py-1 text-sm gap-2',
  lg: 'px-3 py-1.5 text-sm gap-2',
}

function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  pill = true,
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={[
        'inline-flex w-fit items-center font-medium leading-none',
        variantStyles[variant],
        sizeStyles[size],
        pill ? 'rounded-full' : 'rounded-md',
        className,
      ].join(' ')}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotStyles[variant]}`}
        />
      )}

      {children}
    </span>
  )
}

export default Badge
