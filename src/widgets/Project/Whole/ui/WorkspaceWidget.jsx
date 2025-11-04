"use client";
import { useState } from "react";
import Image from "next/image";
import user from "@/assets/icons/profile.png";
import save from "@/assets/icons/save.png";
import recent from "@/assets/icons/recent.png";
import upload from "@/assets/icons/upload.png";
import plus from "@/assets/icons/plus.png";
import uparrow from "@/assets/icons/arrow-up.png";

const mockFiles = [
    { id: 1, name: "K-paas 공모전_프론트엔드", type: "folder", date: "2025/10/03", isOpen: false },
    { id: 2, name: "기능 설명서_최종.pdf", type: "file", date: "2025/10/01" },
    { id: 3, name: "K-paas 공모전_기획", type: "folder", date: "2025/10/03", isOpen: false },
    { id: 4, name: "기획서 초안.pdf", type: "file", date: "2025/10/03", parentId: 3 },
    { id: 5, name: "공모전 안내문.pdf", type: "file", date: "2025/10/03", parentId: 3 },
    { id: 6, name: "K-paas 공모전_디자인", type: "folder", date: "2025/10/03", isOpen: false },
    { id: 7, name: "K-paas 공모전_백엔드", type: "folder", date: "2025/10/03", isOpen: false },
    { id: 8, name: "공모전 일정표.pdf", type: "file", date: "2025/10/01" },
    { id: 9, name: "협업 규칙.pdf", type: "file", date: "2025/10/01" },
    { id: 10, name: "와이어 프레임.pdf", type: "file", date: "2025/10/01" },
    { id: 11, name: "와이어 프레임(1).pdf", type: "file", date: "2025/10/01" },
];

export function WorkspaceWidget() {
    const [files, setFiles] = useState(mockFiles);

    const toggleFolder = (folderId) => {
        setFiles(files.map(file => 
            file.id === folderId ? { ...file, isOpen: !file.isOpen } : file
        ));
    };

    const renderFiles = () => {
        return files.map(file => {
            if (file.type === "folder") {
                const children = files.filter(f => f.parentId === file.id);
                return (
                    <div key={file.id}>
                        <div 
                            className="flex items-center justify-between py-3 px-6 hover:bg-secondary-3 cursor-pointer border-b border-gray-10"
                            onClick={() => toggleFolder(file.id)}
                        >
                            <div className="flex items-center gap-2 flex-1">
                                <span className="text-secondary-50 text-body-s">
                                    {file.isOpen ? "▼" : "▶"}
                                </span>
                                <span className="text-body-s text-secondary-80">{file.name}</span>
                            </div>
                            <span className="text-body-s text-secondary-60">{file.date}</span>
                        </div>
                        {file.isOpen && children.length > 0 && (
                            <div>
                                {children.map(child => (
                                    <div 
                                        key={child.id}
                                        className="flex items-center justify-between py-3 px-6 pl-16 hover:bg-secondary-3 cursor-pointer border-b border-gray-10"
                                    >
                                        <div className="flex items-center gap-2 flex-1">
                                            <span className="text-body-s text-secondary-80">{child.name}</span>
                                        </div>
                                        <span className="text-body-s text-secondary-60">{child.date}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            } else if (!file.parentId) {
                return (
                    <div 
                        key={file.id}
                        className="flex items-center justify-between py-3 px-6 pl-14 hover:bg-secondary-3 cursor-pointer border-b border-gray-10"
                    >
                        <div className="flex items-center gap-2 flex-1">
                            <span className="text-body-s text-secondary-80">{file.name}</span>
                        </div>
                        <span className="text-body-s text-secondary-60">{file.date}</span>
                    </div>
                );
            }
            return null;
        });
    };

    return (
        <main className="w-full max-w-[1000px] mx-auto py-4 mb-10 px-4">
            <div className="gap-6 flex-wrap flex">
                <div className="w-full lg:w-1/2 border-1 border-gray-10 rounded-lg p-8 flex flex-col min-h-[500px]">
                    <input 
                        type="text"
                        placeholder="제목을 작성해주세요"
                        className="text-heading-m text-secondary-80 mb-4 outline-none border-none bg-transparent placeholder:text-secondary-50"
                    />
                    <textarea
                        placeholder="내용을 작성해주세요"
                        className="text-body-s text-secondary-50 outline-none border-none bg-transparent placeholder:text-secondary-50 resize-none h-[380px]"
                    />
                    <div className="flex justify-end mt-4">
                        <button className="text-caption-regular text-secondary-50 hover:text-secondary-70 flex items-center gap-1 px-2 py-1 border-1 border-gray-10 rounded">
                            <span>유형 선택</span>
                            <Image src={uparrow} alt="uparrow" className="w-4 y-4" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 border-1 border-gray-10 rounded-lg overflow-hidden min-h-[500px]">
                    <div className="flex items-center justify-between px-6 py-3 border-b border-gray-10">
                        <div className="flex items-center gap-3">
                            <button className="p-2 bg-secondary-3 hover:bg-secondary-10 rounded">
                                <Image src={save} alt="save" className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-secondary-3 hover:bg-secondary-10 rounded">
                                <Image src={recent} alt="recent" className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-secondary-3 hover:bg-secondary-10 rounded">
                                <Image src={upload} alt="upload" className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-secondary-3 hover:bg-secondary-10 rounded">
                                <Image src={plus} alt="plus" className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image src={user} alt="user" className="w-8 h-8 rounded-full" />
                            <Image src={user} alt="user" className="w-8 h-8 rounded-full" />
                            <Image src={user} alt="user" className="w-8 h-8 rounded-full" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-6 py-3 border-b border-gray-10">
                        <div className="flex items-center gap-3 flex-1">
                            <span className="text-body-s text-secondary-50">파일명</span>
                        </div>
                        <span className="text-body-s text-secondary-50">날짜</span>
                    </div>

                    <div className="max-h-[500px] overflow-y-auto">
                        {renderFiles()}
                    </div>
                </div>
            </div>
        </main>
    );
}