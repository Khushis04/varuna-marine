import { Router } from "express";

import { routesController } from "./routesController";
import { complianceController } from "./complianceController";
import { bankingController } from "./bankingController";
import { poolsController } from "./poolsController";

import { RoutesRepo } from "@adapters/outbound/postgres/RoutesRepo";
import { ComplianceRepo } from "@adapters/outbound/postgres/ComplianceRepo";
import { BankingRepo } from "@adapters/outbound/postgres/BankingRepo";
import { PoolingRepo } from "@adapters/outbound/postgres/PoolingRepo";

export function buildRouter() {
  const api = Router();

  // Construct repositories
  const routesRepo = new RoutesRepo();
  const compRepo = new ComplianceRepo();
  const bankRepo = new BankingRepo();
  const poolRepo = new PoolingRepo();

  api.use("/routes", routesController(routesRepo));
  api.use("/compliance", complianceController(routesRepo, compRepo));
  api.use("/banking", bankingController(bankRepo));
  api.use("/pools", poolsController(poolRepo));

  return api;
}
