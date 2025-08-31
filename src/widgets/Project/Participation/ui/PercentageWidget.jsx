import { Percentage } from "@/entities/project/participation";

export function PercentageWidget() {
    return (
        <article className="border-1 border-gray-10 rounded-lg w-[50%] pb-5 -mb-4">
            <h3 className="text-secondary-80 text-body-l font-bold pl-8 pt-8">평균 활동률</h3>
            <div className="flex flex-row gap-10 justify-center items-center mt-6">
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