import { AddTeam } from "@/pages/project";

export default async function AddTeamPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <AddTeam id={id} />;
}