import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socketEndpoint = process.env.NEXT_PUBLIC_BFF_URL;

export function SendNotice() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        console.log('Connecting to:', socketEndpoint);
        
        const newSocket = io(socketEndpoint, {
            transports: ['websocket', 'polling']
        });

        newSocket.on('connect', () => {
            console.log('Connected to server');
            setIsConnected(true);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
            setIsConnected(false);
        });

        newSocket.on('receiveMessage', (message) => {
            console.log('Message received:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        newSocket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    const sendMessage = () => {
        if (!socket || !isConnected) {
            console.error('Socket not connected');
            return;
        }

        if (message.trim() === '') {
            console.log('Empty message, not sending');
            return;
        }

        console.log('Sending message:', message);
        socket.emit('sendMessage', message);
        setMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <article className="w-160 h-60 bg-secondary-3 border-gray-10 border-1 p-4">
            <div className="mb-2">
                Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
            </div>
            
            <div className="flex gap-2 mb-4">
                <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    onKeyPress={handleKeyPress}
                    className="w-80 h-40 rounded bg-white px-2"
                    placeholder="메시지를 입력하세요..."
                />
                <button 
                    onClick={sendMessage} 
                    className="text-body-s bg-primary-10 text-primary-100 px-2 py-1 rounded"
                    disabled={!isConnected}
                >
                    보내기
                </button>
            </div>
            
            <div className="max-h-32 overflow-y-auto">
                <h4>Messages ({messages.length}):</h4>
                {messages.map((msg, index) => (
                    <p key={index} className="mb-1 p-1 bg-white rounded text-sm">
                        {msg}
                    </p>
                ))}
            </div>
        </article>
    );
}