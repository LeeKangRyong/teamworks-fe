import Image from "next/image";
import search from "@/assets/icons/search-gray.png";

export function SearchName() {
    return (
        <div className="flex justify-between bg-secondary-3 rounded-lg items-center px-3 py-3 mt-3">
            <input 
                type="text" 
                placeholder="이름을 입력하세요" 
                className="bg-transparent outline-none border-none text-body-s text-secondary-60 placeholder:text-secondary-50 flex-1 w-38"
            />
            <Image src={search} alt="search" className="w-4 h-4" />
        </div>
    );
}