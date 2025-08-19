import { More } from "@/shared/project/dashboard";
export function NextSubmit() {
    return (
        <article className="w-full border-1 border-gray-10 rounded-lg items-center pb-40 flex flex-row justify-between">
            <h3 className="text-secondary-80 text-body-m p-5">다음 과제 제출일</h3>
            <More />
        </article>
    );
}       