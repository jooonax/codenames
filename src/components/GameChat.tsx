// Project: codenames
// Created by: kocjod20
// Date: 2024-05-07
// Time: 14:48:57

import React, {useContext} from 'react';
import gameChatContext from "../context/GameChatContext";
import playerContext from "../context/PlayerContext";

const GameChat = () => {
  const [chat, sendMessage] = useContext(gameChatContext);
  const [player, setPlayer] = useContext(playerContext);

  return (
    <div>
      {player.username}
      <ul>
        {chat.map((m, i) => <li key={i}>{m.sender.username} - {m.message}</li>)}
      </ul>
      <button onClick={() => sendMessage({
        date: "", status: "MESSAGE",
        sender: player,
        message: "test"
      })}>send message</button>
    </div>
  );
};

export default GameChat;