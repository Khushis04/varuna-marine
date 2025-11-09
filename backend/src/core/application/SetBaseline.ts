import { RoutesPort } from '@ports/RoutesPort'


export class SetBaseline {
  constructor(private routes: RoutesPort) {}
  async exec(id: number) {
    await this.routes.setBaseline(id)
  }
}
