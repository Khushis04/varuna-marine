import { Router } from "express";
import { RoutesPort } from "@ports/RoutesPort";
import { CompliancePort } from "@ports/CompliancePort";
import { ComputeCB } from "@app/ComputeCB";

export function complianceController(
  routesRepo: RoutesPort,
  complianceRepo: CompliancePort
) {
  const r = Router();

  // GET /compliance/cb
  r.get("/cb", async (req, res, next) => {
    try {
      const shipId = String(req.query.shipId || "SHIP-001");
      const year = Number(req.query.year || new Date().getFullYear());

      const uc = new ComputeCB(routesRepo, complianceRepo);
      const record = await uc.exec(shipId, year);

      res.json({ cb: record.cb_gco2eq });
    } catch (e) {
      next(e);
    }
  });

  // GET /compliance/adjusted-cb
  r.get("/adjusted-cb", async (req, res, next) => {
    try {
      const shipId = String(req.query.shipId || "SHIP-001");
      const year = Number(req.query.year || new Date().getFullYear());

      const cb = await complianceRepo.getAdjustedCB(shipId, year);
      res.json({ cb });
    } catch (e) {
      next(e);
    }
  });

  return r;
}
