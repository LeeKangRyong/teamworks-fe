import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { ProjectCards } from "@/widgets/Cards";
import { Add } from "@/features/projects";

export function Projects() {
    return (
        <div className="bg-secondary-5 flex justify-center w-full min-h-screen relative">
            <div className="fixed left-0 top-0 w-[240px] h-screen bg-white z-30 border-r-1 border-gray-10" />
            <LayoutHeader />
            <LayoutAside />
            <main className="pt-16 pl-[12.5%] h-full w-[75%]">
                <p className="text-heading-l mt-10 mb-5 font-bold">내 프로젝트</p>
                <ProjectCards />
            </main>
            <Add />
        </div>
    );
}