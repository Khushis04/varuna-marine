import { Route } from "@domain/Route";


export interface RoutesPort {
  list(): Promise<Route[]>
  setBaseline(id: number): Promise<void>
  getBaseline(): Promise<Route | null>
}
