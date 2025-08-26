import Image from "next/image";
import search from "@/assets/icons/search-gray.png";

export function Search({ 
    value = "", 
    onChange, 
    placeholder = "팀 참여자를 선택해주세요", 
    hasError = false, 
    onFocus, 
    onBlur,
    onClick
}) {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div 
            role="button" 
            onClick={handleClick}
            className={`bg-secondary-3 rounded-lg p-3 transition-colors flex flex-row cursor-pointer hover:bg-secondary-10 ${
                hasError 
                    ? 'border border-warning-100 focus-within:border-warning-100' 
                    : 'border border-transparent focus-within:border-secondary-50'
            }`}
        >
            <input
                type="text" 
                value={value}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder}
                className="bg-transparent outline-none border-none text-body-s text-secondary-80 placeholder:text-secondary-30 flex-1 w-100 cursor-pointer"
                readOnly
            />
            <Image src={search} alt="search" className="w-5 h-5 mr-2" />
        </div>
    );
}

