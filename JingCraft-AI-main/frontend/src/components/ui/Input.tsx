
import { useId, useState } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Eye, EyeOff } from 'lucide-react'

// Defines the visual validation states supported by the input.
export type InputStatus = 'default' | 'success' | 'error'

// Extends native HTML input attributes for flexible form integration.
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helperText?: string
  error?: string
  success?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  containerClassName?: string
}

// Maps input validation states to consistent design system styles.
const statusStyles: Record<InputStatus, string> = {
  default: 'border-border focus-within:border-primary',
  success: 'border-success focus-within:border-success',
  error: 'border-error focus-within:border-error',
}

// Reusable Input component for forms throughout JingCraft AI.
export default function Input({
  label,
  helperText,
  error,
  success,
  leftIcon,
  rightIcon,
  id,
  type = 'text',
  disabled = false,
  required = false,
  className = '',
  containerClassName = '',
  ...props
}: InputProps) {
  // Generates a stable ID when the parent does not provide one.
  const generatedId = useId()
  const inputId = id ?? generatedId

  // Tracks password visibility without changing the actual input value.
  const [showPassword, setShowPassword] = useState(false)

  // Tracks focus for the Motion-powered input interaction.
  const [isFocused, setIsFocused] = useState(false)

  // Respects the user's operating-system reduced-motion preference.
  const shouldReduceMotion = useReducedMotion()

  // Determines the effective input type.
  const isPassword = type === 'password'
  const effectiveType =
    isPassword && showPassword ? 'text' : type

  // Error state takes priority over success state.
  const inputStatus: InputStatus = error
    ? 'error'
    : success
      ? 'success'
      : 'default'

  // Connects helper and validation messages to the input.
  const descriptionId = `${inputId}-description`
  const errorId = `${inputId}-error`

  const describedBy = [
    helperText ? descriptionId : undefined,
    error ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(' ') || undefined

  // Prevents unnecessary animation when motion is disabled.
  const focusScale = shouldReduceMotion
    ? 1
    : isFocused
      ? 1.005
      : 1

  return (
    <div className={`w-full space-y-2 ${containerClassName}`}>
      {/* Displays the accessible input label and required indicator. */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-foreground"
        >
          {label}

          {required && (
            <span className="ml-1 text-error" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* Motion wrapper provides a subtle focus interaction. */}
      <motion.div
        animate={{ scale: focusScale }}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
        className={`
          flex min-h-12 w-full items-center gap-3
          rounded-lg border bg-white px-4
          transition-colors duration-200
          ${statusStyles[inputStatus]}
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        `}
      >
        {/* Optional leading icon. */}
        {leftIcon && (
          <span
            className="shrink-0 text-muted"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}

        {/* Native input keeps standard HTML form behavior. */}
        <input
          {...props}
          id={inputId}
          type={effectiveType}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onFocus={(event) => {
            setIsFocused(true)
            props.onFocus?.(event)
          }}
          onBlur={(event) => {
            setIsFocused(false)
            props.onBlur?.(event)
          }}
          className={`
            min-w-0 flex-1 bg-transparent py-3
            text-sm text-foreground outline-none
            placeholder:text-muted
            disabled:cursor-not-allowed
            ${className}
          `}
        />

        {/* Password visibility control. */}
        {isPassword && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => setShowPassword((previous) => !previous)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            className="
              inline-flex shrink-0 items-center justify-center
              rounded-md p-1 text-muted
              transition-colors duration-200
              hover:text-primary
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-primary
              disabled:cursor-not-allowed
            "
          >
            {showPassword ? (
              <EyeOff size={18} aria-hidden="true" />
            ) : (
              <Eye size={18} aria-hidden="true" />
            )}
          </button>
        )}

        {/* Optional trailing icon for non-password inputs. */}
        {!isPassword && rightIcon && (
          <span
            className="shrink-0 text-muted"
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </motion.div>

      {/* Displays supporting information below the input. */}
      {helperText && !error && (
        <p
          id={descriptionId}
          className="text-xs leading-relaxed text-muted"
        >
          {helperText}
        </p>
      )}

      {/* Displays validation errors with accessible announcement. */}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs leading-relaxed text-error"
        >
          {error}
        </p>
      )}

      {/* Displays successful validation feedback. */}
      {!error && success && (
        <p
          className="text-xs leading-relaxed text-success"
          role="status"
        >
          {success}
        </p>
      )}
    </div>
  )
}
