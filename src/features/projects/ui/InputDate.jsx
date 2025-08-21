import { InputDateBox } from "@/shared/projects";

export function InputDate({ 
    startDate = "", 
    endDate = "", 
    onStartDateChange, 
    onEndDateChange, 
    hasError = false,
    onFocus,
    onBlur
}) {
    return (
        <div className="flex gap-2 items-center">
            <InputDateBox 
                value={startDate}
                onChange={onStartDateChange}
                hasError={hasError}
                onFocus={onFocus}
                onBlur={onBlur}
                otherDate={endDate}
                isStartDate={true}
            />
            <p className="text-body-l text-secondary-80 text-center"> ~ </p>
            <InputDateBox 
                value={endDate}
                onChange={onEndDateChange}
                hasError={hasError}
                onFocus={onFocus}
                onBlur={onBlur}
                otherDate={startDate}
                isStartDate={false}
            />
        </div>
    );
}