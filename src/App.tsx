import React, { useState, useEffect } from 'react';
import {ChatMessage} from "./common/models";

const App: React.FC = () => {
  const [username, setUsername] = useState('');
  const [team, setTeam] = useState('noTeam');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomName, setRoomName] = useState('');
  const [playersInRoom, setPlayersInRoom] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleTeam = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTeam(event.target.value);
  };

  const handleNewMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const sendMessage = () => {
    if (socket && username && newMessage) {
      const message: ChatMessage = { sender: username, content: newMessage, team: team };
      socket.send(JSON.stringify(message));
      setNewMessage('');
    }
  };

  /*useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080/chat'); // Replace with your WebSocket endpoint

    newSocket.onopen = () => {
      if (username && roomName) {
        const joinMessage: ChatMessage = { sender: username, content: roomName, team: team };
        newSocket.send(JSON.stringify(joinMessage));
      }
    };

    newSocket.onmessage = (event) => {
      const data: ChatMessage = JSON.parse(event.data);
      if (data.content.startsWith("Players in room")) {
        const players = data.content.split(":")[1].trim().split(",").map(p => p.trim());
        setPlayersInRoom(players);
      } else {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      newSocket.close();
    };
  }, [username, roomName]);*/

  const join = () => {
    const newSocket = new WebSocket('ws://localhost:8080/chat'); // Replace with your WebSocket endpoint

    newSocket.onopen = () => {
      if (username && roomName) {
        const joinMessage: ChatMessage = { sender: username, content: roomName, team: team };
        newSocket.send(JSON.stringify(joinMessage));
      }
    };

    newSocket.onmessage = (event) => {
      const data: ChatMessage = JSON.parse(event.data);
      if (data.content.startsWith("Players in room")) {
        const players = data.content.split(":")[1].trim().split(",").map(p => p.trim());
        setPlayersInRoom(players);
      } else {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      newSocket.close();
    };
  }

  return (
    <div>
      <div>
        <h3>Players in the room:</h3>
        <ul>
          {playersInRoom.map((player) => (
            <li key={player}>{player}</li>
          ))}
        </ul>
      </div>
      <div>
        <input type="text" placeholder="Username" value={username} onChange={handleUsername} />
        <button onClick={join}>Join</button>
        <select value={team} onChange={handleTeam}>
          <option value="">Choose a team</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
        </select>
      </div>
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message.sender}: {message.content}</li>
          ))}
        </ul>
        <input type="text" placeholder="Type a message..." value={newMessage} onChange={handleNewMessage} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;