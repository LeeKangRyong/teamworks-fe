/**
 * 입력된 숫자를 YYYY/MM/DD 형식으로 포맷팅
 */
export function formatDateInput(value: string): string {
    const numbers = value.replace(/\D/g, "");
    const limitedNumbers = numbers.slice(0, 8);

    let formattedValue = "";

    if (limitedNumbers.length >= 1) {
        formattedValue = limitedNumbers.slice(0, 4);

        if (limitedNumbers.length >= 5) {
            formattedValue += "/" + limitedNumbers.slice(4, 6);

            if (limitedNumbers.length >= 7) {
                formattedValue += "/" + limitedNumbers.slice(6, 8);
            }
        }
    }

    return formattedValue;
}

/**
 * 키보드 입력이 숫자인지 확인
 */
export function isNumberKey(e: KeyboardEvent | React.KeyboardEvent<HTMLInputElement>): boolean {
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

    return /\d/.test(e.key);
}

/**
 * 날짜 입력값에서 숫자만 추출
 */
export function extractNumbers(value: string): string {
    return value.replace(/\D/g, "");
}
