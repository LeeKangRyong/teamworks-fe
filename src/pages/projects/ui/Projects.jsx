import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { ProjectCards } from "@/widgets/Cards";

export function Projects() {
    return (
        <div className="bg-gray-0 flex justify-center w-full h-screen">
            <LayoutHeader />
            <LayoutAside />
            <main className="pt-16 pl-[12.5%] h-full w-[75%]">
                <p className="text-heading-l my-2">내 프로젝트</p>
                <ProjectCards />
            </main>
        </div>
    );
}