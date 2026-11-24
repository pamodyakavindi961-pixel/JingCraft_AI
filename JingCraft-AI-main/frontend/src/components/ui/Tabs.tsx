
import { useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { motion } from 'motion/react'

export interface TabItem {
  label: string
  value: string
  content: ReactNode
  disabled?: boolean
}

interface TabsProps {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  variant?: 'underline' | 'pills' | 'boxed'
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

function Tabs({
  items,
  value,
  defaultValue,
  onChange,
  variant = 'underline',
  orientation = 'horizontal',
  className = '',
}: TabsProps) {
  const enabledItems = items.filter((item) => !item.disabled)

  const [internalValue, setInternalValue] = useState(
    defaultValue ?? enabledItems[0]?.value ?? '',
  )

  const isControlled = value !== undefined
  const activeValue = isControlled ? value : internalValue

  const activeItem = items.find((item) => item.value === activeValue)

  const selectTab = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue)
    }

    onChange?.(nextValue)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const isHorizontal = orientation === 'horizontal'

    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown'
    const previousKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp'

    if (
      event.key !== nextKey &&
      event.key !== previousKey &&
      event.key !== 'Home' &&
      event.key !== 'End'
    ) {
      return
    }

    event.preventDefault()

    const currentIndex = enabledItems.findIndex(
      (item) => item.value === activeValue,
    )

    let nextIndex = currentIndex

    if (event.key === nextKey) {
      nextIndex = (currentIndex + 1) % enabledItems.length
    } else if (event.key === previousKey) {
      nextIndex =
        (currentIndex - 1 + enabledItems.length) % enabledItems.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = enabledItems.length - 1
    }

    const nextItem = enabledItems[nextIndex]

    if (nextItem) {
      selectTab(nextItem.value)

      const tabList = event.currentTarget.parentElement
      const nextButton = tabList?.querySelector<HTMLButtonElement>(
        `[data-tab-value="${nextItem.value}"]`,
      )

      nextButton?.focus()
    }
  }

  if (items.length === 0) {
    return null
  }

  const tabListClasses = {
    underline:
      'border-b border-border gap-6',
    pills:
      'gap-2 rounded-xl bg-background p-1',
    boxed:
      'gap-1 rounded-xl border border-border bg-white p-1',
  }

  const tabButtonClasses = {
    underline:
      'border-b-2 -mb-px rounded-t-md px-1 py-3',
    pills:
      'rounded-lg px-4 py-2',
    boxed:
      'rounded-lg px-4 py-2',
  }

  return (
    <div
      className={`${orientation === 'vertical' ? 'flex flex-col gap-5 sm:flex-row' : 'space-y-5'} ${className}`}
    >
      <div
        role="tablist"
        aria-orientation={orientation}
        className={`flex ${
          orientation === 'vertical'
            ? 'flex-row flex-wrap sm:w-48 sm:flex-col'
            : 'flex-wrap'
        } ${tabListClasses[variant]}`}
      >
        {items.map((item) => {
          const isActive = activeValue === item.value

          return (
            <button
              key={item.value}
              id={`tab-${item.value}`}
              type="button"
              role="tab"
              data-tab-value={item.value}
              aria-selected={isActive}
              aria-controls={`panel-${item.value}`}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              onClick={() => selectTab(item.value)}
              onKeyDown={handleKeyDown}
              className={`relative whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 ${
                tabButtonClasses[variant]
              } ${
                isActive
                  ? 'text-primary'
                  : 'text-text-muted hover:text-foreground'
              } ${
                variant === 'underline' && isActive
                  ? 'border-primary'
                  : variant === 'underline'
                    ? 'border-transparent'
                    : ''
              } ${
                variant === 'pills' && isActive
                  ? 'bg-white text-primary shadow-sm'
                  : ''
              } ${
                variant === 'boxed' && isActive
                  ? 'bg-primary text-white shadow-sm'
                  : ''
              }`}
            >
              {item.label}

              {variant === 'underline' && isActive && (
                <motion.span
                  layoutId="tabs-active-indicator"
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          )
        })}
      </div>

      {activeItem && (
        <div
          id={`panel-${activeItem.value}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeItem.value}`}
          tabIndex={0}
          className="min-w-0 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {activeItem.content}
        </div>
      )}
    </div>
  )
}

export default Tabs
