
import { useMemo } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
  showFirstLast?: boolean
  showPageInfo?: boolean
  disabled?: boolean
  className?: string
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  showPageInfo = false,
  disabled = false,
  className = '',
}: PaginationProps) {
  const pages = useMemo(() => {
    if (totalPages <= 0) return []

    const totalVisible = siblingCount * 2 + 5

    if (totalPages <= totalVisible) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1)
    const rightSibling = Math.min(currentPage + siblingCount, totalPages)

    const showLeftDots = leftSibling > 2
    const showRightDots = rightSibling < totalPages - 1

    if (!showLeftDots && showRightDots) {
      const leftCount = 3 + siblingCount * 2
      return [
        ...Array.from({ length: leftCount }, (_, index) => index + 1),
        'ellipsis-right',
        totalPages,
      ]
    }

    if (showLeftDots && !showRightDots) {
      const rightCount = 3 + siblingCount * 2
      return [
        1,
        'ellipsis-left',
        ...Array.from(
          { length: rightCount },
          (_, index) => totalPages - rightCount + index + 1,
        ),
      ]
    }

    return [
      1,
      'ellipsis-left',
      ...Array.from(
        { length: rightSibling - leftSibling + 1 },
        (_, index) => leftSibling + index,
      ),
      'ellipsis-right',
      totalPages,
    ]
  }, [currentPage, totalPages, siblingCount])

  if (totalPages <= 1) return null

  const safePage = Math.min(Math.max(currentPage, 1), totalPages)

  const buttonBase =
    'inline-flex h-9 min-w-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40'

  const inactiveButton =
    'border-border bg-white text-foreground hover:border-primary hover:text-primary'

  const activeButton =
    'border-primary bg-primary text-white'

  const goToPage = (page: number) => {
    if (disabled || page < 1 || page > totalPages || page === safePage) {
      return
    }

    onPageChange(page)
  }

  return (
    <nav
      aria-label="Pagination"
      className={`flex flex-wrap items-center justify-between gap-4 ${className}`}
    >
      {showPageInfo && (
        <p className="text-sm text-text-muted">
          Page <span className="font-semibold text-foreground">{safePage}</span>
          {' '}of{' '}
          <span className="font-semibold text-foreground">{totalPages}</span>
        </p>
      )}

      <div className="flex flex-wrap items-center gap-1.5">
        {showFirstLast && (
          <button
            type="button"
            aria-label="Go to first page"
            disabled={disabled || safePage === 1}
            onClick={() => goToPage(1)}
            className={`${buttonBase} ${inactiveButton}`}
          >
            <ChevronsLeft size={16} />
          </button>
        )}

        <button
          type="button"
          aria-label="Go to previous page"
          disabled={disabled || safePage === 1}
          onClick={() => goToPage(safePage - 1)}
          className={`${buttonBase} ${inactiveButton}`}
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((page) => {
          if (typeof page !== 'number') {
            return (
              <span
                key={page}
                aria-hidden="true"
                className="flex h-9 min-w-8 items-center justify-center text-sm text-text-muted"
              >
                ...
              </span>
            )
          }

          const isActive = page === safePage

          return (
            <button
              key={page}
              type="button"
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? 'page' : undefined}
              disabled={disabled}
              onClick={() => goToPage(page)}
              className={`${buttonBase} ${
                isActive ? activeButton : inactiveButton
              }`}
            >
              {page}
            </button>
          )
        })}

        <button
          type="button"
          aria-label="Go to next page"
          disabled={disabled || safePage === totalPages}
          onClick={() => goToPage(safePage + 1)}
          className={`${buttonBase} ${inactiveButton}`}
        >
          <ChevronRight size={16} />
        </button>

        {showFirstLast && (
          <button
            type="button"
            aria-label="Go to last page"
            disabled={disabled || safePage === totalPages}
            onClick={() => goToPage(totalPages)}
            className={`${buttonBase} ${inactiveButton}`}
          >
            <ChevronsRight size={16} />
          </button>
        )}
      </div>
    </nav>
  )
}

export default Pagination
