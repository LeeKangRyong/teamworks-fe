import { useState, useRef, useEffect } from "react";
import { SearchNotice } from "@/features/project/notice";
import { NoticeList } from "@/entities/project/notice";
import { Chat } from "@/widgets/Project/Notice";

export function ChatWidget() {
    const [searchValue, setSearchValue] = useState("");
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [sidebarWidth, setSidebarWidth] = useState(240); // 기본 240px (w-60)
    const [isResizing, setIsResizing] = useState(false);
    const sidebarRef = useRef(null);

    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    const handleSelectChat = (chatId) => {
        setSelectedChatId(chatId);
    };

    const startResizing = () => {
        setIsResizing(true);
    };

    const stopResizing = () => {
        setIsResizing(false);
    };

    const resize = (e) => {
        if (isResizing && sidebarRef.current) {
            const containerRect = sidebarRef.current.parentElement.getBoundingClientRect();
            const newWidth = e.clientX - containerRect.left;
            
            const minWidth = 160;
            const maxWidth = containerRect.width * 0.5;
            
            if (newWidth >= minWidth && newWidth <= maxWidth) {
                setSidebarWidth(newWidth);
            }
        }
    };

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResizing);
        } else {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        }

        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [isResizing]);

    return (
        <section className="w-full border-gray-10 border-1 rounded-lg h-100 min-h-[400px]">
            <div className="flex flex-row h-full relative">
                <div 
                    ref={sidebarRef}
                    className="flex flex-col h-full flex-shrink-0 relative"
                    style={{ width: `${sidebarWidth}px` }}
                >
                    <div className="flex justify-center h-[10%] my-3">
                        <SearchNotice value={searchValue} onChange={handleSearchChange} />
                    </div>
                    <NoticeList 
                        searchValue={searchValue} 
                        onSelectChat={handleSelectChat}
                        selectedChatId={selectedChatId}
                    />
                    
                    <div
                        className="absolute right-0 top-0 w-0.5 h-full cursor-col-resize bg-gray-20 hover:bg-primary-50 hover:w-1 transition-colors"
                        onMouseDown={startResizing}
                    />
                </div>
                <Chat selectedChatId={selectedChatId} />
            </div>
        </section>
    );
}