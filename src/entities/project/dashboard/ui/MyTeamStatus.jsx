export function MyTeamStatus({ teamName, activities }) {
    return (
        <article className="border-1 border-gray-10 rounded-lg w-full lg:w-[50%] pb-5">
            <h3 className="text-secondary-80 text-heading-s p-5 font-bold">나의 팀 현황</h3>
            <div className="px-5">
                <div className="flex justify-between items-center mb-5">
                    <p className="text-secondary-50 text-body-s">{teamName}</p>
                </div>
                <div className="space-y-2">
                    {activities && activities.map((activity, index) => (
                        <div 
                            key={index}
                            className="flex justify-between items-center py-2.5 px-3 hover:bg-secondary-5 rounded cursor-pointer border-b-1 border-gray-10"
                        >
                            <p className="text-secondary-80 text-body-s">{activity.content}</p>
                            <p className="text-secondary-50 text-body-s">{activity.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
}