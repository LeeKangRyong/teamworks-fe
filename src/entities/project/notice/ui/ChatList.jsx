import Image from "next/image";
import user from "@/assets/icons/user.png";
import download from "@/assets/icons/download.png";

export function ChatList({ messages }) {
    const renderDateDivider = (date) => (
        <div className="flex items-center justify-center my-4">
            <div className="bg-gray-10 rounded-full px-4 py-1">
                <p className="text-caption text-secondary-50">{date}</p>
            </div>
        </div>
    );

    const renderMessage = (message, index, messagesArray) => {
        const showDate = index === 0 || messagesArray[index - 1].date !== message.date;
        
        return (
            <div key={message.id}>
                {showDate && renderDateDivider(message.date)}
                
                <div className={`flex ${message.isMine ? 'justify-end' : 'flex-row'} items-start gap-2 mb-4 px-4`}>
                    {!message.isMine && (
                        <Image src={user} alt="user" className="w-10 h-10 rounded-full flex-shrink-0 mt-1" />
                    )}
                    
                    <div className={`flex flex-col ${message.isMine ? 'items-end' : 'items-start'} ${message.isMine ? 'max-w-[70%]' : 'flex-1'}`}>
                        {!message.isMine && (
                            <p className="text-caption-regular text-secondary-80 mb-1">{message.sender}</p>
                        )}
                        
                        <div className={`flex items-end gap-2 ${message.isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                            {message.isFile ? (
                                <div className={`flex items-center gap-3 px-4 py-3 ${
                                    message.isMine ? 'bg-primary-100 text-white rounded-lg' : 'bg-secondary-5 rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-lg'
                                }`}>
                                    <div className="flex-1">
                                        <p className={`text-body-s font-medium ${message.isMine ? 'text-white' : 'text-secondary-80'}`}>
                                            {message.content}
                                        </p>
                                        <p className={`text-caption-regular mt-0.5 ${message.isMine ? 'text-white/80' : 'text-secondary-50'}`}>
                                            용량 {message.fileSize}
                                        </p>
                                    </div>
                                    <button className={`p-1.5 rounded-full flex-shrink-0 ${
                                        message.isMine ? 'hover:bg-white/20' : 'hover:bg-gray-10'
                                    }`}>
                                        <Image 
                                            src={download} 
                                            alt="download" 
                                            className="w-5 h-5"
                                        />
                                    </button>
                                </div>
                            ) : (
                                <div className={`px-4 py-2.5 ${
                                    message.isMine ? 'bg-primary-100 text-white rounded-lg' : 'bg-secondary-5 text-secondary-80 rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-lg'
                                }`}>
                                    <p className="text-body-s whitespace-pre-wrap">{message.content}</p>
                                </div>
                            )}
                            
                            <p className="text-caption-regular text-secondary-30 flex-shrink-0 pb-0.5">{message.timestamp}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (messages.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-secondary-50 text-body-s">메시지 내역이 없습니다</p>
            </div>
        );
    }

    return (
        <>
            {messages.map((message, index) => renderMessage(message, index, messages))}
        </>
    );
}