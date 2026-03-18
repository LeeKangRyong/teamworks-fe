export type ProjectStatus = 'ACTIVE' | 'INACTIVE' | 'COMPLETED'
export type ProjectType = 'TEAM_PROJECT' | 'INDIVIDUAL'

export interface Project {
  project_id: number
  name: string
  description: string
  type: ProjectType
  status: ProjectStatus
  startDate: string
  endDate: string
  inviteCode: string
  maxTeamSize: number
  maxParticipants: number
  participantCount: number
  teamCount: number
  daysRemaining: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateProjectDto {
  name: string
  description: string
  type: ProjectType
  startDate: string
  endDate: string
  maxTeamSize: number
  maxParticipants: number
}
