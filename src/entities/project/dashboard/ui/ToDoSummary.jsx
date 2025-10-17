import { ToDoSummaryList } from "@/shared/ui/project/dashboard"
import { useDashboard, getProgressAssignments } from "@/entities/project/dashboard";
import { useState, useEffect, useMemo } from "react";

export function ToDoSummary({ children, num }) {
    const { assignments } = useDashboard();
    const [randomProgressAssignments, setRandomProgressAssignments] = useState([]);

    const progressAssignments = useMemo(() => {
        return getProgressAssignments(assignments);
    }, [assignments]);

    useEffect(() => {
        const shuffled = [...progressAssignments].sort(() => 0.5 - Math.random());
        setRandomProgressAssignments(shuffled.slice(0, 3));
    }, [progressAssignments]);

    return (
        <article className="border-1 border-gray-10 rounded-lg w-full lg:w-[50%] pb-5">
            <div className="flex justify-between -mx-1">
                <h3 className="text-secondary-80 text-body-m p-5"><b>다음 할 일</b> (총 {num}개)</h3>
                {children}
            </div>
            <div>
                <div className="flex justify-between px-2">
                    <div>
                        <p className="text-secondary-50 text-body-s py-2 pl-2 text-left">내용</p>
                    </div>
                    <div>
                        <p className="text-secondary-50 text-body-s py-2 pr-13 text-left">상태</p>
                    </div>
                </div>
                <div className="px-3">
                    {randomProgressAssignments.map((assignment) => (
                        <ToDoSummaryList 
                            key={assignment.assignment_id}
                            desc={assignment.title} 
                            status={assignment.status} 
                        />
                    ))}
                </div>
            </div>
        </article>
    );
}