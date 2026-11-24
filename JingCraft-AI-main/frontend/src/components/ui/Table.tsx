
import type { ReactNode } from 'react'
import { LoaderCircle, Database } from 'lucide-react'

export interface TableColumn<T> {
  key: keyof T | string
  header: string
  render?: (row: T, index: number) => ReactNode
  align?: 'left' | 'center' | 'right'
  width?: string
  className?: string
}

export interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  rowKey: keyof T
  variant?: 'default' | 'striped' | 'bordered'
  hoverable?: boolean
  loading?: boolean
  emptyMessage?: string
  emptyDescription?: string
  onRowClick?: (row: T) => void
  className?: string
}

export default function Table<T>({
  columns,
  data,
  rowKey,
  variant = 'default',
  hoverable = true,
  loading = false,
  emptyMessage = 'No data available',
  emptyDescription = 'There are currently no records to display.',
  onRowClick,
  className = '',
}: TableProps<T>) {
  const getCellValue = (row: T, key: keyof T | string) => {
    return (row as Record<string, unknown>)[String(key)]
  }

  const getRowKey = (row: T) => String(getCellValue(row, rowKey))

  const getVariantClasses = () => {
    switch (variant) {
      case 'striped':
        return '[&_tbody_tr:nth-child(even)]:bg-porcelain/70'
      case 'bordered':
        return 'border border-border [&_th]:border-r [&_td]:border-r [&_th]:border-border [&_td]:border-border'
      default:
        return ''
    }
  }

  return (
    <div
      className={`w-full overflow-x-auto rounded-xl ${className}`}
    >
      <table
        className={`w-full border-collapse text-left text-sm ${getVariantClasses()}`}
      >
        <thead>
          <tr className="border-b border-border bg-porcelain/80">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                scope="col"
                style={{ width: column.width }}
                className={`px-5 py-4 font-semibold text-ink ${
                  column.align === 'center'
                    ? 'text-center'
                    : column.align === 'right'
                      ? 'text-right'
                      : 'text-left'
                } ${column.className ?? ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-12">
                <div className="flex flex-col items-center justify-center gap-3 text-muted">
                  <LoaderCircle
                    size={26}
                    className="animate-spin text-primary motion-reduce:animate-none"
                    aria-hidden="true"
                  />
                  <span role="status">Loading data...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-12">
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  <Database
                    size={30}
                    className="text-muted"
                    aria-hidden="true"
                  />
                  <p className="font-medium text-ink">{emptyMessage}</p>
                  <p className="text-xs text-muted">
                    {emptyDescription}
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={getRowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={`
                  transition-colors duration-200
                  ${hoverable ? 'hover:bg-imperial-blue/5' : ''}
                  ${onRowClick ? 'cursor-pointer' : ''}
                  ${variant === 'default' ? 'border-b border-border' : ''}
                `}
              >
                {columns.map((column) => {
                  const value = getCellValue(row, column.key)

                  return (
                    <td
                      key={String(column.key)}
                      className={`px-5 py-4 text-muted ${
                        column.align === 'center'
                          ? 'text-center'
                          : column.align === 'right'
                            ? 'text-right'
                            : 'text-left'
                      } ${column.className ?? ''}`}
                    >
                      {column.render
                        ? column.render(row, rowIndex)
                        : value === null || value === undefined
                          ? '—'
                          : String(value)}
                    </td>
                  )
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
