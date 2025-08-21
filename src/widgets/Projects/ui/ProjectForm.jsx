import { Cancel, Complete, Input, InputDate } from "@/features/projects";

export function ProjectForm({ type }) {
    return (
        <main className="w-140 bg-white rounded-md h-135 p-5">
            <div className="flex flex-col gap-2 mb-8">
                <p className="text-secondary-50 text-body-s">프로젝트명</p>
                <Input />
            </div>
            <div className="flex flex-col gap-2 mb-8">
                <p className="text-secondary-50 text-body-s">프로젝트 기간</p>
                <InputDate />
            </div>
            <div className="flex flex-col gap-2 mb-8">
                <p className="text-secondary-50 text-body-s">프로젝트 설명</p>
                <Input />
            </div>
            <div className="flex flex-row gap-3 justify-end mt-45">
                <Cancel />
                <Complete />
            </div>
        </main>
    );
}