/**
 * ============================================
 * 날짜 관련 유틸리티 함수
 * ============================================
 */

/**
 * 날짜 문자열을 Date 객체로 변환
 * @param {string} dateString - "25/08/14" 형식의 날짜 문자열
 * @returns {Date} Date 객체
 */
export const parseDate = (dateString) => {
    // "25/08/14" 형식을 "2025-08-14" 형식으로 변환
    const [year, month, day] = dateString.split('/');
    return new Date(`20${year}`, month - 1, day);
};

/**
 * ============================================
 * 상태(Status) 관련 유틸리티 함수
 * ============================================
 */

/**
 * 상태 값을 실제 데이터의 상태 값으로 매핑
 * @param {string} statusValue - 컴포넌트에서 전달된 상태 값
 * @returns {string} 실제 데이터의 상태 값
 */
export const mapStatusValue = (statusValue) => {
    const statusMap = {
        "all": "전체",
        "good": "좋음", 
        "warning": "위험",
        "freeload": "무임승차"
    };
    return statusMap[statusValue] || statusValue;
};

/**
 * 상태에 따른 데이터 필터링
 * @param {Array} data - 필터링할 데이터 배열
 * @param {string} selectedStatus - 선택된 상태 ("전체", "좋음", "위험", "무임승차" 등)
 * @returns {Array} 필터링된 데이터 배열
 */
export const filterByStatus = (data, selectedStatus) => {
    // 컴포넌트에서 온 값을 실제 데이터 값으로 매핑
    const mappedStatus = mapStatusValue(selectedStatus);
    
    if (!mappedStatus || mappedStatus === "전체") {
        return data;
    }
    return data.filter(item => item.status === mappedStatus);
};

/**
 * ============================================
 * 정렬(Sort) 관련 유틸리티 함수
 * ============================================
 */

/**
 * 정렬 값을 실제 정렬 타입으로 매핑
 * @param {string} sortValue - 컴포넌트에서 전달된 정렬 값
 * @param {string} listType - 리스트 타입 ("팀 리스트" 또는 "학생 리스트")
 * @returns {string} 실제 정렬 타입
 */
export const mapSortValue = (sortValue, listType) => {
    if (listType === "팀 리스트") {
        const teamSortMap = {
            "name": "팀명 순",
            "activity": "최근 활동일 순"
        };
        return teamSortMap[sortValue] || sortValue;
    } else {
        const studentSortMap = {
            "name": "이름 순", 
            "activity": "최근 활동일 순"
        };
        return studentSortMap[sortValue] || sortValue;
    }
};

/**
 * 정렬 순서 값을 실제 정렬 순서로 매핑
 * @param {string} sortOrder - 컴포넌트에서 전달된 정렬 순서
 * @returns {string} 실제 정렬 순서
 */
export const mapSortOrder = (sortOrder) => {
    const orderMap = {
        "asc": "오름차순",
        "desc": "내림차순"
    };
    return orderMap[sortOrder] || sortOrder;
};

/**
 * 리스트 타입에 따른 기본 정렬 옵션 반환
 * @param {string} listType - 리스트 타입 ("팀 리스트" 또는 "학생 리스트")
 * @returns {Array} 정렬 옵션 배열
 */
export const getSortOptions = (listType) => {
    if (listType === "팀 리스트") {
        return ["팀명 순", "최근 활동일 순"];
    } else {
        return ["이름 순", "최근 활동일 순"];
    }
};

/**
 * ============================================
 * 검색 관련 유틸리티 함수
 * ============================================
 */

/**
 * 이름으로 학생 데이터를 검색 (학생 리스트 전용)
 * @param {Array} studentsData - 학생 데이터 배열
 * @param {string} searchName - 검색할 이름
 * @returns {Array} 검색 결과 데이터 배열
 */
export const searchStudentsByName = (studentsData, searchName) => {
    if (!searchName || !searchName.trim()) {
        return studentsData;
    }
    return studentsData.filter(student => 
        student.name.toLowerCase().includes(searchName.toLowerCase())
    );
};

/**
 * ============================================
 * 데이터 정렬 함수
 * ============================================
 */

/**
 * 팀 데이터 정렬
 * @param {Array} teamsData - 팀 데이터 배열
 * @param {string} sortType - 정렬 타입 ("팀명 순", "최근 활동일 순")
 * @param {string} sortOrder - 정렬 순서 ("오름차순", "내림차순")
 * @returns {Array} 정렬된 팀 데이터 배열
 */
export const sortTeamsData = (teamsData, sortType, sortOrder = "내림차순") => {
    const sortedData = [...teamsData].sort((a, b) => {
        let compareResult = 0;

        switch (sortType) {
            case "팀명 순":
                compareResult = a.team.localeCompare(b.team, 'ko');
                break;
            case "최근 활동일 순":
                const dateA = parseDate(a.recent);
                const dateB = parseDate(b.recent);
                compareResult = dateA - dateB;
                break;
            default:
                compareResult = 0;
        }

        // 정렬 순서 적용 (오름차순/내림차순)
        return sortOrder === "오름차순" ? compareResult : -compareResult;
    });

    return sortedData;
};

/**
 * 학생 데이터 정렬
 * @param {Array} studentsData - 학생 데이터 배열
 * @param {string} sortType - 정렬 타입 ("이름 순", "최근 활동일 순")
 * @param {string} sortOrder - 정렬 순서 ("오름차순", "내림차순")
 * @returns {Array} 정렬된 학생 데이터 배열
 */
export const sortStudentsData = (studentsData, sortType, sortOrder = "내림차순") => {
    const sortedData = [...studentsData].sort((a, b) => {
        let compareResult = 0;

        switch (sortType) {
            case "이름 순":
                compareResult = a.name.localeCompare(b.name, 'ko');
                break;
            case "최근 활동일 순":
                const dateA = parseDate(a.recent);
                const dateB = parseDate(b.recent);
                compareResult = dateA - dateB;
                break;
            default:
                compareResult = 0;
        }

        // 정렬 순서 적용 (오름차순/내림차순)
        return sortOrder === "오름차순" ? compareResult : -compareResult;
    });

    return sortedData;
};

/**
 * ============================================
 * 종합 데이터 처리 함수
 * ============================================
 */

/**
 * 팀/학생 데이터를 종합적으로 처리하는 메인 함수
 * @param {Object} params - 처리 파라미터 객체
 * @param {Array} params.rawData - 원본 데이터 (teamsData 또는 studentsData)
 * @param {string} params.listType - 리스트 타입 ("팀 리스트" 또는 "학생 리스트")
 * @param {string} params.selectedStatus - 선택된 상태
 * @param {string} params.sortType - 정렬 타입
 * @param {string} params.sortOrder - 정렬 순서
 * @param {string} params.searchName - 검색어 (학생 리스트만 사용)
 * @returns {Array} 처리된 데이터 배열
 */
export const processTeamData = ({
    rawData,
    listType,
    selectedStatus,
    sortType,
    sortOrder = "desc",
    searchName = ""
}) => {
    let processedData = [...rawData];

    // 컴포넌트에서 온 값들을 실제 데이터 형식으로 매핑
    const mappedSortType = mapSortValue(sortType, listType);
    const mappedSortOrder = mapSortOrder(sortOrder);

    // 1. 상태 필터링
    processedData = filterByStatus(processedData, selectedStatus);

    // 2. 이름 검색 (학생 리스트만)
    if (listType === "학생 리스트") {
        processedData = searchStudentsByName(processedData, searchName);
    }

    // 3. 정렬
    if (listType === "팀 리스트") {
        processedData = sortTeamsData(processedData, mappedSortType, mappedSortOrder);
    } else {
        processedData = sortStudentsData(processedData, mappedSortType, mappedSortOrder);
    }

    return processedData;
};

/**
 * ============================================
 * 검증 유틸리티 함수
 * ============================================
 */

/**
 * 데이터 유효성 검증
 * @param {Array} data - 검증할 데이터
 * @returns {boolean} 유효한 데이터 여부
 */
export const validateData = (data) => {
    return data && Array.isArray(data) && data.length > 0;
};