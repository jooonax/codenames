import { useState } from 'react'
import './App.css'
import {ChatMessage} from "./common/models";
import SockJsClient from 'react-stomp';

function App() {
  const [username, setUsername] = useState('');
  const [team, setTeam] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

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
    clientRef.current?.sendMessage('/app/chat', JSON.stringify({ sender: username, content: newMessage }));
    setNewMessage('');
  };

  const clientRef = React.useRef<SockJsClient>(null);

  useEffect(() => {
    if (username && team) {
      clientRef.current?.sendMessage('/app/join', JSON.stringify({ sender: username, content: team }));
    }
  }, [username, team]);

  return (
    <div>
      <div>
        <input type="text" placeholder="Username" value={username} onChange={handleUsername} />
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
      <SockJsClient
        url="/chat"
        topics={['/topic/room']}
        onMessage={(msg) => {
          const data: ChatMessage = JSON.parse(msg.body);
          setMessages((prevMessages) => [...prevMessages, data]);
        }}
        ref={clientRef}
      />
    </div>
  );
}

export default App
