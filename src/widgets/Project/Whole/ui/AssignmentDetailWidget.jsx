"use client"
import { AssignmentTitle } from "@/widgets/Project/Assignment";

export function AssignmentDetailWidget({ projectId, assignmnetId }) {

    return (
        <main className="bg-white w-250 py-4 mb-10">
            <AssignmentTitle />
            <article className="my-8 ml-6 px-8 w-240 h-82 border-1 border-gray-10 rounded-lg">
            </article>
        </main>
    )
}

