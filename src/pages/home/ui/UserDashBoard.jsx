import Image from "next/image";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";

export function UserDashBoard() {
    return (
        <div className="bg-gray-0 flex justify-center w-full h-screen">
            <LayoutHeader />
            <LayoutAside />
        </div>
    );
};