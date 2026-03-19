import { AddTeam } from "@/views/project/team";

export default async function AddTeamPage({ params }: { params: Promise<{ id: string }> }) {
    await params;
    return <AddTeam />;
}