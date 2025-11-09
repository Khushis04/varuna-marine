export type VesselType = "container" | "tanker" | "bulk" | "ro-ro" | "passenger"
export type FuelType = "HFO" | "MDO" | "LNG" | "Methanol" | "Ammonia"


export interface Route {
  id: number
  route_id: string
  vesselType: VesselType
  fuelType: FuelType
  year: number
  ghg_intensity: number 
  fuel_consumption: number 
  distance_km: number 
  total_emissions: number 
  isBaseline?: boolean
}
