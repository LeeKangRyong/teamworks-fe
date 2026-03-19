import { AddStudent } from "@/views/project/team";

export default async function AddStudentPage({ params }: { params: Promise<{ id: string }> }) {
    await params;
    return <AddStudent />;
}
