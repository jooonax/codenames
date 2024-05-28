import React, {CSSProperties, useContext, useEffect, useState} from 'react';
import gameChatContext from "../context/GameChatContext";
import playerContext from "../context/PlayerContext";
import './GameChat.css';
import {ChatMessage, Player} from "../common/models";
import GameStateContext from "../context/GameStateContext";
import gameStateContext from "../context/GameStateContext";

const GameChat = () => {
    const [chat, sendMessage] = useContext(gameChatContext);
    const [player] = useContext(playerContext);
    const [gameState, setGameState] = useContext(gameStateContext);
    const [message, setMessage] = useState<string>("");

    const handleSendMessage = () => {
        if (message.trim()) {
            sendMessage({
                date: new Date().toISOString(),
                sender: player,
                target: { username: "", id: -1, roomCode: "", team: "NONE", role: "NONE"} as Player,
                message: message
            });
            setMessage("");
        }
    };

    useEffect(() => {
        let objDiv = document.getElementById("chatMessages");
        if (objDiv) {
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    }, [chat]);

    const getTeamStyle = (m: ChatMessage): CSSProperties => {
        if (m.sender.team === "NONE") return {};
        return {
            backgroundImage: 'url("/src/assets/back-'+ m.sender.team.toLowerCase() +'.png")'
        }
    }

    const getHeightStyle = (): CSSProperties => {
        let height = "20vw";
        let top = "18vw";
        if (gameState.started) {
            height = "15vw";
            top = "23vw";
            if (player.role === "NONE" || player.team === "NONE") {
                height = "11vw";
                top = "27vw";
            }
        }

        return {
            top: top,
            height: height,
        }
    }
    const getMessagesHeightStyle = (): CSSProperties => {
        let maxHeight = "20vw";
        if (gameState.started) {
            maxHeight = "15vw";
            if (player.role === "NONE" || player.team === "NONE") {
                maxHeight = "11vw";
            }
        }
        return {
            maxHeight: maxHeight,
        }
    }

    return (
        <div className="game-chat" style={getHeightStyle()}>
            <div className="input-container" >
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" ? handleSendMessage() : null}
                    placeholder="Type your message here..."
                />
                <div className="chat-message-send" onClick={handleSendMessage}></div>
            </div>
            <div className="chat-messages" id="chatMessages" style={getMessagesHeightStyle()}>
                {chat.map((m, i) => (
                    <div key={i} className="chat-message">
                        <div className="chat-message-team" style={getTeamStyle(m)}></div>
                        <div className="chat-message-name">{m.sender.username}:</div>
                        <div className="chat-message-text">{m.message}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameChat;
