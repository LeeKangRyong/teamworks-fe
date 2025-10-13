import { useState } from "react";
import { SendNotice, SearchNotice } from "@/features/project/notice";
import { NoticeList } from "@/entities/project/notice";

export function ChatWidget() {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    return (
        <section className="w-240 border-gray-10 border-1 rounded-lg h-100">
            <div className="flex flex-row h-full">
                <div className="flex flex-col h-full">
                    <div className="flex justify-center h-[10%] my-3">
                        <SearchNotice value={searchValue} onChange={handleSearchChange} />
                    </div>
                    <NoticeList searchValue={searchValue} />
                </div>
                <SendNotice />
            </div>
        </section>
    );
}