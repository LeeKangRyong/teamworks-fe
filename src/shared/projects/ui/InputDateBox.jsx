import { useState } from "react";
import { formatDateInput, isNumberKey } from "@/shared/utils/dateFormat";

export function InputDateBox() {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        const formattedValue = formatDateInput(e.target.value);
        setValue(formattedValue);
    };

    const handleKeyDown = (e) => {
        if (!isNumberKey(e)) {
            e.preventDefault();
        }
    };

    return (
        <div className="bg-secondary-3 rounded-lg py-3 px-4 w-25 items-center flex justify-center border border-transparent focus-within:border-secondary-50 transition-colors">
            <input
                type="text"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="0000/00/00"
                maxLength={10}
                className="bg-transparent outline-none border-none text-body-s text-secondary-60 text-center placeholder:text-secondary-30"
            />
        </div>
    );
}