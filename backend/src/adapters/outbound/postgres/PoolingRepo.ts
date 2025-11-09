import { PoolingPort } from "@ports/PoolingPort";
import { PoolMember } from "@domain/Pooling";
import { pg } from "./Pg";

export class PoolingRepo implements PoolingPort {
  async createPool(year: number, members: PoolMember[]) {
    const sum = members.reduce((a, m) => a + m.cb_before, 0);
    if (sum < 0) throw new Error("Pool sum must be ≥ 0");

    const sorted = [...members].sort((a, b) => b.cb_before - a.cb_before);
    const after: Record<string, number> = Object.fromEntries(
      sorted.map(m => [m.shipId, m.cb_before])
    );

    const deficits = sorted.filter(m => m.cb_before < 0);
    const surpluses = sorted.filter(m => m.cb_before > 0);

    for (const d of deficits) {
      let need = -after[d.shipId];

      for (const s of surpluses) {
        if (need <= 0) break;

        const give = Math.min(after[s.shipId], need);

        after[s.shipId] -= give;
        after[d.shipId] += give;

        need -= give;
      }
    }

    for (const m of members) {
      if (m.cb_before < 0 && after[m.shipId] < m.cb_before)
        throw new Error("Deficit ship cannot exit worse");
      if (m.cb_before > 0 && after[m.shipId] < 0)
        throw new Error("Surplus ship cannot exit negative");
    }

    const client = await pg.connect();
    try {
      await client.query("BEGIN");

      const poolRes = await client.query(
        "INSERT INTO pools (year) VALUES ($1) RETURNING id",
        [year]
      );

      const poolId = poolRes.rows[0].id;

      for (const m of members) {
        await client.query(
          "INSERT INTO pool_members (pool_id, ship_id, cb_before, cb_after) VALUES ($1,$2,$3,$4)",
          [poolId, m.shipId, m.cb_before, after[m.shipId]]
        );
      }

      await client.query("COMMIT");
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }

    return {
      members: members.map(m => ({
        shipId: m.shipId,
        cb_after: after[m.shipId]
      })),
      sum
    };
  }
}
