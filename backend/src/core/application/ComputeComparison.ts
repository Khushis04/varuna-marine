import { RoutesPort } from '@ports/RoutesPort'
import { TARGET_2025 } from '@domain/Compliance'


export class ComputeComparison {
  constructor(private routes: RoutesPort) {}
  
  async exec() {
    const all = await this.routes.list()
    const baseline = all.find(r => r.isBaseline)
    if (!baseline) throw new Error('No baseline set')
    const comparisons = all.filter(r => r.id !== baseline.id).map(route => {
      const percentDiff = ((route.ghgIntensity / baseline.ghgIntensity) - 1) * 100
      const compliant = route.ghgIntensity <= TARGET_2025
      return { route, percentDiff, compliant }
    })
    return { baseline, comparisons }
  }
}
