export type MemberStatus = '좋음' | '위험' | '무임승차'

export interface Team {
  team_id: number
  team: string
  num: string
  recent: string
  status: MemberStatus
  desc: string
}

export interface Student {
  student_id: number
  name: string
  team: string
  recent: string
  status: MemberStatus
  contact: string
  email: string
  desc: string
}
