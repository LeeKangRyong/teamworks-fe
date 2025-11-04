export function NotificationCenter({ notifications }) {
    return (
        <article className="border-1 border-gray-10 rounded-lg w-full lg:w-[50%] pb-5">
            <h3 className="text-secondary-80 text-heading-s p-5 font-bold">알림센터</h3>
            <div className="px-5">
                <div className="flex justify-between items-center mb-3 px-8">
                    <p className="text-secondary-50 text-body-s">내용</p>
                    <p className="text-secondary-50 text-body-s">상태</p>
                </div>
                <div className="space-y-2">
                    {notifications && notifications.map((notification, index) => (
                        <div 
                            key={index}
                            className="flex justify-between items-center py-2 px-3 border-b-1 border-gray-10 hover:bg-secondary-5 rounded cursor-pointer"
                        >
                            <p className="text-secondary-80 text-body-s">{notification.content}</p>
                            <div className="bg-secondary-5 px-4 py-0.5 rounded">
                                <span className="text-body-s text-secondary-50">
                                    {notification.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
}