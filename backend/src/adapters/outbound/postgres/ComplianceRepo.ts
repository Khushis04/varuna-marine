import { CompliancePort } from "@ports/CompliancePort";
import { CBRecord } from "@domain/Compliance";
import { pg } from "./Pg";

export class ComplianceRepo implements CompliancePort {
  async computeAndStoreCB(shipId: string, year: number): Promise<CBRecord> {
    const existing = await this.getCB(shipId, year);
    if (existing) return existing;

    const rec: CBRecord = { shipId, year, cb_gco2eq: 0 };
    const { rows } = await pg.query(
      "INSERT INTO ship_compliance (ship_id, year, cb_gco2eq) VALUES ($1,$2,$3) RETURNING id",
      [shipId, year, 0]
    );

    rec.id = rows[0].id;
    return rec;
  }

  async getCB(shipId: string, year: number): Promise<CBRecord | null> {
    const { rows } = await pg.query(
      "SELECT * FROM ship_compliance WHERE ship_id=$1 AND year=$2 ORDER BY id DESC LIMIT 1",
      [shipId, year]
    );
    if (!rows[0]) return null;

    return {
      id: rows[0].id,
      shipId: rows[0].ship_id,
      year: rows[0].year,
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
