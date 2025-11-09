import { Router } from "express";
import { PoolingPort } from "@ports/PoolingPort";

export function poolsController(pooling: PoolingPort) {
  const r = Router();

  // POST /pools
  r.post("/", async (req, res, next) => {
    try {
      const { year, members } = req.body;
      const result = await pooling.createPool(Number(year), members || []);
      res.json(result);
    } catch (e) {
      next(e);
    }
  });

  return r;
}
