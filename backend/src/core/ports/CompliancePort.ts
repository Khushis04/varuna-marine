import { Route } from "@domain/Route";
import { CBRecord } from "@domain/Compliance";

export interface CompliancePort {
  getShipRoutes(shipId: string, year: number): Promise<Route[]>;
  saveCB(record: CBRecord): Promise<void>;
  getCB(shipId: string, year: number): Promise<CBRecord | null>;
  getAdjustedCB(shipId: string, year: number): Promise<number>;
}
