import { AddTeamAll } from "@/pages/project/team";

export default async function AddTeamAllPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <AddTeamAll id={id} />;
}