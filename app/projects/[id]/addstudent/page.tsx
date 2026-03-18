import { AddStudent } from "@/pages/project/team";

export default async function AddStudentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <AddStudent id={id} />;
}
