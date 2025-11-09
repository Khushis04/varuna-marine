export interface BankingPort {
  bankPositiveCB(shipId: string, year: number): Promise<{ cb_before: number; applied: number; cb_after: number }>
  applyBanked(shipId: string, year: number, amount: number): Promise<{ cb_before: number; applied: number; cb_after: number }>
  getBankRecords(shipId: string, year: number): Promise<{ amount: number; year: number }[]>
  availableBanked(shipId: string, year: number): Promise<number>
}
