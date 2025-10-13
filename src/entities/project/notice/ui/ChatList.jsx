import Image from "next/image";
import user from "@/assets/icons/user.png";

export function ChatList({ messages, DownloadButton }) {
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
                            {message.isFile && !message.isMine ? (
                                // 상대방이 보낸 파일 - 다운로드 버튼 있음
                                <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-lg">
                                    <div className="flex-1">
                                        <p className="text-body-s text-secondary-80">
                                            {message.content}
                                        </p>
                                        <p className="text-caption-regular mt-0.5 text-secondary-50">
                                            용량 {message.fileSize}
                                        </p>
                                    </div>
                                    {DownloadButton && (
                                        <DownloadButton 
                                            fileName={message.content}
                                            fileUrl={message.fileUrl || '/sample.pdf'}
                                        />
                                    )}
                                </div>
                            ) : (
                                // 일반 텍스트 메시지
                                <div className={`px-4 py-3 whitespace-pre-wrap ${
                                    message.isMine 
                                        ? 'bg-primary-100 text-white rounded-lg' 
                                        : 'bg-white text-secondary-80 rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-lg'
                                }`}>
                                    <p className="text-body-s">{message.content}</p>
                                </div>
                            )}
                            
                            <span className={`text-caption-regular text-secondary-50 flex-shrink-0 ${message.isMine ? 'mr-1' : 'ml-1'}`}>
                                {message.timestamp}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col">
            {messages.map((message, index) => renderMessage(message, index, messages))}
        </div>
    );
}