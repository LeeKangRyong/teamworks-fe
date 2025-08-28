import { RecentNotice, ChatWidget } from "@/widgets/Project/Notice";

export function NoticeWidget() {
    return (
        <main className="bg-white w-250 py-4 mb-10 flex flex-col items-center justify-center gap-6">
            <RecentNotice />
            <ChatWidget />
        </main>
    );
}