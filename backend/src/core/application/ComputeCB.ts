import { TARGET_2025, MJ_PER_TONNE, CBRecord } from "@domain/Compliance";
import { CompliancePort } from "@ports/CompliancePort";

export class ComputeCB {
  constructor(private complianceRepo: CompliancePort) {}

  async exec(shipId: string, year: number): Promise<CBRecord> {
    console.log("ComputeCB.exec called with:", { shipId, year });

    const routes = await this.complianceRepo.getShipRoutes(shipId, year);
    console.log("Routes fetched for CB:", routes);

    if (routes.length === 0) {
      console.log("No routes found → CB = 0");
      const rec: CBRecord = { shipId, year, cb_gco2eq: 0 };
      await this.complianceRepo.saveCB(rec);
      return rec;
    }

    let totalEnergy = 0;
    let intensityTimesEnergy = 0;

    for (const r of routes) {
      console.log("Route row:", r);

      const fuel = Number(r.fuel_consumption);
      const ghg = Number(r.ghg_intensity);

      console.log("   Parsed fuel:", fuel, "Parsed GHG:", ghg);

      const energyMJ = fuel * MJ_PER_TONNE;
      totalEnergy += energyMJ;
      intensityTimesEnergy += ghg * energyMJ;
    }

    console.log("energyTotals:", { totalEnergy, intensityTimesEnergy });

    const avgIntensity = intensityTimesEnergy / totalEnergy;
    const cb = (TARGET_2025 - avgIntensity) * totalEnergy;

    console.log("FINAL CB:", cb);

    const rec: CBRecord = { shipId, year, cb_gco2eq: cb };
    console.log("Saving CB record:", rec);

    await this.complianceRepo.saveCB(rec);

    return rec;
  }
}



