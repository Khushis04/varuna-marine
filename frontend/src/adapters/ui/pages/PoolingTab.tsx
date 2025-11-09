import React from 'react'
import { PoolingAPI } from '@infra/ApiClient'
import { ErrorBanner } from '../components/ErrorBanner'
import { DataTable } from '../components/DataTable'

export default function PoolingTab() {
  const [year, setYear] = React.useState(new Date().getFullYear())
  const [members, setMembers] = React.useState<any[]>([])
  const [result, setResult] = React.useState<any>(null)
  const [error, setError] = React.useState('')

  function addMember() {
    setMembers(m => [...m, { shipId: '', cb_before: 0 }])
  }

  async function createPool() {
    try {
      const res = await PoolingAPI.createPool({ year, members })
      setResult(res)
    } catch (e: any) {
      setError(e.message)
    }
  }

  const sum = members.reduce((a, m) => a + Number(m.cb_before || 0), 0)
  const valid = sum >= 0

  return (
    <div className="space-y-6">
      {error && <ErrorBanner message={error} />}

      <div className="flex gap-2 items-center">
        <input
          className="border px-2 py-1 rounded w-24"
          value={year}
          onChange={e => setYear(Number(e.target.value))}
        />

        <button className="px-3 py-2 bg-gray-200 rounded" onClick={addMember}>
          Add Member
        </button>
      </div>

      <DataTable
        rows={members}
        columns={[
          {
            key: 'shipId',
            label: 'Ship ID',
            render: (v, row, i) => (
              <input
                className="border px-1 rounded"
                value={v}
                onChange={e => {
                  const val = e.target.value
                  setMembers(ms =>
                    ms.map((m, idx) =>
                      idx === i ? { ...m, shipId: val } : m
                    )
                  )
                }}
              />
            )
          },
          {
            key: 'cb_before',
            label: 'CB Before',
            render: (v, row, i) => (
              <input
                className="border px-1 rounded w-24"
                value={v}
                onChange={e => {
                  const val = e.target.value
                  setMembers(ms =>
                    ms.map((m, idx) =>
                      idx === i ? { ...m, cb_before: Number(val) } : m
                    )
                  )
                }}
              />
            )
          }
        ]}
      />

      <div
        className={`p-3 rounded border ${
          valid ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
        }`}
      >
        Pool Sum: {sum}
      </div>

      <button
        disabled={!valid}
        className="px-3 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        onClick={createPool}
      >
        Create Pool
      </button>

      {result && (
        <div className="p-3 bg-gray-50 border rounded">
          <h3 className="font-semibold mb-2">Pool Result</h3>

          <DataTable
            rows={result.members}
            columns={[
              { key: 'shipId', label: 'Ship' },
              { key: 'cb_after', label: 'CB After' }
            ]}
          />
        </div>
      )}
    </div>
  )
}
