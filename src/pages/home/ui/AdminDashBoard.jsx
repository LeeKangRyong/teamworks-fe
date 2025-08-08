import Image from "next/image";
import { LayoutHeader, LayoutFooter } from "@/widgets/Layout";

export function AdminDashBoard() {
    return (
        <div className="bg-secondary-20 flex justify-center w-full h-screen">
            <LayoutHeader />
            <LayoutFooter />
        </div>
    );
};