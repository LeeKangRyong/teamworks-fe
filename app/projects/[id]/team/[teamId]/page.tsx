import { TeamDetail } from "@/views/project/team";

export default async function TeamDetailPage({ 
    params 
}: { 
    params: Promise<{ id: string; teamId: string }> 
}) {
    await params;
    return <TeamDetail />;
}