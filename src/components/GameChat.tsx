import React, { useContext, useState } from 'react';
import gameChatContext from "../context/GameChatContext";
import playerContext from "../context/PlayerContext";
import './GameChat.css';

const GameChat = () => {
    const [chat, sendMessage] = useContext(gameChatContext);
    const [player] = useContext(playerContext);
    const [message, setMessage] = useState<string>("");

    const handleSendMessage = () => {
        if (message.trim()) {
            sendMessage({
                date: new Date().toISOString(),
                sender: player,
                message: message
            });
            setMessage(""); // Clear the input after sending the message
        }
    };

    return (
        <div className="game-chat">
            <div className="input-container">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
            <ul className="chat-messages">
                {chat.map((m, i) => (
                    <li key={i}>
                        {m.sender.username} - {m.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameChat;
