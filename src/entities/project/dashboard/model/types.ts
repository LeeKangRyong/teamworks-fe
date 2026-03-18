import type { Team, ChartItem, Assignment } from '@/shared/types'

export interface DashboardData {
  teams: Team[]
  assignments: Assignment[]
  chartData: ChartItem[]
}
