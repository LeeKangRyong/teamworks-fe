interface Props {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
}

export function ProjectInfoBox({ title, description, startDate, endDate }: Props) {
    return (
        <div className="bg-secondary-5 rounded-lg p-6 lg:flex-[2] min-w-0">
            <h2 className="text-heading-s text-secondary-80 font-bold mb-2">{title}</h2>
            <p className="text-body-s text-secondary-60 mb-1">{description}</p>
            <p className="text-body-s text-secondary-50">기간 | {startDate} ~ {endDate}</p>
        </div>
    );
}
