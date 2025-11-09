import React from 'react'
import { RoutesAPI } from '@infra/ApiClient'
import { TARGET_2025 } from '@core/domain/Compliance'
import { percentDiff } from '@core/application/usecases'
import { DataTable } from '../components/DataTable'
import { Badge } from '../components/Badge'
import { ErrorBanner } from '../components/ErrorBanner'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

interface ComparisonItem {
  route: {
    routeId: string
    ghgIntensity: number
  }
  compliant: boolean
}

interface ComparisonResponse {
  baseline: {
    routeId: string
    ghgIntensity: number
  }
  comparisons: ComparisonItem[]
}

export default function CompareTab() {
  const [data, setData] = React.useState<ComparisonResponse | null>(null)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    ;(async () => {
      try {
        setData(await RoutesAPI.getComparison())
      } catch (e) {
        if (e instanceof Error) setError(e.message)
      }
    })()
  }, [])

  if (error) return <ErrorBanner message={error} />
  if (!data) return <div>Loading…</div>

  const chartData = [
    {
      name: data.baseline.routeId,
      baseline: data.baseline.ghgIntensity,
      value: data.baseline.ghgIntensity,
    },
    ...data.comparisons.map((c) => ({
      name: c.route.routeId,
      baseline: data.baseline.ghgIntensity,
      value: c.route.ghgIntensity,
    })),
  ]

  return (
    <div className="space-y-6">
      <DataTable<ComparisonItem>
        rows={data.comparisons}
        columns={[
          { key: 'route', label: 'Route', render: (_, r) => r.route.routeId },
          { key: 'ghg', label: 'Baseline', render: () => data.baseline.ghgIntensity.toFixed(4) },
          { key: 'ghg2', label: 'Comparison', render: (_, r) => r.route.ghgIntensity.toFixed(4) },
          {
            key: 'diff',
            label: '% Difference',
            render: (_, r) =>
              percentDiff(r.route.ghgIntensity, data.baseline.ghgIntensity).toFixed(2) + '%',
          },
          {
            key: 'cmp',
            label: 'Compliant',
            render: (_, r) => (
              <Badge color={r.compliant ? 'green' : 'red'}>{r.compliant ? 'yes' : 'no'}</Badge>
            ),
          },
        ]}
      />

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine
              y={TARGET_2025}
              label={`Target ${TARGET_2025}`}
              stroke="red"
              strokeDasharray="3 3"
            />
            <Bar dataKey="baseline" name="Baseline" />
            <Bar dataKey="value" name="Route GHG" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
