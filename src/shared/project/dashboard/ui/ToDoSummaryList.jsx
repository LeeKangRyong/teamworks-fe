import { ToDoStatus } from "@/shared/project/base";

export function ToDoSummaryList({ desc, status }) {
    return (
        <div className="flex justify-between items-center hover:bg-gray-10 px-2">
            <div className="flex-1 min-w-0 pr-4">
                <p className="text-secondary-70 text-body-s py-2 text-left">{desc}</p>
            </div>
            <div className="flex-shrink-0">
                <ToDoStatus status={status} />
            </div>
        </div>
    );
}