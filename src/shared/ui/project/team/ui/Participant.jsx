import { CheckBox } from "@/shared/ui/common";

export function Participant({ participant, isSelected, onCheck }) {
    const handleClick = () => {
        onCheck(participant.id);
    };

    const handleCheckboxChange = (newChecked) => {
        onCheck(participant.id);
    };

    return (
        <div 
            className={`flex items-center justify-between p-3 border-b border-gray-10 last:border-b-0 cursor-pointer transition-colors duration-200 ${
                isSelected 
                    ? 'bg-primary-5' 
                    : 'hover:bg-gray-10'
            }`}
            onClick={handleClick}
        >
            <div className="flex items-center gap-3">
                <CheckBox 
                    checked={isSelected}
                    onChange={handleCheckboxChange}
                    className="mt-1 pointer-events-none" // 전체 div 클릭이 우선되도록
                />
                
                <div className="flex flex-row gap-10">
                    <p className="text-body-s text-secondary-70">{participant.name}</p>
                    <p className="text-body-s text-secondary-70">{participant.email}</p>
                </div>
            </div>
        </div>
    );
}