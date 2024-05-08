// Project: codenames
// Created by: kocjod20
// Date: 2024-05-07
// Time: 14:48:57

import React, {useContext, useState} from 'react';
import gameChatContext from "../context/GameChatContext";
import playerContext from "../context/PlayerContext";

const GameChat = () => {
  const [chat, sendMessage] = useContext(gameChatContext);
  const [player, setPlayer] = useContext(playerContext);
  const [message, setMessage] = useState<string>("");


  return (
    <div>
      {player.username}
      <ul>
        {chat.map((m, i) => <li key={i}>{m.sender.username} - {m.message}</li>)}
      </ul>
      <button onClick={() => sendMessage({
        date: "", status: "MESSAGE",
        sender: player,
        message: message
      })}>send message</button>
      <input type="text" onChange={(e) => setMessage(e.target.value)}/>
    </div>
  );
};

export default GameChat;