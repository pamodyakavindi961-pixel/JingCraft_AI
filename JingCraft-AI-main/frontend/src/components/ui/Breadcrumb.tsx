
import type { ReactNode } from 'react'
import { ChevronRight, MoreHorizontal } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: ReactNode
  maxItems?: number
  className?: string
}

function Breadcrumb({
  items,
  separator,
  maxItems = 4,
  className = '',
}: BreadcrumbProps) {
  if (items.length === 0) return null

  const lastIndex = items.length - 1

  const visibleItems =
    maxItems > 0 && items.length > maxItems
      ? [
          items[0],
          ...items.slice(-(maxItems - 1)),
        ]
      : items

  const hiddenItems =
    visibleItems.length < items.length
      ? items.slice(1, items.length - visibleItems.length + 1)
      : []

  const renderItem = (item: BreadcrumbItem, index: number) => {
    const isLast = index === lastIndex

    const sharedClasses = `text-sm transition-colors ${
      isLast
        ? 'font-semibold text-primary'
        : 'text-text-muted hover:text-primary'
    }`

    if (isLast) {
      return (
        <span
          aria-current="page"
          className={sharedClasses}
        >
          {item.label}
        </span>
      )
    }

    if (item.href) {
      return (
        <a
          href={item.href}
          className={sharedClasses}
        >
          {item.label}
        </a>
      )
    }

    if (item.onClick) {
      return (
        <button
          type="button"
          onClick={item.onClick}
          className={sharedClasses}
        >
          {item.label}
        </button>
      )
    }

    return (
      <span className="text-sm text-text-muted">
        {item.label}
      </span>
    )
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={className}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {visibleItems.map((item, index) => {
          const originalIndex =
            visibleItems.length < items.length && index > 0
              ? items.length - visibleItems.length + index
              : index

          return (
            <li
              key={`${item.label}-${originalIndex}`}
              className="flex min-w-0 items-center gap-2"
            >
              {index === 1 && hiddenItems.length > 0 && (
                <>
                  <span
                    aria-hidden="true"
                    className="text-text-muted"
                  >
                    {separator ?? <ChevronRight size={16} />}
                  </span>

                  <span className="group relative">
                    <button
                      type="button"
                      aria-label={`Show ${hiddenItems.length} hidden breadcrumb items`}
                      className="rounded-md p-1 text-text-muted hover:bg-background hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    <span className="absolute left-0 top-full z-50 hidden min-w-40 rounded-lg border border-border bg-white p-2 shadow-lg group-hover:block group-focus-within:block">
                      {hiddenItems.map((hiddenItem, hiddenIndex) => (
                        <span
                          key={`${hiddenItem.label}-${hiddenIndex}`}
                          className="block px-2 py-1.5 text-xs text-text-muted"
                        >
                          {hiddenItem.label}
                        </span>
                      ))}
                    </span>
                  </span>
                </>
              )}

              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="text-text-muted"
                >
                  {separator ?? <ChevronRight size={16} />}
                </span>
              )}

              <span className="min-w-0 truncate">
                {renderItem(item, originalIndex)}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
