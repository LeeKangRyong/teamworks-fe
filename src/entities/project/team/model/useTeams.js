import { teamApi } from "../api/teamApi";

/**
 * 팀/학생 데이터를 가져오는 Hook
 */
export const useTeams = () => {
    // 현재는 동기적으로 데이터 반환
    // 실제 환경에서는 useState + useEffect 또는 React Query 사용
    const teams = teamApi.getTeams();
    const students = teamApi.getStudents();

    return {
        teams,
        students
    };
};

// 나중에 실제 API로 전환 시
// export const useTeams = () => {
//     const [teams, setTeams] = useState([]);
//     const [students, setStudents] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true);
//             const [teamsData, studentsData] = await Promise.all([
//                 teamApi.getTeams(),
//                 teamApi.getStudents()
//             ]);
//             setTeams(teamsData);
//             setStudents(studentsData);
//             setIsLoading(false);
//         };
//         fetchData();
//     }, []);
//
//     return { teams, students, isLoading };
// };