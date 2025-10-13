import Image from "next/image";
import search from "@/assets/icons/search-gray.png";

export function SearchNotice({ value = "", onChange }) {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className="flex flex-row w-[90%] items-center justify-center gap-2 bg-secondary-3 rounded py-2">
            <input 
                type="text" 
                placeholder="이름 또는 팀명" 
                value={value}
                onChange={handleChange}
                className="w-[80%] bg-transparent outline-none border-none text-body-s text-secondary-80 placeholder:text-secondary-30"
            />
            <Image src={search} alt="search" className="w-4 h-4" />
        </div>
    );
}