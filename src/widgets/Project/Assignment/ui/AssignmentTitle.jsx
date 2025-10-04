export function AssignmentTitle({ title, description, duration, point, submit, mark }) {
    return (
        <article className="ml-6 px-8 w-240 h-50 border-1 border-gray-10 rounded-lg">
            <div className="py-6">
                <h2 className="text-heading-m text-secondary-80 mb-4">{title}</h2>
                <p className="text-body-m text-secondary-60 mb-2 h-18">{description}</p>
                <div className="flex gap-8">
                    <div>
                        <span className="text-body-s text-secondary-50 !font-bold">마감일 | </span>
                        <span className="text-body-s text-secondary-50">{duration} 12:00 ~ {duration} 12:00</span>
                    </div>
                    <div>
                        <span className="text-body-s text-secondary-50 !font-bold">배점 | </span>
                        <span className="text-body-s text-secondary-50">{point}</span>
                    </div>
                    <div>
                        <span className="text-body-s text-secondary-50 !font-bold">제출률 | </span>
                        <span className="text-body-s text-secondary-50">{submit}</span>
                    </div>
                    <div>
                        <span className="text-body-s text-secondary-50 !font-bold">채점 완료율 | </span>
                        <span className="text-body-s text-secondary-50">{mark}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}