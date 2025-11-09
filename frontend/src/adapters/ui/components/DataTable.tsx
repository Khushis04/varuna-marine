import React from 'react'

export function DataTable<T extends object>({
  rows,
  columns
}: {
  rows: T[]
  columns: {
    key: keyof T
    label: string
    render?: (value: any, row: T, index: number) => React.ReactNode
  }[]
}) {
  return (
    <div className="overflow-x-auto border rounded-md bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(col => (
              <th
                key={String(col.key)}
                className="px-3 py-2 text-left font-semibold"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t">
              {columns.map(col => (
                <td key={String(col.key)} className="px-3 py-2">
                  {col.render
                    ? col.render((row as any)[col.key], row, i)
                    : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
