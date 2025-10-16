import { assignmentsData, submitsData, chartData } from "@/shared/mock";

export const assignmentApi = {
    getAssignments: () => {
        return assignmentsData;
    },
    
    getAssignmentById: (assignmentId) => {
        return assignmentsData.find(
            assignment => assignment.assignment_id === parseInt(assignmentId)
        );
    },
    
    getSubmits: () => {
        return submitsData;
    },
    
    getSubmitById: (submitId) => {
        return submitsData.find(
            submit => submit.submit_id === parseInt(submitId)
        );
    },
    
    getSubmitsByAssignment: (assignmentId) => {
        return submitsData.filter(
            submit => submit.assignment_id === parseInt(assignmentId)
        );
    },
    
    getChartData: () => {
        return chartData;
    },
    
    updateSubmitMemo: async (submitId, memo) => {
        // 나중에 실제 API로 전환
        console.log('Updating memo:', { submitId, memo });
        return { success: true };
    }
    
    // 나중에 실제 API로 전환
    // getAssignments: async () => {
    //     const response = await apiClient.get('/api/assignments');
    //     return response.data;
    // }
};