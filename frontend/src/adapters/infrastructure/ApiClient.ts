import type { RoutesPort, BankingPort, PoolingPort } from '@core/ports/ApiPorts'
import type { Route } from '@core/domain/Route'
import type { PoolInput } from '@core/domain/Pooling'


const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'


async function json<T>(resp: Response): Promise<T> {
  if (!resp.ok) throw new Error(await resp.text())
  return resp.json() as Promise<T>
}


export const RoutesAPI: RoutesPort = {
  async getRoutes() {
    return json<Route[]>(await fetch(`${BASE}/routes`))
  },
  async setBaseline(id: number) {
    await json(await fetch(`${BASE}/routes/${id}/baseline`, { method: 'POST' }))
  },
  async getComparison() {
    return json(await fetch(`${BASE}/routes/comparison`))
  }
}


export const BankingAPI: BankingPort = {
  async getCB(shipId: string, year: number) {
    return json(await fetch(`${BASE}/compliance/cb?shipId=${shipId}&year=${year}`))
  },
  async bank() {
    return json(await fetch(`${BASE}/banking/bank`, { method: 'POST' }))
  },
  async apply(amount: number) {
    return json(await fetch(`${BASE}/banking/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    }))
  },
  async getBankRecords(shipId: string, year: number) {
    return json(await fetch(`${BASE}/banking/records?shipId=${shipId}&year=${year}`))
    }
}


export const PoolingAPI: PoolingPort = {
  async getAdjustedCB(shipId: string, year: number) {
    return json(await fetch(`${BASE}/compliance/adjusted-cb?shipId=${shipId}&year=${year}`))
  },
  async createPool(input: PoolInput) {
    return json(await fetch(`${BASE}/pools`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    }))
  }
}
