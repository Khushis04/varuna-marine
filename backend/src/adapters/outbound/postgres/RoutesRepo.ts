import { RoutesPort } from '@ports/RoutesPort'
import { Route } from '@domain/Route'
import { pg } from './Pg'


export class RoutesRepo implements RoutesPort {
  async list(): Promise<Route[]> {
    const { rows } = await pg.query('SELECT * FROM routes ORDER BY id')
    return rows.map(r => ({
      id: r.id,
      routeId: r.route_id,
      vesselType: r.vessel_type,
      fuelType: r.fuel_type,
      year: r.year,
      ghgIntensity: Number(r.ghg_intensity),
      fuelConsumption: Number(r.fuel_consumption),
      distance: Number(r.distance_km),
      totalEmissions: Number(r.total_emissions),
      isBaseline: r.is_baseline
    }))
  }


  async setBaseline(id: number): Promise<void> {
    await pg.query('UPDATE routes SET is_baseline = FALSE')
    await pg.query('UPDATE routes SET is_baseline = TRUE WHERE id = $1', [id])
  }


  async getBaseline() {
    const { rows } = await pg.query('SELECT * FROM routes WHERE is_baseline = TRUE LIMIT 1')
    if (!rows[0]) return null
    const r = rows[0]
    return {
      id: r.id,
      routeId: r.route_id,
      vesselType: r.vessel_type,
      fuelType: r.fuel_type,
      year: r.year,
      ghgIntensity: Number(r.ghg_intensity),
      fuelConsumption: Number(r.fuel_consumption),
      distance: Number(r.distance_km),
      totalEmissions: Number(r.total_emissions),
      isBaseline: r.is_baseline
    }
  }
}
