export type { Assignment, AssignmentStatus } from '@/shared/types'

export interface Submit {
  submit_id: number
  assignment_id: number
  student_id: number
  file_name: string
  name: string
  team: string
  submit_time: string
  score: number | null
  file_url: string
  memo?: string
  status?: string
}

export interface CreateAssignmentDto {
  title: string
  deadline: string
  description?: string
}

export interface CreateSubmitDto {
  file: File
}
