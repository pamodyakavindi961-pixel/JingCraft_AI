
import { useId, useState } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { Check } from 'lucide-react'

// Defines the visual validation states.
export type CheckboxStatus = 'default' | 'success' | 'error'

// Extends native checkbox attributes.
export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode
  helperText?: string
  error?: string
  success?: string
  containerClassName?: string
  checkboxClassName?: string
}

// Maps validation states to consistent design system styles.
const statusStyles: Record<CheckboxStatus, string> = {
  default: 'border-border',
  success: 'border-success',
  error: 'border-error',
}

// Reusable checkbox component for JingCraft AI.
export default function Checkbox({
  label,
  helperText,
  error,
  success,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  required = false,
  id,
  className = '',
  containerClassName = '',
  checkboxClassName = '',
  ...props
}: CheckboxProps) {
  // Generates a stable ID when the parent does not provide one.
  const generatedId = useId()
  const checkboxId = id ?? generatedId

  // Tracks the checked state for uncontrolled usage.
  const [internalChecked, setInternalChecked] = useState(defaultChecked)

  // Supports both controlled and uncontrolled usage.
  const isChecked = checked !== undefined ? checked : internalChecked

  // Error state takes priority over success state.
  const checkboxStatus: CheckboxStatus = error
    ? 'error'
    : success
      ? 'success'
      : 'default'

  // Connects supporting messages to the checkbox.
  const descriptionId = `${checkboxId}-description`
  const errorId = `${checkboxId}-error`
  const successId = `${checkboxId}-success`

  const describedBy = [
    helperText && !error ? descriptionId : undefined,
    error ? errorId : undefined,
    !error && success ? successId : undefined,
  ]
    .filter(Boolean)
    .join(' ') || undefined

  // Updates internal state and notifies the parent component.
  const handleChange: CheckboxProps['onChange'] = (event) => {
    if (checked === undefined) {
      setInternalChecked(event.currentTarget.checked)
    }

    onChange?.(event)
  }

  return (
    <div className={`space-y-2 ${containerClassName}`}>

      {/* Checkbox control and accessible label. */}
      <label
        htmlFor={checkboxId}
        className={`
          inline-flex items-start gap-3
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          ${className}
        `}
      >
        {/* Native checkbox preserves standard form behavior. */}
        <span className="relative mt-0.5 flex shrink-0">
          <input
            {...props}
            id={checkboxId}
            type="checkbox"
            checked={isChecked}
            disabled={disabled}
            required={required}
            onChange={handleChange}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className="peer sr-only"
          />

          {/* Custom visual checkbox. */}
          <span
            aria-hidden="true"
            className={`
              flex size-5 items-center justify-center
              rounded-[5px] border bg-white
              transition-colors duration-200
              peer-checked:border-primary
              peer-checked:bg-primary
              peer-focus-visible:ring-2
              peer-focus-visible:ring-primary/30
              peer-focus-visible:ring-offset-2
              peer-disabled:cursor-not-allowed
              ${statusStyles[checkboxStatus]}
              ${checkboxClassName}
            `}
          >
            {isChecked && (
              <Check
                size={14}
                strokeWidth={3}
                className="text-white"
              />
            )}
          </span>
        </span>

        {/* Displays the checkbox label. */}
        {label && (
          <span className="text-sm leading-relaxed text-foreground">
            {label}

            {required && (
              <span className="ml-1 text-error" aria-hidden="true">
                *
              </span>
            )}
          </span>
        )}
      </label>

      {/* Displays helper information. */}
      {helperText && !error && (
        <p
          id={descriptionId}
          className="pl-8 text-xs leading-relaxed text-muted"
        >
          {helperText}
        </p>
      )}

      {/* Displays validation errors. */}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="pl-8 text-xs leading-relaxed text-error"
        >
          {error}
        </p>
      )}

      {/* Displays successful validation feedback. */}
      {!error && success && (
        <p
          id={successId}
          role="status"
          className="pl-8 text-xs leading-relaxed text-success"
        >
          {success}
        </p>
      )}
    </div>
  )
}
