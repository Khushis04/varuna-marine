import { PoolMember } from "@domain/Pooling";

export interface PoolingPort {
  createPool(year: number, members: PoolMember[]): Promise<{ members: { shipId: string; cb_after: number }[]; sum: number }>
}
