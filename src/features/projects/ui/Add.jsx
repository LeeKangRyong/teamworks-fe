import Image from "next/image";
import add from "@/assets/icons/add.png";

export function Add() {
    return (
        <Image src={add} alt="add" className="absolute right-2 h-20 w-20 hover:scale-103" />
    );
}