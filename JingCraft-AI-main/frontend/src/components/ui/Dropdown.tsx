
import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronDown, Check } from 'lucide-react'

export interface DropdownItem {
  label: string
  value: string
  disabled?: boolean
  destructive?: boolean
  icon?: ReactNode
}

interface DropdownProps {
  triggerLabel: string
  items: DropdownItem[]
  onSelect?: (value: string) => void
  selectedValue?: string
  placeholder?: string
  placement?: 'bottom' | 'top'
  align?: 'start' | 'end'
  variant?: 'default' | 'outline' | 'ghost'
  disabled?: boolean
  className?: string
}

function Dropdown({
  triggerLabel,
  items,
  onSelect,
  selectedValue,
  placeholder,
  placement = 'bottom',
  align = 'start',
  variant = 'outline',
  disabled = false,
  className = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const enabledItems = items.filter((item) => !item.disabled)

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const menuItems =
      containerRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="menuitem"]:not(:disabled)',
      )

    if (!menuItems?.length) return

    const currentIndex = Array.from(menuItems).indexOf(
      document.activeElement as HTMLButtonElement,
    )

    let nextIndex: number

    if (event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % menuItems.length
    } else if (event.key === 'ArrowUp') {
      nextIndex =
        (currentIndex - 1 + menuItems.length) % menuItems.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = menuItems.length - 1
    } else {
      return
    }

    event.preventDefault()
    menuItems[nextIndex]?.focus()
  }

  const handleSelect = (value: string) => {
    onSelect?.(value)
    setIsOpen(false)
  }

  const variantClasses = {
    default: 'border border-transparent bg-primary text-white hover:bg-primary/90',
    outline: 'border border-border bg-white text-foreground hover:bg-background',
    ghost: 'border border-transparent bg-transparent text-foreground hover:bg-background',
  }

  const selectedItem = items.find((item) => item.value === selectedValue)

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        disabled={disabled}
        onClick={() => setIsOpen((current) => !current)}
        className={`inline-flex min-h-10 items-center justify-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]}`}
      >
        <span>{selectedItem?.label ?? selectedValue ?? placeholder ?? triggerLabel}</span>

        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: placement === 'bottom' ? -4 : 4 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.16 }}
            className={`absolute z-50 mt-2 min-w-52 overflow-hidden rounded-xl border border-border bg-white p-1.5 shadow-lg ${
              placement === 'top'
                ? 'bottom-full mb-2 mt-0'
                : 'top-full'
            } ${
              align === 'end' ? 'right-0' : 'left-0'
            }`}
          >
            {items.map((item) => {
              const isSelected = selectedValue === item.value

              return (
                <button
                  key={item.value}
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  tabIndex={-1}
                  onClick={() => handleSelect(item.value)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors focus:bg-background focus:outline-none disabled:cursor-not-allowed disabled:opacity-40 ${
                    item.destructive
                      ? 'text-error hover:bg-error/5'
                      : 'text-foreground hover:bg-background'
                  }`}
                >
                  {item.icon && (
                    <span className="shrink-0">{item.icon}</span>
                  )}

                  <span className="flex-1">{item.label}</span>

                  {isSelected && (
                    <Check
                      size={16}
                      className="shrink-0 text-primary"
                      aria-hidden="true"
                    />
                  )}
                </button>
              )
            })}

            {enabledItems.length === 0 && (
              <p className="px-3 py-2 text-sm text-text-muted">
                No available options
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dropdown
