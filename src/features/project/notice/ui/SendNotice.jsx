import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { ENV } from '@/shared/config/env';

export function SendNotice() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        console.log('Connecting to:', ENV.SOCKET.URL);
        
        const newSocket = io(ENV.SOCKET.URL, ENV.SOCKET.OPTIONS);

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

/*
[내장 이벤트 in FE]
connect : 서버 연결 성공
disconnect : 연결 끊어짐
connect_error : 연결 실패/에러
reconnect : 재연결 성공
reconnecting : 재연결 시도 중
reconnect_errror : 재연결 실패
reconnect_failed ; 재연결 포기
ping/pong : 연결 상태 확인

[내장 이벤트 in BE]
connection : 클라이언트 연결 성공
disconnect : 클라이언트 연결 끊어짐
disconnecting : 연결 끊어지는 중
ping/pong : 연결 상태 확인

socket.broadcast.~ : 모든 socket에 event 발생

socket.join('room1'); : 방 입장
socket.leave('room1); : 방 나가기
socket.to('room1').emit('msg'); : 특정 방에 메세지
io.in('room1').emit('msg'); : 특정 방 전체에 메세지

socket.rooms; : 현재 참여 중인 방들 조회
io.sockets.adapter.rooms; : 모든 방 정보 조회

클라이언트는 Room event에 대해 그냥 emit, on으로 연결
*/

/*
[교수님 - 학생들]
학생이 문의 시작하면 동적으로 채팅방 생성
교수님이 자동으로 초대됨 + 교수님에게 새 문의 알림

[연결 끊겼다가 다시 그 채팅방에서 채팅 시]
socket.id는 새롤 부여되지만, 기존 사용자/교수 ID는 동일
emit할 때 userId를 지정하면 됨
*/