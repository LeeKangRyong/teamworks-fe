import type { Team, ChartItem } from '@/shared/types'
import type { Assignment } from '@/entities/project/assignment'

export interface DashboardData {
  teams: Team[]
  assignments: Assignment[]
  chartData: ChartItem[]
}
