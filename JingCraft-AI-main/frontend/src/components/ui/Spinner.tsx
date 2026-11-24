
import type { HTMLAttributes } from 'react'
import { LoaderCircle } from 'lucide-react'

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type SpinnerVariant =
  | 'primary'
  | 'secondary'
  | 'white'
  | 'muted'

export interface SpinnerProps
  extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize
  variant?: SpinnerVariant
  label?: string
}

const sizeStyles: Record<SpinnerSize, string> = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-7 w-7',
  xl: 'h-10 w-10',
}

const variantStyles: Record<SpinnerVariant, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  white: 'text-white',
  muted: 'text-muted',
}

function Spinner({
  size = 'md',
  variant = 'primary',
  label = 'Loading',
  className = '',
  ...props
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-flex items-center justify-center ${className}`}
      {...props}
    >
      <LoaderCircle
        aria-hidden="true"
        className={[
          sizeStyles[size],
          variantStyles[variant],
          'animate-spin motion-reduce:animate-none',
        ].join(' ')}
        strokeWidth={2}
      />

      <span className="sr-only">{label}</span>
    </span>
  )
}

export default Spinner
