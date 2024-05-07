// Project: codenames
// Created by: kocjod20
// Date: 2024-05-07
// Time: 14:48:57

import React, {useContext, useState} from 'react';
import GameStateContext from "../context/GameStateContext";
import {ChatMessage} from "../common/models";

const GameChat = () => {

  const [gameState, setGameState] = useContext(GameStateContext);
  const [message, setMessage] = useState<ChatMessage>({
    senderName: gameState.sender,
    status: 'MESSAGE',
    date: Date.now().toString(),
    receiverName: "",
  });
  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessage({...message, message: value});
  }
  const send = () => {
    setGameState({...gameState, gameMessages: [...gameState.gameMessages, {...message, date: Date.now().toString()}]})
  }
  return (
    <div>
      <ul>
        {gameState?.gameMessages?.map(gm => <li>{gm.senderName}: {gm.message}</li>)}
      </ul>
      <div className="send-message">
        <input type="text" className="input-message" placeholder="enter the message" value={message.message} onChange={handleMessage} />
        <button type="button" className="send-button" onClick={send}>send</button>
      </div>
    </div>
  );
};

export default GameChat;