import Image from "next/image";
import add from "@/assets/icons/add.png";

export function Add() {
    return (
        <Image src={add} alt="add" className="fixed right-4 bottom-2 h-16 w-16 hover:scale-103 z-50" />
    );
}