import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { ProjectCards } from "@/widgets/Cards";

export function Projects() {
    return (
        <div className="bg-secondary-5 flex justify-center w-full min-h-screen">
            <LayoutHeader />
            <LayoutAside />
            <main className="pt-16 pl-[12.5%] h-full w-[75%]">
                <p className="text-heading-l mt-10 mb-5">내 프로젝트</p>
                <ProjectCards />
            </main>
        </div>
    );
}