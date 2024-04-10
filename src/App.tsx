import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import {Client, Frame, Message, Stomp} from '@stomp/stompjs';

interface ChatMessage {
  type: 'CHAT' | 'JOIN' | 'LEAVE';
  content: string;
  sender: string;
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentUser, setCurrentUser] = useState('');
  const [message, setMessage] = useState('');
  const socketRef = useRef<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    socketRef.current = Stomp.over(socket);
    socketRef.current.onConnect = (frame: Frame) => {
      socketRef.current?.subscribe('/topic/public', (message: Message) => {
        const chatMessage: ChatMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, chatMessage]);
      });

      const username = prompt('Please enter your username');
      if (username) {
        setCurrentUser(username);
        const joinMessage: ChatMessage = {
          type: 'JOIN',
          content: '',
          sender: username,
        };
        socketRef.current?.publish({ destination: '/app/chat.addUser', body: JSON.stringify(joinMessage) });
      }
    };

    socketRef.current.activate();

    return () => {
      if (socketRef.current) {
        socketRef.current.deactivate();
      }
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '' && socketRef.current) {
      const chatMessage: ChatMessage = {
        type: 'CHAT',
        content: message,
        sender: currentUser,
      };
      socketRef.current.publish({ destination: '/app/chat.sendMessage', body: JSON.stringify(chatMessage) });
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.type === 'JOIN' || msg.type === 'LEAVE' ? (
              <p>{msg.sender} has {msg.type.toLowerCase()} the chat</p>
            ) : (
              <p>
                <strong>{msg.sender}:</strong> {msg.content}
              </p>
            )}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            sendMessage();
          }
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;