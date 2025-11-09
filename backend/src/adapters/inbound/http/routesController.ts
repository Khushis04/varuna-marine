import { Router } from "express";
import { RoutesPort } from "@ports/RoutesPort";
import { ComputeComparison } from "@app/ComputeComparison";

export function routesController(routesRepo: RoutesPort) {
  const r = Router();

  // GET /routes
  r.get("/", async (_req, res, next) => {
    try {
      res.json(await routesRepo.list());
    } catch (e) {
      next(e);
    }
  });

  // POST /routes/:id/baseline
  r.post("/:id/baseline", async (req, res, next) => {
    try {
      await routesRepo.setBaseline(Number(req.params.id));
      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  });

  // GET /routes/comparison
  r.get("/comparison", async (_req, res, next) => {
    try {
      const uc = new ComputeComparison(routesRepo);
      res.json(await uc.exec());
    } catch (e) {
      next(e);
    }
  });

  return r;
}
