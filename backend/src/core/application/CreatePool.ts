import { PoolMember } from '@domain/Pooling'
import { PoolingPort } from '@ports/PoolingPort'

export class CreatePool {
  constructor(private pooling: PoolingPort) {}
  async exec(year: number, members: PoolMember[]) {
    return this.pooling.createPool(year, members)
  }
}
