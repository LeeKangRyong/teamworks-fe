"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/icons/logo.png";
import { HeaderList } from "@/shared/ui/Layout";

export function LayoutHeader() {
    const router = useRouter();

    const handleLogo = () => {
        router.push("/projects");
    };

    return (
        <header className="absolute w-full min-w-fit max-x-none h-18 bg-gray-0 top-0 flex justify-between items-center border-b-1 border-gray-10 z-50">
            <div className="flex flex-row gap-2 items-center cursor-pointer px-4" onClick={handleLogo}>
                <Image src={logo} alt="logo" className="rounded-sm max-h-6 w-auto" />
                <p className="text-body-l !font-black">Team</p>
                <p className="text-body-l font-black -ml-2">Works</p>
            </div>
            <HeaderList />
        </header>
    );
}