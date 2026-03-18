export type AssignmentStatus = '진행중' | '채점완료' | '마감'

export interface Assignment {
  assignment_id: number
  title: string
  deadline: string
  submit: string
  mark: string
  status: AssignmentStatus
}

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
}

export interface CreateAssignmentDto {
  title: string
  deadline: string
  description?: string
}

export interface CreateSubmitDto {
  file: File
}
