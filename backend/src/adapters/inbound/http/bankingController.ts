import { Router } from "express";
import { BankingPort } from "@ports/BankingPort";

export function bankingController(banking: BankingPort) {
  const r = Router();

  // GET /banking/records
  r.get("/records", async (req, res, next) => {
    try {
      const shipId = String(req.query.shipId || "SHIP-001");
      const year = Number(req.query.year || new Date().getFullYear());
      res.json(await banking.getBankRecords(shipId, year));
    } catch (e) {
      next(e);
    }
  });

  // POST /banking/bank
  r.post("/bank", async (req, res, next) => {
    try {
      const shipId = String(req.query.shipId || "SHIP-001");
      const year = Number(req.query.year || new Date().getFullYear());

      const kpi = await banking.bankPositiveCB(shipId, year);
      res.json({ ok: true, kpi });
    } catch (e) {
      next(e);
    }
  });

  // POST /banking/apply
  r.post("/apply", async (req, res, next) => {
    try {
      const shipId = String(req.query.shipId || "SHIP-001");
      const year = Number(req.query.year || new Date().getFullYear());
      const amount = Number(req.body?.amount || 0);

      const kpi = await banking.applyBanked(shipId, year, amount);
      res.json({ ok: true, kpi });
    } catch (e) {
      next(e);
    }
  });

  return r;
}
