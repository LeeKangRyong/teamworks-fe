"use client";
import { useState } from "react";
import { ListButton } from "@/shared/ui/project/team";

interface Props {
    onListChange?: (buttonName: string) => void;
}

export function ListButtons({ onListChange }: Props) {
    const [selectedButton, setSelectedButton] = useState("팀 리스트");

    const handleButtonClick = (buttonName: string) => {
        setSelectedButton(buttonName);
        if (onListChange) {
            onListChange(buttonName);
        }
    };

    return (
        <div className="flex flex-row gap-4" role="tablist" aria-label="팀 관리 메뉴">
            <ListButton
                list="팀 리스트"
                isSelected={selectedButton === "팀 리스트"}
                onClick={() => handleButtonClick("팀 리스트")}
            />
            <ListButton
                list="학생 리스트"
                isSelected={selectedButton === "학생 리스트"}
                onClick={() => handleButtonClick("학생 리스트")}
            />
        </div>
    );
}
