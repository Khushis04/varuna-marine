export interface PoolMember {
  shipId: string
  cb_before: number
  cb_after?: number
}

export interface PoolInput {
  year: number
  members: PoolMember[]
}

export interface PoolResult {
  members: { shipId: string; cb_after: number }[]
  sum: number
}
