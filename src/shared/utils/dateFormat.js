/**
 * 입력된 숫자를 YYYY/MM/DD 형식으로 포맷팅
 * @param {string} value - 입력값
 * @returns {string} 포맷팅된 날짜 문자열
 */
export function formatDateInput(value) {
    // 숫자만 추출
    const numbers = value.replace(/\D/g, "");
    
    // 8자리까지만 허용 (YYYYMMDD)
    const limitedNumbers = numbers.slice(0, 8);
    
    // 포맷팅 적용
    let formattedValue = "";
    
    if (limitedNumbers.length >= 1) {
        formattedValue = limitedNumbers.slice(0, 4); // YYYY
        
        if (limitedNumbers.length >= 5) {
            formattedValue += "/" + limitedNumbers.slice(4, 6); // MM
            
            if (limitedNumbers.length >= 7) {
                formattedValue += "/" + limitedNumbers.slice(6, 8); // DD
            }
        }
    }
    
    return formattedValue;
}

/**
 * 키보드 입력이 숫자인지 확인
 * @param {KeyboardEvent} e - 키보드 이벤트
 * @returns {boolean} 숫자이면 true, 아니면 false
 */
export function isNumberKey(e) {
    // 백스페이스, 화살표 키, 탭 등은 허용
    if (
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "Tab" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown"
    ) {
        return true;
    }
    
    // 숫자인지 확인
    return /\d/.test(e.key);
}

/**
 * 날짜 입력값에서 숫자만 추출
 * @param {string} value - 입력값
 * @returns {string} 숫자만 포함된 문자열
 */
export function extractNumbers(value) {
    return value.replace(/\D/g, "");
}