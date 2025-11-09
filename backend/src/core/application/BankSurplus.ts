import { BankingPort } from '@ports/BankingPort'

export class BankSurplus {
  constructor(private banking: BankingPort) {}
  async exec(shipId: string, year: number) {
    return this.banking.bankPositiveCB(shipId, year)
  }
}
