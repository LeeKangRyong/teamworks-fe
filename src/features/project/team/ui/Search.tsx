import Image from "next/image";
import search from "@/assets/icons/search-gray.png";

interface Props {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    hasError?: boolean;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onClick?: () => void;
}

export function Search({
    value = "",
    onChange,
    placeholder = "팀 참여자를 선택해주세요",
    hasError = false,
    onFocus,
    onBlur,
    onClick
}: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleClick();
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
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="bg-transparent outline-none border-none text-body-s text-secondary-80 placeholder:text-secondary-30 flex-1 w-100 cursor-pointer"
                readOnly
            />
            <Image src={search} alt="search" className="w-5 h-5 mr-2" />
        </div>
    );
}
