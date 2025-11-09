import { CompliancePort } from "@ports/CompliancePort";
import { CBRecord } from "@domain/Compliance";
import { pg } from "./Pg";

export class ComplianceRepo implements CompliancePort {

  async getShipRoutes(shipId: string, year: number) {
    console.log("getShipRoutes called with:", { shipId, year });

    const { rows } = await pg.query(
      `SELECT r.*
      FROM ship_routes sr
      JOIN routes r ON r.route_id = sr.route_id
      WHERE sr.ship_id=$1 AND sr.year=$2`,
      [shipId, year]
    );

    console.log("getShipRoutes result:", rows);

    return rows;
  }

  async saveCB(rec: CBRecord) {
    await pg.query(
      `INSERT INTO ship_compliance(ship_id, year, cb_gco2eq)
       VALUES($1, $2, $3)
       ON CONFLICT (ship_id, year)
       DO UPDATE SET cb_gco2eq = EXCLUDED.cb_gco2eq`,
      [rec.shipId, rec.year, rec.cb_gco2eq]
    );
  }

  async getCB(shipId: string, year: number): Promise<CBRecord | null> {
    const { rows } = await pg.query(
      "SELECT * FROM ship_compliance WHERE ship_id=$1 AND year=$2 LIMIT 1",
      [shipId, year]
    );
    if (!rows[0]) return null;
    return {
      shipId,
      year,
      cb_gco2eq: Number(rows[0].cb_gco2eq)
    };
  }

  async getAdjustedCB(shipId: string, year: number): Promise<number> {
    const base = await this.getCB(shipId, year);
    const cb = base?.cb_gco2eq ?? 0;

    const { rows } = await pg.query(
      "SELECT COALESCE(SUM(amount_gco2eq),0) s FROM bank_entries WHERE ship_id=$1 AND year=$2",
      [shipId, year]
    );

    return cb + Number(rows[0].s || 0);
  }
}

