export interface CreateTeamDto {
  name: string
  description?: string
  memberIds: number[]
}

export interface CreateTeamsBulkDto {
  teamCount: number
  membersPerTeam: number
  memberIds: number[]
}
