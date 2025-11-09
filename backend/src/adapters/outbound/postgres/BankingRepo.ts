import { BankingPort } from "@ports/BankingPort";
import { pg } from "./Pg";

export class BankingRepo implements BankingPort {
  async getBankRecords(shipId: string, year: number) {
    const { rows } = await pg.query(
      "SELECT amount_gco2eq AS amount, year FROM bank_entries WHERE ship_id=$1 AND year=$2 ORDER BY id",
      [shipId, year]
    );
    return rows.map((r: any) => ({
      amount: Number(r.amount),
      year: r.year
    }));
  }

  async availableBanked(shipId: string, year: number): Promise<number> {
    const { rows } = await pg.query(
      "SELECT COALESCE(SUM(amount_gco2eq),0) s FROM bank_entries WHERE ship_id=$1 AND year=$2",
      [shipId, year]
    );
    return Number(rows[0].s || 0);
  }

  async bankPositiveCB(shipId: string, year: number) {
    const { rows } = await pg.query(
      "SELECT cb_gco2eq FROM ship_compliance WHERE ship_id=$1 AND year=$2 ORDER BY id DESC LIMIT 1",
      [shipId, year]
    );

    const cb = Number(rows[0]?.cb_gco2eq || 0);
    if (cb <= 0) throw new Error("CB is not positive, cannot bank.");

    await pg.query(
      "INSERT INTO bank_entries (ship_id, year, amount_gco2eq) VALUES ($1,$2,$3)",
      [shipId, year, cb]
    );

    return { cb_before: cb, applied: cb, cb_after: 0 };
  }

  async applyBanked(shipId: string, year: number, amount: number) {
    if (amount <= 0) throw new Error("Amount must be > 0");

    const avail = await this.availableBanked(shipId, year);
    if (amount > avail) throw new Error("Amount exceeds available banked");

    const { rows } = await pg.query(
      "SELECT cb_gco2eq FROM ship_compliance WHERE ship_id=$1 AND year=$2 ORDER BY id DESC LIMIT 1",
      [shipId, year]
    );

    const cb = Number(rows[0]?.cb_gco2eq || 0);

    const applied = amount;
    await pg.query(
      "INSERT INTO bank_entries (ship_id, year, amount_gco2eq) VALUES ($1,$2,$3)",
      [shipId, year, -applied]
    );

    return { cb_before: cb, applied, cb_after: cb + applied };
  }
}
