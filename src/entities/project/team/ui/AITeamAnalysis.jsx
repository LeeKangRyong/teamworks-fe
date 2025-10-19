import Image from "next/image";
import ai from "@/assets/icons/ai.png";

export function AITeamAnalysis() {
    return (
        <article className="w-full border-gray-10 border-1 rounded-lg px-3 py-4 h-143.5">
            <div className="flex items-center gap-2 pt-4 pl-3">
                <h3 className="text-secondary-80 text-heading-m">AI 팀 분석</h3>
                <Image src={ai} alt="ai" className="w-5 h-5" />
            </div>
        
            <div className="mt-6 space-y-4 px-3">
               {/* TODO: AI 내용 넣기 */}
            </div>
        </article>
    );
}