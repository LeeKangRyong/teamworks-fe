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
            {isVisible && <Toast message={message} />}

        </header>
    );
}