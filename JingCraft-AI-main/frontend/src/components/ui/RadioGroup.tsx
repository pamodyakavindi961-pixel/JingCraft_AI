
import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

// Defines the structure of each radio option.
export interface RadioOption {
  label: ReactNode
  value: string
  description?: string
  disabled?: boolean
}

// Defines supported layout directions.
export type RadioGroupDirection = 'vertical' | 'horizontal'

// Defines the visual validation states.
export type RadioGroupStatus = 'default' | 'success' | 'error'

// Props supported by the reusable radio group.
export interface RadioGroupProps {
  label?: string
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  direction?: RadioGroupDirection
  helperText?: string
  error?: string
  success?: string
  disabled?: boolean
  required?: boolean
  name?: string
  containerClassName?: string
}

// Maps validation states to design system styles.
const statusStyles: Record<RadioGroupStatus, string> = {
  default: 'border-border',
  success: 'border-success',
  error: 'border-error',
}

// Reusable radio group component.
export default function RadioGroup({
  label,
  options,
  value,
  defaultValue,
  onChange,
  direction = 'vertical',
  helperText,
  error,
  success,
  disabled = false,
  required = false,
  name,
  containerClassName = '',
}: RadioGroupProps) {
  // Generates a stable identifier for the radio group.
  const generatedId = useId()
  const groupId = `radio-group-${generatedId}`

  // Tracks the selected value for uncontrolled usage.
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? '',
  )

  // Respects the user's reduced-motion preference.
  const shouldReduceMotion = useReducedMotion()

  // Supports both controlled and uncontrolled usage.
  const selectedValue = value !== undefined ? value : internalValue

  // Error state takes priority over success state.
  const groupStatus: RadioGroupStatus = error
    ? 'error'
    : success
      ? 'success'
      : 'default'

  // Creates a stable native form field name.
  const radioName = name ?? groupId

  // Connects supporting messages to the radio group.
  const descriptionId = `${groupId}-description`
  const errorId = `${groupId}-error`
  const successId = `${groupId}-success`

  const describedBy = [
    helperText && !error ? descriptionId : undefined,
    error ? errorId : undefined,
    !error && success ? successId : undefined,
  ]
    .filter(Boolean)
    .join(' ') || undefined

  // Updates the selected option and notifies the parent.
  const handleChange = (nextValue: string) => {
    if (disabled) return

    if (value === undefined) {
      setInternalValue(nextValue)
    }

    onChange?.(nextValue)
  }

  return (
    <div className={`w-full space-y-3 ${containerClassName}`}>

      {/* Displays the radio group heading. */}
      {label && (
        <p
          id={`${groupId}-label`}
          className="text-sm font-semibold text-foreground"
        >
          {label}

          {required && (
            <span className="ml-1 text-error" aria-hidden="true">
              *
            </span>
          )}
        </p>
      )}

      {/* Native fieldset groups related radio controls. */}
      <fieldset
        disabled={disabled}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        aria-required={required}
        aria-labelledby={label ? `${groupId}-label` : undefined}
        className={`
          rounded-lg border p-4
          ${statusStyles[groupStatus]}
          ${disabled ? 'opacity-50' : ''}
        `}
      >
        <div
          className={`
            flex gap-4
            ${direction === 'horizontal'
              ? 'flex-row flex-wrap'
              : 'flex-col'
            }
          `}
        >
          {options.map((option, index) => {
            const optionId = `${groupId}-option-${index}`
            const isSelected = selectedValue === option.value
            const isDisabled = disabled || Boolean(option.disabled)

            return (
              <label
                key={option.value}
                htmlFor={optionId}
                className={`
                  inline-flex items-start gap-3
                  ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                `}
              >
                {/* Native radio input provides keyboard and form behavior. */}
                <span className="relative mt-0.5 flex size-5 shrink-0 items-center justify-center">
                  <input
                    id={optionId}
                    type="radio"
                    name={radioName}
                    value={option.value}
                    checked={isSelected}
                    disabled={isDisabled}
                    required={required}
                    onChange={() => handleChange(option.value)}
                    className="
                      peer absolute inset-0 size-full cursor-pointer
                      opacity-0 disabled:cursor-not-allowed
                    "
                  />

                  {/* Custom visual radio indicator. */}
                  <span
                    aria-hidden="true"
                    className="
                      flex size-5 items-center justify-center
                      rounded-full border-2 border-border bg-white
                      transition-colors duration-200
                      peer-checked:border-primary
                      peer-focus-visible:ring-2
                      peer-focus-visible:ring-primary/30
                      peer-focus-visible:ring-offset-2
                      peer-disabled:cursor-not-allowed
                    "
                  >
                    {isSelected && (
                      <motion.span
                        initial={shouldReduceMotion ? false : { scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.15 }}
                        className="size-2.5 rounded-full bg-primary"
                      />
                    )}
                  </span>
                </span>

                {/* Displays option label and optional description. */}
                <span className="min-w-0">
                  <span className="block text-sm leading-relaxed text-foreground">
                    {option.label}
                  </span>

                  {option.description && (
                    <span className="mt-1 block text-xs leading-relaxed text-muted">
                      {option.description}
                    </span>
                  )}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {/* Displays helper information. */}
      {helperText && !error && (
        <p
          id={descriptionId}
          className="text-xs leading-relaxed text-muted"
        >
          {helperText}
        </p>
      )}

      {/* Displays validation errors. */}
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
    </div>
  )
}
