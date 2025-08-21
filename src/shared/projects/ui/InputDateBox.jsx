import { formatDateInput, isNumberKey } from "@/shared/utils/dateFormat";

export function InputDateBox({ value = "", onChange, hasError = false, onFocus, onBlur }) {
    const handleChange = (e) => {
        const formattedValue = formatDateInput(e.target.value);
        if (onChange) {
            onChange(formattedValue);
        }
    };

    const handleKeyDown = (e) => {
        if (!isNumberKey(e)) {
            e.preventDefault();
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