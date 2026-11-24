
import {
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import type { KeyboardEvent } from 'react'
import {
  Check,
  ChevronDown,
  Search,
  X,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

// Defines the structure of each selectable option.
export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

// Defines the visual validation states.
export type SelectStatus = 'default' | 'success' | 'error'

// Props supported by the reusable Select component.
export interface SelectProps {
  label?: string
  placeholder?: string
  helperText?: string
  error?: string
  success?: string
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  searchable?: boolean
  searchPlaceholder?: string
  disabled?: boolean
  required?: boolean
  clearable?: boolean
  containerClassName?: string
}

// Maps validation states to design system styles.
const statusStyles: Record<SelectStatus, string> = {
  default: 'border-border',
  success: 'border-success',
  error: 'border-error',
}

// Reusable searchable select component.
export default function Select({
  label,
  placeholder = 'Select an option',
  helperText,
  error,
  success,
  options,
  value,
  defaultValue,
  onChange,
  searchable = false,
  searchPlaceholder = 'Search options...',
  disabled = false,
  required = false,
  clearable = false,
  containerClassName = '',
}: SelectProps) {
  // Generates a stable ID for accessibility.
  const generatedId = useId()
  const selectId = `select-${generatedId}`

  // References the dropdown container and search input.
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  // Tracks dropdown visibility and search query.
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Tracks the selected value for uncontrolled usage.
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? '',
  )

  // Tracks the highlighted option for keyboard navigation.
  const [activeIndex, setActiveIndex] = useState(-1)

  // Respects the user's reduced-motion preference.
  const shouldReduceMotion = useReducedMotion()

  // Supports both controlled and uncontrolled usage.
  const selectedValue = value !== undefined ? value : internalValue

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  )

  // Determines the current validation state.
  const selectStatus: SelectStatus = error
    ? 'error'
    : success
      ? 'success'
      : 'default'

  // Filters options when searchable mode is enabled.
  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : options

  // Finds the first enabled option.
  const firstEnabledIndex = filteredOptions.findIndex(
    (option) => !option.disabled,
  )

  // Connects supporting messages to the trigger.
  const descriptionId = `${selectId}-description`
  const errorId = `${selectId}-error`
  const successId = `${selectId}-success`

  const describedBy = [
    helperText && !error ? descriptionId : undefined,
    error ? errorId : undefined,
    !error && success ? successId : undefined,
  ]
    .filter(Boolean)
    .join(' ') || undefined

  // Updates the selected value and notifies the parent.
  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return

    if (value === undefined) {
      setInternalValue(option.value)
    }

    onChange?.(option.value)
    setIsOpen(false)
    setSearchQuery('')
    setActiveIndex(-1)
  }

  // Clears the current selection.
  const handleClear = () => {
    if (value === undefined) {
      setInternalValue('')
    }

    onChange?.('')
    setSearchQuery('')
    setActiveIndex(-1)
  }

  // Opens the dropdown and initializes keyboard navigation.
  const openDropdown = () => {
    if (disabled) return

    setIsOpen(true)

    const selectedIndex = filteredOptions.findIndex(
      (option) =>
        option.value === selectedValue && !option.disabled,
    )

    setActiveIndex(
      selectedIndex >= 0 ? selectedIndex : firstEnabledIndex,
    )
  }

  // Handles keyboard navigation and selection.
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return

    if (!isOpen) {
      if (
        event.key === 'Enter' ||
        event.key === ' ' ||
        event.key === 'ArrowDown'
      ) {
        event.preventDefault()
        openDropdown()
      }

      return
    }

    switch (event.key) {
      case 'Escape':
        event.preventDefault()
        setIsOpen(false)
        setSearchQuery('')
        break

      case 'ArrowDown': {
        event.preventDefault()

        let nextIndex = activeIndex

        for (let i = 0; i < filteredOptions.length; i += 1) {
          nextIndex = (nextIndex + 1) % filteredOptions.length

          if (!filteredOptions[nextIndex].disabled) {
            setActiveIndex(nextIndex)
            break
          }
        }

        break
      }

      case 'ArrowUp': {
        event.preventDefault()

        let previousIndex = activeIndex

        for (let i = 0; i < filteredOptions.length; i += 1) {
          previousIndex =
            (previousIndex - 1 + filteredOptions.length) %
            filteredOptions.length

          if (!filteredOptions[previousIndex].disabled) {
            setActiveIndex(previousIndex)
            break
          }
        }

        break
      }

      case 'Enter':
      case ' ': {
        event.preventDefault()

        const option = filteredOptions[activeIndex]

        if (option && !option.disabled) {
          handleSelect(option)
        }

        break
      }

      case 'Home':
        event.preventDefault()
        setActiveIndex(firstEnabledIndex)
        break

      case 'End': {
        event.preventDefault()

        const lastEnabledIndex = filteredOptions.findLastIndex(
          (option) => !option.disabled,
        )

        setActiveIndex(lastEnabledIndex)
        break
      }
    }
  }

  // Closes the dropdown when clicking outside its container.
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  // Focuses the search input when the dropdown opens.
  useEffect(() => {
    if (isOpen && searchable) {
      searchRef.current?.focus()
    }
  }, [isOpen, searchable])

  return (
    <div
      ref={containerRef}
      className={`relative w-full space-y-2 ${containerClassName}`}
    >
      {/* Accessible field label. */}
      {label && (
        <label
          id={`${selectId}-label`}
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

      {/* Dropdown trigger. */}
      <button
        type="button"
        id={selectId}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={
          label ? `${selectId}-label ${selectId}` : undefined
        }
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        aria-required={required}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false)
            setSearchQuery('')
          } else {
            openDropdown()
          }
        }}
        onKeyDown={handleKeyDown}
        className={`
          flex min-h-12 w-full items-center justify-between
          gap-3 rounded-lg border bg-white px-4 py-3
          text-left text-sm outline-none
          transition-colors duration-200
          focus-visible:border-primary focus-visible:ring-2
          focus-visible:ring-primary/20
          ${statusStyles[selectStatus]}
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        `}
      >
        <span
          className={
            selectedOption
              ? 'truncate text-foreground'
              : 'truncate text-muted'
          }
        >
          {selectedOption?.label ?? placeholder}
        </span>

        <span className="flex shrink-0 items-center gap-2">
          {clearable && selectedOption && !disabled && (
            <span
              role="button"
              aria-label="Clear selection"
              tabIndex={-1}
              onClick={(event) => {
                event.stopPropagation()
                handleClear()
              }}
              className="rounded p-1 text-muted hover:text-error"
            >
              <X size={15} aria-hidden="true" />
            </span>
          )}

          <ChevronDown
            size={18}
            aria-hidden="true"
            className={`text-muted transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </span>
      </button>

      {/* Animated dropdown panel. */}
      {isOpen && (
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: -6 }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={
            shouldReduceMotion
              ? undefined
              : { opacity: 0, y: -6 }
          }
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="
            absolute left-0 top-full z-30 mt-2 w-full
            overflow-hidden rounded-lg border border-border
            bg-white shadow-xl
          "
        >
          {/* Search field. */}
          {searchable && (
            <div className="border-b border-border p-3">
              <div className="flex items-center gap-2 rounded-md border border-border px-3">
                <Search
                  size={16}
                  className="shrink-0 text-muted"
                  aria-hidden="true"
                />

                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                    onChange={(event) => {
                        const nextQuery = event.target.value

                        setSearchQuery(nextQuery)

                        const nextIndex = options.findIndex(
                            (option) =>
                            !option.disabled &&
                            option.label
                                .toLowerCase()
                                .includes(nextQuery.toLowerCase()),
                        )

                        setActiveIndex(nextIndex)
                        }}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      event.preventDefault()
                      setIsOpen(false)
                      setSearchQuery('')
                    }
                  }}
                  placeholder={searchPlaceholder}
                  aria-label="Search options"
                  className="
                    min-w-0 flex-1 bg-transparent py-2
                    text-sm text-foreground outline-none
                    placeholder:text-muted
                  "
                />
              </div>
            </div>
          )}

          {/* Selectable options. */}
          <ul
            role="listbox"
            aria-labelledby={label ? `${selectId}-label` : undefined}
            aria-activedescendant={
              activeIndex >= 0
                ? `${selectId}-option-${activeIndex}`
                : undefined
            }
            className="max-h-60 overflow-y-auto p-1"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  id={`${selectId}-option-${index}`}
                  role="option"
                  aria-selected={option.value === selectedValue}
                  aria-disabled={option.disabled || undefined}
                  onMouseEnter={() => {
                    if (!option.disabled) {
                      setActiveIndex(index)
                    }
                  }}
                  onClick={() => handleSelect(option)}
                  className={`
                    flex items-center justify-between gap-3
                    rounded-md px-3 py-2.5 text-sm
                    transition-colors duration-150
                    ${
                      option.disabled
                        ? 'cursor-not-allowed opacity-40'
                        : 'cursor-pointer'
                    }
                    ${
                      index === activeIndex && !option.disabled
                        ? 'bg-porcelain text-primary'
                        : 'text-foreground hover:bg-porcelain'
                    }
                  `}
                >
                  <span>{option.label}</span>

                  {option.value === selectedValue && (
                    <Check
                      size={16}
                      className="shrink-0 text-primary"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))
            ) : (
              <li className="px-3 py-6 text-center text-sm text-muted">
                No matching options found.
              </li>
            )}
          </ul>
        </motion.div>
      )}

      {/* Helper message. */}
      {helperText && !error && (
        <p
          id={descriptionId}
          className="text-xs leading-relaxed text-muted"
        >
          {helperText}
        </p>
      )}

      {/* Validation error. */}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs leading-relaxed text-error"
        >
          {error}
        </p>
      )}

      {/* Successful validation feedback. */}
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
