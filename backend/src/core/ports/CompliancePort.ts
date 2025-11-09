import { CBRecord } from '@domain/Compliance'


export interface CompliancePort {
  computeAndStoreCB(shipId: string, year: number): Promise<CBRecord>
  getCB(shipId: string, year: number): Promise<CBRecord | null>
  getAdjustedCB(shipId: string, year: number): Promise<number>
}
