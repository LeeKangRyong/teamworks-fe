"use client";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";

export function AddStudent() {
    return (
        <div className="bg-secondary-5 w-full min-h-screen">
            <LayoutHeader />
            <LayoutAside />

            <div className="transition-all duration-300 pl-12">
                <div className="flex justify-center mt-20">
                    <div className="w-full max-w-[1040px] px-4 lg:px-4">
                        <h1 className="text-heading-m mt-7 mb-5 text-center mr-125">학생 추가</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
