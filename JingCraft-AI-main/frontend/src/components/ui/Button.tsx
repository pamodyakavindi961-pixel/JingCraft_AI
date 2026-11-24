
import { motion, useReducedMotion } from 'motion/react'
import type { HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

// Defines the available visual styles for reusable buttons.
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'

// Defines the available button sizes.
export type ButtonSize = 'sm' | 'md' | 'lg'

// Uses Motion's native button props to avoid React and Motion event conflicts.
// Uses Motion's native button props while defining React children explicitly.
type NativeButtonProps = Omit<
  HTMLMotionProps<'button'>,
  'size' | 'children'
>

// Defines all supported properties for the reusable Button component.
export type ButtonProps = NativeButtonProps & {
  children?: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

// Maps each button variant to the centralized design system colors.
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white border border-primary hover:bg-[#142F50]',

  secondary:
    'bg-secondary text-white border border-secondary hover:bg-[#557367]',

  outline:
    'bg-transparent text-primary border border-primary hover:bg-primary hover:text-white',

  ghost:
    'bg-transparent text-foreground border border-transparent hover:bg-ink/5',
}

// Maps button sizes to consistent spacing and typography.
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-3 text-sm gap-2',
  md: 'min-h-11 px-5 text-sm gap-2.5',
  lg: 'min-h-13 px-7 text-base gap-3',
}

// Reusable Button component for consistent interactions across the app.
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  type = 'button',
  className = '',
  ...props
}: ButtonProps) {
  // Respect the user's operating-system reduced-motion preference.
  const shouldReduceMotion = useReducedMotion()

  // Combines variant, size, interaction, and custom styles.
  const buttonClasses = [
    'inline-flex items-center justify-center rounded-lg font-semibold',
    'whitespace-nowrap select-none',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-primary focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'disabled:hover:transform-none',
    variantStyles[variant],
    sizeStyles[size],
    className,
  ].join(' ')

  return (
    <motion.button
      {...props}
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      aria-busy={loading}
      whileHover={
        shouldReduceMotion || disabled || loading
          ? undefined
          : { y: -2 }
      }
      whileTap={
        shouldReduceMotion || disabled || loading
          ? undefined
          : { scale: 0.97 }
      }
      transition={{
        duration: 0.2,
        ease: 'easeOut',
      }}
    >
      {/* Displays a loading indicator while an action is processing. */}
      {loading && (
        <span
          aria-hidden="true"
          className="
            h-4 w-4 shrink-0 rounded-full border-2
            border-current border-r-transparent
            animate-spin motion-reduce:animate-none
          "
        />
      )}

      {/* Displays the optional leading icon when the button is idle. */}
      {!loading && leftIcon && (
        <span className="inline-flex shrink-0" aria-hidden="true">
          {leftIcon}
        </span>
      )}

      {/* Keeps the button label visible in every state. */}
      <span>{children}</span>

      {/* Displays the optional trailing icon when the button is idle. */}
      {!loading && rightIcon && (
        <span className="inline-flex shrink-0" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </motion.button>
  )
}
