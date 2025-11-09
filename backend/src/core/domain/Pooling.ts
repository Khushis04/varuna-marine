export interface PoolMember { shipId: string; cb_before: number; cb_after?: number }
export interface Pool { id?: number; year: number; members: PoolMember[] }
