import { Router } from "express";
import { CompliancePort } from "@ports/CompliancePort";
import { ComputeCB } from "@app/ComputeCB";

export function complianceController(
  complianceRepo: CompliancePort
) {
  const r = Router();

  r.get("/cb", async (req, res, next) => {
    try {
      const shipId = String(req.query.shipId || "SHIP-001");
      const year = Number(req.query.year || new Date().getFullYear());

      console.log("/compliance/cb request:", { shipId, year });

      const uc = new ComputeCB(complianceRepo);
      const record = await uc.exec(shipId, year);

      console.log("/compliance/cb response:", record);
      res.json({ cb: record.cb_gco2eq });
    } catch (e) {
      console.error("ERROR in /cb:", e);
      next(e);
    }
  });

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

  r.get("/ship-routes", async (req, res, next) => {
    try {
      const shipId = String(req.query.shipId);
      const year = Number(req.query.year);

      const routes = await complianceRepo.getShipRoutes(shipId, year);
      res.json(routes);
    } catch (e) {
      next(e);
    }
  });

  return r;
}

