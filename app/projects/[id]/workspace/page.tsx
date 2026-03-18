import { Workspace } from "@/views/project/workspace"

export default async function WorkspacePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <Workspace id={id} />;
}