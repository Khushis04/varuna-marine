import React from 'react'
import { RoutesAPI } from '@infra/ApiClient'
import type { Route } from '@core/domain/Route'
import { DataTable } from '../components/DataTable'
import { ErrorBanner } from '../components/ErrorBanner'

export default function RoutesTab() {
  const [rows, setRows] = React.useState<Route[]>([])
  const [error, setError] = React.useState<string>('')
  const [filters, setFilters] = React.useState<{
    vesselType?: string
    fuelType?: string
    year?: string
  }>({})

  React.useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      const data = await RoutesAPI.getRoutes()
      setRows(data)
    } catch (e) {
      if (e instanceof Error) setError(e.message)
    }
  }

  const filtered = rows.filter(
    (r) =>
      (!filters.vesselType || r.vesselType === filters.vesselType) &&
      (!filters.fuelType || r.fuelType === filters.fuelType) &&
      (!filters.year || r.year === Number(filters.year))
  )

  return (
    <div className="space-y-4">
      {error && <ErrorBanner message={error} />}

      <div className="flex flex-wrap gap-2">
        <select
          className="border rounded px-2 py-1"
          value={filters.vesselType || ''}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              vesselType: e.target.value || undefined,
            }))
          }
        >
          <option value="">All Vessel Types</option>
          <option>container</option>
          <option>tanker</option>
          <option>bulk</option>
          <option>ro-ro</option>
          <option>passenger</option>
        </select>

        <select
          className="border rounded px-2 py-1"
          value={filters.fuelType || ''}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              fuelType: e.target.value || undefined,
            }))
          }
        >
          <option value="">All Fuels</option>
          <option>HFO</option>
          <option>MDO</option>
          <option>LNG</option>
          <option>Methanol</option>
          <option>Ammonia</option>
        </select>

        <input
          className="border rounded px-2 py-1"
          placeholder="Year"
          value={filters.year || ''}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              year: e.target.value || undefined,
            }))
          }
        />
      </div>

      <DataTable
        rows={filtered}
        columns={[
          { key: 'routeId', label: 'routeId' },
          { key: 'vesselType', label: 'vesselType' },
          { key: 'fuelType', label: 'fuelType' },
          { key: 'year', label: 'year' },
          { key: 'ghgIntensity', label: 'ghgIntensity' },
          { key: 'fuelConsumption', label: 'fuelConsumption' },
          { key: 'distance', label: 'distance' },
          { key: 'totalEmissions', label: 'totalEmissions' },
          {
            key: 'isBaseline',
            label: 'baseline',
            render: (v) => (v ? 'ok' : '—'),
          },
          {
            key: 'id',
            label: '',
            render: (_v, row) => (
              <button
                className="px-2 py-1 text-sm rounded bg-blue-600 text-white disabled:opacity-50"
                disabled={row.isBaseline}
                onClick={async () => {
                  await RoutesAPI.setBaseline(row.id)
                  await load()
                }}
              >
                Set Baseline
              </button>
            ),
          },
        ]}
      />
    </div>
  )
}
