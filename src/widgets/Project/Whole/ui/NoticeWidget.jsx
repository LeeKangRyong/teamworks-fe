import { RecentNotice, ChatWidget } from "@/widgets/Project/Notice";

export function NoticeWidget() {
    return (
        <main className="bg-white w-full max-w-[1000px] mx-auto px-4 py-4 mb-10 flex flex-col items-center justify-center gap-6">
            <RecentNotice />
            <ChatWidget />
        </main>
    );
}