"use client";
import { useAuth } from "@/entities/auth";

export function AssignmentTitle({ title, description, duration, point, submit, mark }) {
    const { user } = useAuth();
    
    const handleSubmit = () => {
        console.log('제출하기 clicked');
    };

    const handleEdit = () => {
        console.log('수정하기 clicked');
    };

    return (
        <article className="px-4 sm:px-8 w-full border-1 border-gray-10 rounded-lg">
            <div className="py-6">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-heading-m text-secondary-80">{title}</h2>
                    
                    {user?.role === 'PARTICIPANT' ? (
                        <button 
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-primary-100 text-white text-body-s rounded hover:bg-primary-110 transition-colors"
                        >
                            제출하기
                        </button>
                    ) : (
                        <button 
                            onClick={handleEdit}
                            className="px-4 py-2 bg-gray-10 text-secondary-70 text-body-s rounded hover:bg-gray-20 transition-colors"
                        >
                            수정하기
                        </button>
                    )}
                </div>
                
                <p className="text-body-m text-secondary-60 mb-2 min-h-[4.5rem]">{description}</p>
                <div className="flex flex-wrap gap-4 sm:gap-8">
                    <div>
                        <span className="text-body-s text-secondary-50 !font-bold">기간 | </span>
                        <span className="text-body-s text-secondary-50">{duration} 12:00 ~ {duration} 23:59</span>
                    </div>
                    <div>
                        <span className="text-body-s text-secondary-50 !font-bold">배점 | </span>
                        <span className="text-body-s text-secondary-50">{point}</span>
                    </div>
                    <div>
                        <span className="text-body-s text-secondary-50 !font-bold">상태 | </span>
                        <span className="text-body-s text-secondary-50">{submit}</span>
                    </div>
                    <div>
                        <span className="text-body-s text-secondary-50 !font-bold">점수 | </span>
                        <span className="text-body-s text-secondary-50">{mark}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}