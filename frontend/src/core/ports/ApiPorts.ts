import { Route } from '../domain/Route'
import { PoolInput, PoolResult } from '../domain/Pooling'
import { BankRecord, BankResponse } from '../domain/Banking'

export interface RoutesPort {
  getRoutes(): Promise<Route[]>
  setBaseline(id: number): Promise<void>
  getComparison(): Promise<{
    baseline: Route
    comparisons: Array<{
      route: Route
      percentDiff: number
      compliant: boolean
    }>
  }>
}

export interface BankingPort {
  getCB(shipId: string, year: number): Promise<{ cb: number }>
  bank(shipId: string, year: number): Promise<BankResponse>
  apply(shipId: string, year: number, amount: number): Promise<BankResponse>
  getBankRecords(shipId: string, year: number): Promise<BankRecord[]>
}

export interface PoolingPort {
  getAdjustedCB(shipId: string, year: number): Promise<{ cb: number }>
  createPool(input: PoolInput): Promise<PoolResult>
}
