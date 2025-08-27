import { ParticipationDetail } from "@/pages/project";

export default async function ParticipationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ParticipationDetail id={id} />;
}