import { Percentage } from "@/entities/project/participation";

export function PercentageWidget() {
    return (
        <article className="border-1 border-gray-10 rounded-lg w-[50%] pb-5">
            <h3 className="text-secondary-80 text-body-l font-bold pl-8 pt-8">평균 활동률</h3>
            <div className="flex flex-row gap-10 justify-center items-center mt-6">
            <Percentage />
            <Percentage />
            </div>
        </article>
    );
}