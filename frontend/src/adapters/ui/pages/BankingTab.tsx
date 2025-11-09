import React from 'react'
import { BankingAPI } from '@infra/ApiClient'
import { ErrorBanner } from '../components/ErrorBanner'
import { DataTable } from '../components/DataTable'

export default function BankingTab() {
  const [shipId, setShipId] = React.useState('SHIP-001')
  const [year, setYear] = React.useState(new Date().getFullYear())
  const [cb, setCb] = React.useState(0)
  const [amount, setAmount] = React.useState('')
  const [records, setRecords] = React.useState<any[]>([])
  const [kpi, setKpi] = React.useState<any>(null)
  const [error, setError] = React.useState('')

  async function refresh() {
    try {
      const res = await BankingAPI.getCB(shipId, year)
      setCb(res.cb)
      setRecords(await BankingAPI.getBankRecords(shipId, year))
    } catch (e: any) {
      setError(e.message)
    }
  }

  React.useEffect(() => {
    refresh()
  }, [])

  async function bank() {
    try {
      const res = await BankingAPI.bank()
      setKpi(res.kpi)
      await refresh()
    } catch (e: any) {
      setError(e.message)
    }
  }

  async function apply() {
    try {
      const n = Number(amount)
      const res = await BankingAPI.apply(n)
      setKpi(res.kpi)
      await refresh()
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <div className="space-y-6">
      {error && <ErrorBanner message={error} />}

      <div className="flex gap-2 items-center">
        <input
          className="border px-2 py-1 rounded"
          value={shipId}
          onChange={e => setShipId(e.target.value)}
        />

        <input
          className="border px-2 py-1 rounded w-24"
          value={year}
          onChange={e => setYear(Number(e.target.value))}
        />

        <button className="px-3 py-2 rounded bg-gray-200" onClick={refresh}>
          Refresh
        </button>
      </div>

      <div className="p-3 bg-white border rounded">
        <p className="font-semibold">Current CB: {cb.toFixed(2)}</p>
      </div>

      <div className="flex gap-2 items-center">
        <button
          className="px-3 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
          disabled={cb <= 0}
          onClick={bank}
        >
          Bank Surplus
        </button>

        <input
          className="border px-2 py-1 rounded w-24"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <button
          className="px-3 py-2 bg-green-600 text-white rounded disabled:bg-gray-300"
          disabled={Number(amount) <= 0}
          onClick={apply}
        >
          Apply
        </button>
      </div>

      {kpi && (
        <div className="p-3 bg-gray-50 border rounded">
          <p>Before: {kpi.cb_before}</p>
          <p>Applied: {kpi.applied}</p>
          <p>After: {kpi.cb_after}</p>
        </div>
      )}

      <DataTable
        rows={records}
        columns={[
          { key: 'amount', label: 'Amount' },
          { key: 'year', label: 'Year' }
        ]}
      />
    </div>
  )
}
