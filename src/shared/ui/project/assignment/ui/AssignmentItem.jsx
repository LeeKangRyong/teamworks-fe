import { AssignmentStatus } from "@/shared/ui/project/assignment";

export function AssignmentItem({ title, deadline, submit, mark, status, onClick }) {
    return (
        <div className="flex flex-row items-center py-1 hover:bg-gray-10 pl-2 -ml-2 border-b-1 border-gray-10" onClick={onClick}>
            <div className="w-100 flex-shrink-0">
                <p className="text-body-s text-secondary-70 text-left">{title}</p>
            </div>
            <div className="w-35 flex-shrink-0">
                <p className="text-body-s text-secondary-70 text-left">{deadline}</p>
            </div>
            <div className="w-35 flex-shrink-0">
                <p className="text-body-s text-secondary-70 text-left">{submit}</p>
            </div>
            <div className="w-30 flex-shrink-0">
                <p className="text-body-s text-secondary-70 text-left">{mark}</p>
            </div>

            <div className="flex-1 min-w-0">
                <AssignmentStatus status={status} />
            </div>
        </div>
    );
}

