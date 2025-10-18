import { Percentage } from "@/entities/project/participation";

export function PercentageWidget() {
    return (
        <article className="border-1 border-gray-10 rounded-lg w-full lg:w-[50%] pb-5">
            <h3 className="text-secondary-80 text-body-l font-bold pl-4 sm:pl-8 pt-6 sm:pt-8">
                평균 활동률
            </h3>
            <div className="flex flex-row gap-8 sm:gap-12 lg:gap-10 justify-center items-center mt-4 sm:mt-6 px-4">
                <Percentage 
                    percentage={75} 
                    label="전체 기간" 
                />
                <Percentage 
                    percentage={50} 
                    label="최근" 
                />
            </div>
        </article>
    );
}