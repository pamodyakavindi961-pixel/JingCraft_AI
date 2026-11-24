
import { useId, useState } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export type SwitchSize = 'sm' | 'md' | 'lg'

export interface SwitchProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | 'type'
    | 'size'
    | 'checked'
    | 'defaultChecked'
    | 'onChange'
  > {
  label: ReactNode
  description?: string
  helperText?: string
  error?: string
  success?: string
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  size?: SwitchSize
  containerClassName?: string
}

const sizeStyles = {
  sm: {
    track: 'h-5 w-9',
    thumb: 'h-3.5 w-3.5',
    translate: 16,
  },
  md: {
    track: 'h-6 w-11',
    thumb: 'h-4 w-4',
    translate: 20,
  },
  lg: {
    track: 'h-7 w-[3.25rem]',
    thumb: 'h-5 w-5',
    translate: 24,
  },
}

function Switch({
  label,
  description,
  helperText,
  error,
  success,
  checked,
  defaultChecked = false,
  onChange,
  size = 'md',
  disabled = false,
  required = false,
  id,
  name,
  containerClassName = '',
  ...inputProps
}: SwitchProps) {
  const generatedId = useId()
  const switchId = id ?? generatedId
  const messageId = `${switchId}-message`

  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const shouldReduceMotion = useReducedMotion()

  const isChecked = checked !== undefined ? checked : internalChecked
  const message = error || success || helperText

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextChecked = event.target.checked

    if (checked === undefined) {
      setInternalChecked(nextChecked)
    }

    onChange?.(nextChecked)
  }

  const dimensions = sizeStyles[size]

  return (
    <div className={`flex items-start gap-3 ${containerClassName}`}>
      <label
        htmlFor={switchId}
        className={`relative inline-flex shrink-0 items-center ${
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <input
          {...inputProps}
          id={switchId}
          name={name}
          type="checkbox"
          role="switch"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={message ? messageId : undefined}
          className="peer sr-only"
        />

        <motion.span
          aria-hidden="true"
          animate={{
            backgroundColor: isChecked ? '#193C67' : '#D6D3CC',
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.2,
          }}
          className={`relative flex ${dimensions.track} items-center rounded-full transition-shadow peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 ${
            disabled ? 'opacity-50' : ''
          }`}
        >
          <motion.span
            animate={{
              x: isChecked ? dimensions.translate : 4,
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              duration: shouldReduceMotion ? 0 : undefined,
            }}
            className={`absolute left-0 ${dimensions.thumb} rounded-full bg-white shadow-sm`}
          />
        </motion.span>
      </label>

      <div className="min-w-0 flex-1">
        <label
          htmlFor={switchId}
          className={`block text-sm font-medium ${
            disabled ? 'cursor-not-allowed text-muted' : 'cursor-pointer text-foreground'
          }`}
        >
          {label}
          {required && (
            <span className="ml-1 text-error" aria-hidden="true">
              *
            </span>
          )}
        </label>

        {description && (
          <p className="mt-1 text-sm leading-relaxed text-text-muted">
            {description}
          </p>
        )}

        {message && (
          <p
            id={messageId}
            role={error ? 'alert' : undefined}
            className={`mt-1 text-xs leading-relaxed ${
              error
                ? 'text-error'
                : success
                  ? 'text-success'
                  : 'text-text-muted'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

export default Switch
