import React from 'react'

export interface Column<T> {
  /** optional key to pull value from row; can be custom keys too */
  key?: keyof T | string
  label: string

  /** optional custom renderer */
  render?: (value: T[keyof T] | undefined, row: T, rowIndex: number) => React.ReactNode
}

export interface DataTableProps<T> {
  rows: T[]
  columns: Column<T>[]
}

export function DataTable<T>({ rows, columns }: DataTableProps<T>) {
  return (
    <table className="min-w-full border">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((c, idx) => (
            <th key={idx} className="border px-3 py-2 text-left">
              {c.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-t">
            {columns.map((col, colIndex) => {
              const value =
                col.key !== undefined
                  ? ((row as Record<string, unknown>)[col.key as string] as T[keyof T])
                  : undefined
              return (
                <td key={colIndex} className="border px-3 py-2">
                  {col.render
                    ? col.render(value, row, rowIndex)
                    : value !== undefined
                      ? String(value)
                      : ''}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
