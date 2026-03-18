export type AssignmentStatus = '진행중' | '채점완료' | '마감'

export interface Assignment {
  assignment_id: number
  title: string
  deadline: string
  submit: string
  mark: string
  status: AssignmentStatus
}
