import { BankingPort } from "@ports/BankingPort";

export class ApplyBanked {
  constructor(private banking: BankingPort) {}
  async exec(shipId: string, year: number, amount: number) {
    return this.banking.applyBanked(shipId, year, amount);
  }
}
