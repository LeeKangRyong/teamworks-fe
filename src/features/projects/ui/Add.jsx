"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import add from "@/assets/icons/add.png";

export function Add() {
    const router = useRouter();
    
    const handleAdd= () => {
        router.push("/projects/add");
    };

    return (
        <button onClick={handleAdd}>
            <Image src={add} alt="add" className="fixed right-4 bottom-2 h-16 w-16 hover:scale-103 z-50" />
        </button>
    );
}