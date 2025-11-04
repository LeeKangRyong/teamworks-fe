import { timelineData } from "@/shared/mock";

export function TimelineShort() {
    const sortedTimelineData = [...timelineData].sort((a, b) => {
        const [yearA, monthA, dayA] = a.date.split('/').map(Number);
        const [yearB, monthB, dayB] = b.date.split('/').map(Number);
        
        const dateA = new Date(2000 + yearA, monthA - 1, dayA);
        const dateB = new Date(2000 + yearB, monthB - 1, dayB);
        
        return dateB - dateA;
    });

    return (
        <article className="w-full border-gray-10 border-1 rounded-lg px-3 py-4 h-[304px]">
            <h3 className="text-secondary-80 text-body-l font-bold pt-2 pl-3 mb-4">최근 활동</h3>
            <div className="flex justify-center overflow-y-auto scrollbar-thin h-[calc(100%-3.5rem)]">
                <div className="w-full px-3 space-y-6">
                    {sortedTimelineData.map((dateGroup, groupIndex) => (
                        <div key={groupIndex} className="relative">
                            <div className="bg-secondary-3 text-secondary-50 text-caption-regular -ml-4 mb-4 px-2 py-1 rounded inline-block relative z-20">
                                {dateGroup.date}
                            </div>
                            
                            <div className="space-y-2">
                                {dateGroup.activities.map((activity, activityIndex) => (
                                    <div key={activity.id} className="flex items-start gap-3">
                                        <div className="flex flex-col items-center pt-1 relative">
                                            <div className="w-2 h-2 rounded-full bg-secondary-30 flex-shrink-0 z-10" />
                                            {(activityIndex < dateGroup.activities.length - 1 || groupIndex < sortedTimelineData.length - 1) && (
                                                <div 
                                                    className="w-0.5 absolute top-3 bg-secondary-10" 
                                                    style={{
                                                        height: activityIndex === dateGroup.activities.length - 1 && groupIndex < sortedTimelineData.length - 1 
                                                            ? '8rem' 
                                                            : '4rem'
                                                    }} 
                                                />
                                            )}
                                        </div>
                                        
                                        <div className="flex-1 pb-4">
                                            <p className="text-secondary-80 text-body-s mb-1">{activity.title}</p>
                                            <p className="text-secondary-50 text-caption-regular">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
}