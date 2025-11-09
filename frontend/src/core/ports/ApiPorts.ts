import { Route } from '../domain/Route'
import { BankKPI } from '../domain/Compliance'
import { PoolInput } from '../domain/Pooling'


export interface RoutesPort {
  getRoutes(): Promise<Route[]>
  setBaseline(id: number): Promise<void>
  getComparison(): Promise<{
    baseline: Route
    comparisons: Array<{ route: Route; percentDiff: number; compliant: boolean }>
  }>
}


export interface BankingPort {
  getCB(shipId: string, year: number): Promise<{ cb: number }>
  bank(): Promise<{ ok: boolean; kpi: BankKPI }>
  apply(amount: number): Promise<{ ok: boolean; kpi: BankKPI }>
  getBankRecords(shipId: string, year: number): Promise<Array<{ amount: number; year: number }>>
}


export interface PoolingPort {
  getAdjustedCB(shipId: string, year: number): Promise<{ cb: number }>
  createPool(input: PoolInput): Promise<{
    members: { shipId: string; cb_after: number }[]
    sum: number
  }>
}
