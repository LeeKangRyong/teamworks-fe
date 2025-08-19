import { Box } from "@/entities/project/dashboard";

export function Assignment() {
    return (
        <main className="bg-white w-full max-w-none py-4">
            <article className="flex flex-row gap-6 w-full min-w-full px-12">
                <Box num="25" desc="총 참여 팀" />
                <Box num="3" desc="주의 요망 팀" />
                <Box num="85%" desc="과제 제출률" />
                <Box num="D-8" desc="다음 과제 제출일" />
            </article>
        </main>
    );
}