
import type { HTMLAttributes, ReactNode } from 'react'

export type CardVariant = 'default' | 'outlined' | 'elevated'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: CardVariant
  padding?: CardPadding
  hoverable?: boolean
  as?: 'div' | 'article' | 'section'
}

const variantStyles: Record<CardVariant, string> = {
  default: 'border border-transparent bg-white shadow-sm',
  outlined: 'border border-border bg-white shadow-none',
  elevated: 'border border-border/50 bg-white shadow-md',
}

const paddingStyles: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
}

function Card({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  as: Component = 'div',
  className = '',
  ...props
}: CardProps) {
  return (
    <Component
      className={[
        'min-w-0 rounded-2xl',
        variantStyles[variant],
        paddingStyles[padding],
        hoverable
          ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none'
          : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Card
