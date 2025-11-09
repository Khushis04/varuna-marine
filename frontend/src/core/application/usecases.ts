import { TARGET_2025 } from '../domain/Compliance'


export const percentDiff = (comparison: number, baseline: number) =>
  ((comparison / baseline) - 1) * 100


export const isCompliant = (ghg: number) => ghg <= TARGET_2025
