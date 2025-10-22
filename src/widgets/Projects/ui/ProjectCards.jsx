"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProjectCard } from "@/entities/projects"
import { More, MakeProject } from "@/features/projects";
import { DeleteModal } from "@/widgets/Projects";
import { useModal } from "@/shared/hooks";
import { useAuth } from "@/entities/auth";
import noProject from "@/assets/icons/no-project.png";

export function ProjectCards({ projects, setProjects }) {
    const { isOpen: isDeleteModalOpen, modalData: deleteProjectData, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
    const router = useRouter();
    const { user, isLoading: isAuthLoading } = useAuth();

    const handleDetail = (projectId) => {
        router.push(`/projects/${projectId}/dashboard`);
    };

    const handleDeleteClick = (project) => {
        openDeleteModal({
            id: project.id,
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
                    <div className="col-span-full flex flex-col items-center justify-center min-h-[90vh]">
                        <Image src={noProject} alt="noProject" className="w-24 h-24 mb-5"/>
                        <p className="text-secondary-50 text-body-m text-center p-0.5">현재 생성된 프로젝트가 없습니다</p>
                        <p className="text-secondary-50 text-body-m text-center p-0.5 mb-8">새 프로젝트를 만들어 시작해보세요</p>
                        <MakeProject />
                    </div>
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