import React from 'react'
import { BankingAPI } from '@infra/ApiClient'
import { ErrorBanner } from '../components/ErrorBanner'
import { DataTable } from '../components/DataTable'

interface BankRecord {
  amount: number
  year: number
}

interface CBResponse {
  cb: number
}

interface KPI {
  cb_before: number
  applied: number
  cb_after: number
}

interface BankResult {
  kpi: KPI
}

export default function BankingTab() {
  const [shipId, setShipId] = React.useState<string>('SHIP-001')
  const [year, setYear] = React.useState<number>(new Date().getFullYear())
  const [cb, setCb] = React.useState<number>(0)
  const [amount, setAmount] = React.useState<string>('')

  const [records, setRecords] = React.useState<BankRecord[]>([])
  const [kpi, setKpi] = React.useState<KPI | null>(null)
  const [error, setError] = React.useState<string>('')

  async function refresh() {
    try {
      const res: CBResponse = await BankingAPI.getCB(shipId, year)
      setCb(res.cb)

      const recs: BankRecord[] = await BankingAPI.getBankRecords(shipId, year)
      setRecords(recs)
    } catch (err) {
      if (err instanceof Error) setError(err.message)
    }
  }

  React.useEffect(() => {
    refresh()
  }, [])

  async function bank() {
    try {
      const res: BankResult = await BankingAPI.bank(shipId, year)
      setKpi(res.kpi)
      await refresh()
    } catch (err) {
      if (err instanceof Error) setError(err.message)
    }
  }

  async function apply() {
    try {
      const n = Number(amount)
      const res: BankResult = await BankingAPI.apply(shipId, year, n)
      setKpi(res.kpi)
      await refresh()
    } catch (err) {
      if (err instanceof Error) setError(err.message)
    }
  }

  return (
    <div className="space-y-6">
      {error && <ErrorBanner message={error} />}

      {/* Inputs */}
      <div className="flex gap-2 items-center">
        <input
          className="border px-2 py-1 rounded"
          value={shipId}
          onChange={(e) => setShipId(e.target.value)}
        />

        <input
          className="border px-2 py-1 rounded w-24"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />

        <button className="px-3 py-2 rounded bg-gray-200" onClick={refresh}>
          Refresh
        </button>
      </div>

      {/* CB */}
      <div className="p-3 bg-white border rounded">
        <p className="font-semibold">Current CB: {cb.toFixed(2)}</p>
      </div>

      {/* Banking Controls */}
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
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          className="px-3 py-2 bg-green-600 text-white rounded disabled:bg-gray-300"
          disabled={Number(amount) <= 0}
          onClick={apply}
        >
          Apply
        </button>
      </div>

      {/* KPI Output */}
      {kpi && (
        <div className="p-3 bg-gray-50 border rounded">
          <p>Before: {kpi.cb_before}</p>
          <p>Applied: {kpi.applied}</p>
          <p>After: {kpi.cb_after}</p>
        </div>
      )}

      {/* Records Table */}
      <DataTable<BankRecord>
        rows={records}
        columns={[
          { label: 'Amount', render: (r) => r.amount },
          { label: 'Year', render: (r) => r.year },
        ]}
      />
    </div>
  )
}
