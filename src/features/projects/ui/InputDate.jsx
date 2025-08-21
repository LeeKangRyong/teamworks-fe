import { useState } from "react";
import { formatDateInput, isNumberKey } from "@/shared/utils/dateFormat";
import { InputDateBox } from "@/shared/projects";

export function InputDate() {
    return (
        <div className="flex flex-row gap-2  items-center">
            <InputDateBox />
            <p className="text-body-l text-secondary-80 text-center"> ~ </p>
            <InputDateBox />
        </div>
    )
}