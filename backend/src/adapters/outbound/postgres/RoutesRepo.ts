import { RoutesPort } from "@ports/RoutesPort";
import { Route } from "@domain/Route";
import { pg } from "./Pg";


export class RoutesRepo implements RoutesPort {
  async list(): Promise<Route[]> {
    const { rows } = await pg.query("SELECT * FROM routes ORDER BY id");
    interface RouteRow {
      id: number;
      route_id: string;
      vessel_type: string;
      fuel_type: string;
      year: number;
      ghg_intensity: string;     
      fuel_consumption: string;   
      distance_km: string;        
      total_emissions: string;    
      is_baseline: boolean;
    }
    return rows.map((r: RouteRow) => ({
      id: r.id,
      route_id: r.route_id,
      vesselType: r.vessel_type,
      fuelType: r.fuel_type,
      year: r.year,
      ghg_intensity: Number(r.ghg_intensity),
      fuel_consumption: Number(r.fuel_consumption),
      distance_km: Number(r.distance_km),
      total_emissions: Number(r.total_emissions),
      isBaseline: r.is_baseline
    }));
  }


  async setBaseline(id: number): Promise<void> {
    await pg.query("UPDATE routes SET is_baseline = FALSE");
    await pg.query("UPDATE routes SET is_baseline = TRUE WHERE id = $1", [id]);
  }


  async getBaseline() {
    const { rows } = await pg.query("SELECT * FROM routes WHERE is_baseline = TRUE LIMIT 1");
    if (!rows[0]) return null;
    const r = rows[0];
    return {
      id: r.id,
      route_id: r.route_id,
      vesselType: r.vessel_type,
      fuelType: r.fuel_type,
      year: r.year,
      ghg_intensity: Number(r.ghg_intensity),
      fuel_consumption: Number(r.fuel_consumption),
      distance_km: Number(r.distance_km),
      total_emissions: Number(r.total_emissions),
      isBaseline: r.is_baseline
    };
  }
}
