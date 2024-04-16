import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import ChatRoom from "./components/ChatRoom";
import './index.css'

const App: React.FC = () => {

  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:35729/chat');

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
      socket.send('Hello, server!');
    };

    socket.onmessage = (event) => {
      setMessages([...messages, JSON.parse(event.data).command]);
      console.log(event);
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };


  }, []);

  const sendMessage = () => {
    const socket = new WebSocket('ws://localhost:35729/chat');
    socket.onopen = () => {
      socket.send(input);
    };
    socket.onmessage = (event) => {
      setMessages([...messages, JSON.parse(event.data).command]);
      console.log(event);
    };
  }


  /*return (
    <div>
      <ul>
        {messages.map(m => <li key={m}>{m}</li>)}
      </ul>
      <input type={"text"} onChange={(e) => setInput(e.target.value)}/>
      <button onClick={sendMessage}>Send</button>
    </div>
  );*/

  return (
      <ChatRoom />
  )

};

export default App;