import { TARGET_2025, MJ_PER_TONNE, CBRecord } from '@domain/Compliance'
import { RoutesPort } from '@ports/RoutesPort'
import { CompliancePort } from '@ports/CompliancePort'


export class ComputeCB {
  constructor(private routes: RoutesPort, private complianceRepo: CompliancePort) {}

  async exec(shipId: string, year: number): Promise<CBRecord> {
    const routes = (await this.routes.list()).filter(r => r.year === year && r.routeId.startsWith(shipId))
    if (routes.length === 0) {
      const rec: CBRecord = { shipId, year, cb_gco2eq: 0 }
      return rec
    }
    const energyMJ = routes.reduce((sum, r) => sum + r.fuelConsumption * MJ_PER_TONNE, 0)
    const weightedIntensity = routes.reduce((sum, r) => sum + r.ghgIntensity * (r.fuelConsumption * MJ_PER_TONNE), 0) / energyMJ
    const cb = (TARGET_2025 - weightedIntensity) * energyMJ
    
    return await this.complianceRepo.computeAndStoreCB(shipId, year)
      .then(() => ({ shipId, year, cb_gco2eq: cb }))
  }
}
