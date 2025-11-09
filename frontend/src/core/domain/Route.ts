export type VesselType = 'container' | 'tanker' | 'bulk' | 'ro-ro' | 'passenger'
export type FuelType = 'HFO' | 'MDO' | 'LNG' | 'Methanol' | 'Ammonia'

export interface Route {
  id: number
  routeId: string
  vesselType: VesselType
  fuelType: FuelType
  year: number
  ghgIntensity: number
  fuelConsumption: number
  distance: number
  totalEmissions: number
  isBaseline?: boolean
}
