import { formatDateInput, isNumberKey } from "@/shared/utils/dateFormat";

export function InputDateBox({ 
    value = "", 
    onChange, 
    hasError = false, 
    onFocus, 
    onBlur,
    otherDate = "",
    isStartDate = true
}) {
    const handleChange = (e) => {
        const rawValue = e.target.value;
        const formattedValue = formatDateInput(rawValue);
        
        if (onChange) {
            onChange(formattedValue);
        }
    };

    const handleKeyDown = (e) => {
        
        // 1. 숫자만 입력
        if (!isNumberKey(e)) {
            e.preventDefault();
            return;
        }
        const currentNumbers = value.replace(/\D/g, "");
        
        // 2. 지우기 키만 활성화
        if (e.key !== "Backspace" && e.key !== "Delete" && /\d/.test(e.key)) {
            const newNumbers = currentNumbers + e.key;
            
            // 3. 길이별 유효성 검사
            if (newNumbers.length === 1) {
                // YYYY -> 2xxx만 허용
                if (e.key !== "2") {
                    e.preventDefault();
                    return;
                }
            } else if (newNumbers.length === 2) {
                // YYYY -> 20xx만 허용
                if (e.key !== "0") {
                    e.preventDefault();
                    return;
                }
            } else if (newNumbers.length === 5) {
                // MM -> 0x / 1x만 허용
                if (e.key !== "0" && e.key !== "1") {
                    e.preventDefault();
                    return;
                }
            } else if (newNumbers.length === 6) {
                // MM -> 01 ~ 12만 허용
                const monthFirst = newNumbers.charAt(4);
                if (monthFirst === "0") {
                    if (e.key === "0") {
                        e.preventDefault();
                        return;
                    }
                } else if (monthFirst === "1") {
                    if (parseInt(e.key) > 2) {
                        e.preventDefault();
                        return;
                    }
                }
            } else if (newNumbers.length === 7) {
                // DD -> 0x / 1x/ 2x / 3x만 허용
                if (parseInt(e.key) > 3) {
                    e.preventDefault();
                    return;
                }
            } else if (newNumbers.length === 8) {
                // DD -> 01 ~ 31만 허용
                const dayFirst = newNumbers.charAt(6);
                if (dayFirst === "0") {
                    if (e.key === "0") {
                        e.preventDefault();
                        return;
                    }
                } else if (dayFirst === "3") {
                    if (parseInt(e.key) > 1) {
                        e.preventDefault();
                        return;
                    }
                }

                // 4. 시작 날짜, 종료 날짜 순서 안지키면 입력 불가
                const newValue = formatDateInput(newNumbers);
                const otherNumbers = otherDate.replace(/\D/g, "");
                
                if (otherNumbers.length === 8) {
                    const currentDate = parseInt(newNumbers);
                    const compareDate = parseInt(otherNumbers);
                    
                    if (isStartDate && currentDate >= compareDate) {
                        e.preventDefault();
                        return;
                    }
                    if (!isStartDate && currentDate <= compareDate) {
                        e.preventDefault();
                        return;
                    }
                }
            } else if (newNumbers.length > 8) {
                e.preventDefault();
                return;
            }
        }
    };

    return (
        <div className={`bg-secondary-3 rounded-lg py-3 px-4 w-28 items-center flex justify-center transition-colors ${
            hasError 
                ? 'border border-warning-100 focus-within:border-warning-100' 
                : 'border border-transparent focus-within:border-secondary-50'
        }`}>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder="YYYY/MM/DD"
                maxLength={10}
                className="bg-transparent outline-none border-none text-body-s text-secondary-60 text-center placeholder:text-secondary-30"
            />
        </div>
    );
}