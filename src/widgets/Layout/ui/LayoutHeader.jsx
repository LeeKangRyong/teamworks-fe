"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/icons/logo.png";
import { HeaderList } from "@/features/layout";
import { useToast } from "@/shared/hooks";
import { Toast } from "@/shared/ui/common";

export function LayoutHeader() {
    const router = useRouter();
    const { isVisible, message, showToast } = useToast();

    const handleToastTest = () => {
        showToast("토스트 메세지입니다");
    };

    const handleLogo = () => {
        router.push("/projects");
    };

    return (
        <header className="absolute w-full h-18 bg-gray-0 top-0 flex justify-between items-center border-b-1 border-gray-10 z-50">
            <div className="flex flex-row gap-2 items-center cursor-pointer px-4" onClick={handleLogo}>
                <Image src={logo} alt="logo" className="rounded-sm max-h-6 w-auto" />
                <p className="text-body-l font-black">TeamWorks</p>
            </div>
            <HeaderList />

            <button
                className="absolute top-5 right-40 bg-warning-100 w-fit text-center text-gray-0 text-body-s p-2 rounded-full hover:scale-105 duration-200"
                onClick={handleToastTest}   
            >
                토스트 테스트
            </button>            
            {isVisible && <Toast message={message} />}

        </header>
    );
}