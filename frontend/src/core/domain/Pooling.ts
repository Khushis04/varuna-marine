export interface PoolMember {
  shipId: string
  cb_before: number
  cb_after?: number
}


export interface PoolInput {
  year: number
  members: PoolMember[]
}
