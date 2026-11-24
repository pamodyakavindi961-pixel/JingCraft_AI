
import type { HTMLAttributes } from 'react'

export type SkeletonVariant = 'text' | 'circular' | 'rectangular'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  lines?: number
  animation?: boolean
}

function Skeleton({
  variant = 'rectangular',
  width,
  height,
  lines = 1,
  animation = true,
  className = '',
  style,
  ...props
}: SkeletonProps) {
  const baseStyles = [
    'bg-border/80',
    animation ? 'animate-pulse motion-reduce:animate-none' : '',
  ].join(' ')

  const dimensions = {
    width,
    height:
      height ??
      (variant === 'text' ? '0.875rem' : undefined),
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div
        className={`space-y-2 ${className}`}
        {...props}
      >
        {Array.from({ length: Math.max(1, Math.floor(lines)) }).map(
          (_, index) => (
            <div
              key={index}
              aria-hidden="true"
              className={`${baseStyles} h-3.5 rounded-md ${
                index === lines - 1 ? 'w-3/4' : 'w-full'
              }`}
            />
          ),
        )}
      </div>
    )
  }

  const variantStyles: Record<SkeletonVariant, string> = {
    text: 'rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  }

  return (
    <div
      aria-hidden="true"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={{ ...dimensions, ...style }}
      {...props}
    />
  )
}

export default Skeleton
