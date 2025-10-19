import { TeamDetail } from "@/pages/project/team";

export default async function TeamDetailPage({ 
    params 
}: { 
    params: Promise<{ id: string; teamId: string }> 
}) {
    const { id, teamId } = await params;
    return <TeamDetail />;
}