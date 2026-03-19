"use client";
import { useRouter } from "next/navigation";
import { ProjectCard } from "@/entities/projects";
import { More } from "@/features/projects";
import { DeleteModal } from "@/widgets/Projects";
import { EmptyProjectState } from "@/widgets/Projects";
import { useModal } from "@/shared/hooks";
import { useAuth } from "@/entities/auth";

interface Project {
    project_id: number;
    name: string;
    startDate: string;
    endDate: string;
    participantCount: number;
}

interface ProjectModalData {
    id: number;
    name: string;
}

interface Props {
    projects: Project[];
}

export function ProjectCards({ projects }: Props) {
    const { isOpen: isDeleteModalOpen, modalData: deleteProjectData, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal<ProjectModalData>();
    const router = useRouter();
    const { user } = useAuth();

    const handleDetail = (projectId: number) => {
        router.push(`/projects/${projectId}/dashboard`);
    };

    const handleDeleteClick = (project: Project) => {
        openDeleteModal({
            id: project.project_id,
            name: project.name
        });
    };

    const handleConfirmDelete = () => {
        if (!deleteProjectData) return;
        closeDeleteModal();
    };

    return (
        <>
            <section className="grid gap-x-6 gap-y-12 w-full h-full pb-20" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(max(280px, calc((100% - 48px) / 3)), 1fr))'}}>
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <ProjectCard
                            key={project.project_id}
                            name={project.name}
                            startDate={project.startDate}
                            endDate={project.endDate}
                            participantCount={project.participantCount}
                            onClick={() => handleDetail(project.project_id)}
                        >
                            <More
                                projectId={project.project_id}
                                onDeleteClick={() => handleDeleteClick(project)}
                                role={user?.role}
                            />
                        </ProjectCard>
                    ))
                ) : (
                    <EmptyProjectState role={user?.role} />
                )}
            </section>

            {isDeleteModalOpen && deleteProjectData && (
                <DeleteModal
                    projectName={deleteProjectData.name}
                    onClose={closeDeleteModal}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </>
    );
}
