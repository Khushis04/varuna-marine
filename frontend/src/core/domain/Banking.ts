export interface BankRecord {
  amount: number
  year: number
}

export interface KPI {
  cb_before: number
  applied: number
  cb_after: number
}

export interface BankResponse {
  ok: boolean
  kpi: KPI
}
