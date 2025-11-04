// src/entities/project/dashboard/index.ts
export { dashboardApi } from "./api/dashboardApi"

export { getWarningTeams, getProgressAssignments, calculateDashboardStats } from "./lib/processDashboard"

export { useDashboard } from "./model/useDashboard"
export { useDashboardStats } from "./model/useDashboardStats"

export { Box } from "./ui/Box"
export { MyTeamStatus } from "./ui/MyTeamStatus"
export { NextSubmit } from "./ui/NextSubmit"
export { NotificationCenter } from "./ui/NotificationCenter"
export { ProjectInfoBox } from "./ui/ProjectInfoBox"
export { StatBox } from "./ui/StatBox"
export { TeamSummary } from "./ui/TeamSummary"
export { ToDoSummary } from "./ui/ToDoSummary"