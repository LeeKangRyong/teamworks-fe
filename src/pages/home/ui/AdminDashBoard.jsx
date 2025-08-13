import Image from "next/image";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";

export function AdminDashBoard() {
    return (
        <div className="bg-secondary-5 flex justify-center w-full h-screen">
            <LayoutHeader />
            <LayoutAside />
        </div>
    );
};