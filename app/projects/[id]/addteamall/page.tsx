import { AddTeamAll } from "@/views/project/team";

export default async function AddTeamAllPage({ params }: { params: Promise<{ id: string }> }) {
    await params;
    return <AddTeamAll />;
}