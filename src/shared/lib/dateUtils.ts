/**
 * ============================================
 * 날짜 관련 유틸리티 함수
 * ============================================
 */

import type { Team, Student } from '@/shared/types';

export type SortOrder = '오름차순' | '내림차순';
export type ListType = '팀 리스트' | '학생 리스트';

export interface ProcessTeamDataParams {
    rawData: (Team | Student)[];
    listType: ListType;
    selectedStatus: string;
    sortType: string;
    sortOrder?: string;
    searchName?: string;
}

/**
 * 날짜 문자열을 Date 객체로 변환
 * @param dateString - "25/08/14" 형식의 날짜 문자열
 */
export const parseDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split('/');
    return new Date(Number(`20${year}`), Number(month) - 1, Number(day));
};

/**
 * 상태 값을 실제 데이터의 상태 값으로 매핑
 */
export const mapStatusValue = (statusValue: string): string => {
    const statusMap: Record<string, string> = {
        "all": "전체",
        "good": "좋음",
        "warning": "위험",
        "freeload": "무임승차"
    };
    return statusMap[statusValue] || statusValue;
};

/**
 * 상태에 따른 데이터 필터링
 */
export const filterByStatus = <T extends { status: string }>(data: T[], selectedStatus: string): T[] => {
    const mappedStatus = mapStatusValue(selectedStatus);
    if (!mappedStatus || mappedStatus === "전체") {
        return data;
    }
    return data.filter(item => item.status === mappedStatus);
};

/**
 * 정렬 값을 실제 정렬 타입으로 매핑
 */
export const mapSortValue = (sortValue: string, listType: ListType): string => {
    if (listType === "팀 리스트") {
        const teamSortMap: Record<string, string> = {
            "name": "팀명 순",
            "activity": "최근 활동일 순"
        };
        return teamSortMap[sortValue] || sortValue;
    } else {
        const studentSortMap: Record<string, string> = {
            "name": "이름 순",
            "activity": "최근 활동일 순"
        };
        return studentSortMap[sortValue] || sortValue;
    }
};

/**
 * 정렬 순서 값을 실제 정렬 순서로 매핑
 */
export const mapSortOrder = (sortOrder: string): SortOrder => {
    const orderMap: Record<string, SortOrder> = {
        "asc": "오름차순",
        "desc": "내림차순"
    };
    return orderMap[sortOrder] || (sortOrder as SortOrder);
};

/**
 * 리스트 타입에 따른 기본 정렬 옵션 반환
 */
export const getSortOptions = (listType: ListType): string[] => {
    if (listType === "팀 리스트") {
        return ["팀명 순", "최근 활동일 순"];
    } else {
        return ["이름 순", "최근 활동일 순"];
    }
};

/**
 * 이름으로 학생 데이터를 검색 (학생 리스트 전용)
 */
export const searchStudentsByName = (studentsData: Student[], searchName: string): Student[] => {
    if (!searchName || !searchName.trim()) {
        return studentsData;
    }
    return studentsData.filter(student =>
        student.name.toLowerCase().includes(searchName.toLowerCase())
    );
};

/**
 * 팀 데이터 정렬
 */
export const sortTeamsData = (teamsData: Team[], sortType: string, sortOrder: SortOrder = "내림차순"): Team[] => {
    return [...teamsData].sort((a, b) => {
        let compareResult = 0;

        switch (sortType) {
            case "팀명 순":
                compareResult = a.team.localeCompare(b.team, 'ko');
                break;
            case "최근 활동일 순": {
                const dateA = parseDate(a.recent);
                const dateB = parseDate(b.recent);
                compareResult = dateA.getTime() - dateB.getTime();
                break;
            }
            default:
                compareResult = 0;
        }

        return sortOrder === "오름차순" ? compareResult : -compareResult;
    });
};

/**
 * 학생 데이터 정렬
 */
export const sortStudentsData = (studentsData: Student[], sortType: string, sortOrder: SortOrder = "내림차순"): Student[] => {
    return [...studentsData].sort((a, b) => {
        let compareResult = 0;

        switch (sortType) {
            case "이름 순":
                compareResult = a.name.localeCompare(b.name, 'ko');
                break;
            case "최근 활동일 순": {
                const dateA = parseDate(a.recent);
                const dateB = parseDate(b.recent);
                compareResult = dateA.getTime() - dateB.getTime();
                break;
            }
            default:
                compareResult = 0;
        }

        return sortOrder === "오름차순" ? compareResult : -compareResult;
    });
};

/**
 * 팀/학생 데이터를 종합적으로 처리하는 메인 함수
 */
export const processTeamData = ({
    rawData,
    listType,
    selectedStatus,
    sortType,
    sortOrder = "desc",
    searchName = ""
}: ProcessTeamDataParams): (Team | Student)[] => {
    let processedData = [...rawData];

    const mappedSortType = mapSortValue(sortType, listType);
    const mappedSortOrder = mapSortOrder(sortOrder);

    processedData = filterByStatus(processedData, selectedStatus);

    if (listType === "학생 리스트") {
        processedData = searchStudentsByName(processedData as Student[], searchName);
    }

    if (listType === "팀 리스트") {
        processedData = sortTeamsData(processedData as Team[], mappedSortType, mappedSortOrder);
    } else {
        processedData = sortStudentsData(processedData as Student[], mappedSortType, mappedSortOrder);
    }

    return processedData;
};

/**
 * 데이터 유효성 검증
 */
export const validateData = (data: unknown): boolean => {
    return Array.isArray(data) && data.length > 0;
};
