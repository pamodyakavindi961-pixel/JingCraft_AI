
import { useEffect, useId, useRef, useState } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { motion, useReducedMotion } from 'motion/react'

// Defines the visual validation states supported by the textarea.
export type TextareaStatus = 'default' | 'success' | 'error'

// Extends native textarea attributes for flexible form integration.
export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string
  helperText?: string
  error?: string
  success?: string
  showCount?: boolean
  autoResize?: boolean
  containerClassName?: string
}

// Maps validation states to consistent design system styles.
const statusStyles: Record<TextareaStatus, string> = {
  default: 'border-border focus-within:border-primary',
  success: 'border-success focus-within:border-success',
  error: 'border-error focus-within:border-error',
}

// Reusable textarea component for longer user input.
export default function Textarea({
  label,
  helperText,
  error,
  success,
  showCount = false,
  autoResize = false,
  containerClassName = '',
  className = '',
  id,
  rows = 4,
  disabled = false,
  required = false,
  maxLength,
  value,
  defaultValue,
  onChange,
  ...props
}: TextareaProps) {
  // Generates a stable ID when the parent does not provide one.
  const generatedId = useId()
  const textareaId = id ?? generatedId

  // References the native textarea for automatic height adjustment.
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Tracks the current character count for controlled and uncontrolled inputs.
  const [characterCount, setCharacterCount] = useState(() => {
    const initialValue = value ?? defaultValue ?? ''
    return String(initialValue).length
  })

  // Respects the user's operating-system reduced-motion preference.
  const shouldReduceMotion = useReducedMotion()

  // Error state takes priority over success state.
  const textareaStatus: TextareaStatus = error
    ? 'error'
    : success
      ? 'success'
      : 'default'

  // Connects supporting and validation messages to the textarea.
  const descriptionId = `${textareaId}-description`
  const errorId = `${textareaId}-error`
  const successId = `${textareaId}-success`

  const describedBy = [
    helperText && !error ? descriptionId : undefined,
    error ? errorId : undefined,
    !error && success ? successId : undefined,
  ]
    .filter(Boolean)
    .join(' ') || undefined


    // Updates textarea height when its content or resize setting changes.
    useEffect(() => {
    if (!autoResize) return

    const textarea = textareaRef.current

    if (!textarea) return

    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
    }, [value, autoResize])

  // Updates the count and height while preserving the parent's change handler.
  const handleChange: TextareaProps['onChange'] = (event) => {
    setCharacterCount(event.currentTarget.value.length)

    if (autoResize) {
      event.currentTarget.style.height = 'auto'
      event.currentTarget.style.height =
        `${event.currentTarget.scrollHeight}px`
    }

    onChange?.(event)
  }

  return (
    <div className={`w-full space-y-2 ${containerClassName}`}>

      {/* Displays the accessible textarea label and required indicator. */}
      {label && (
        <label
          htmlFor={textareaId}
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
        initial={false}
        whileFocus={
          shouldReduceMotion
            ? undefined
            : { scale: 1.005 }
        }
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`
          w-full overflow-hidden rounded-lg border bg-white
          transition-colors duration-200
          ${statusStyles[textareaStatus]}
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        `}
      >
        {/* Native textarea preserves standard HTML form behavior. */}
        <textarea
          {...props}
          ref={textareaRef}
          id={textareaId}
          rows={rows}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`
            block w-full resize-none bg-transparent px-4 py-3
            text-sm leading-relaxed text-foreground outline-none
            placeholder:text-muted
            disabled:cursor-not-allowed
            ${autoResize ? 'overflow-hidden' : 'overflow-y-auto'}
            ${className}
          `}
        />
      </motion.div>

      {/* Displays helper text when no validation error exists. */}
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
          id={successId}
          role="status"
          className="text-xs leading-relaxed text-success"
        >
          {success}
        </p>
      )}

      {/* Displays the current character count when enabled. */}
      {showCount && maxLength !== undefined && (
        <p
          className="text-right text-xs tabular-nums text-muted"
          aria-live="polite"
        >
          {(value !== undefined
             ? String(value).length
             : characterCount)} / {maxLength} characters
        </p>
      )}
    </div>
  )
}
