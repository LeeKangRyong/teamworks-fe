import Image from "next/image";
import logo from "@/assets/icons/logo.png";

export function LayoutHeader() {
    return (
        <header className="absolute w-full h-16 bg-secondary-70 top-0 flex justify-between items-center px-4">
            <Image 
                src={logo} 
                alt="logo" 
                className="rounded-full max-h-12 w-auto"
            />
            <div className="bg-support-pink w-fit p-2 rounded-xl">
                <ul className="text-center text-body-m flex flex-row">
                    <li className="p-2">링크1</li>
                    <li className="p-2">링크2</li>
                    <li className="p-2">링크3</li>
                    <li className="p-2">링크4</li>
                </ul>
            </div>
        </header>
    );
}