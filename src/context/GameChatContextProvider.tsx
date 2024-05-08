// Project: codenames
// Created by: kocjod20
// Date: 2024-05-08
// Time: 11:26:38

import React, {ReactNode, useContext, useEffect, useState} from 'react';
import {ChatMessage, GameState} from "../common/models";
import GameChatContext from "./GameChatContext";
import websocketContext from "./WebsocketContext";

interface Props {
  children: ReactNode;
}

const GameChatContextProvider = ({children}: Props) => {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [websocketFunctions, setWebsocketFunctions] = useContext(websocketContext);

  useEffect(() => {
    setWebsocketFunctions({...websocketFunctions,
      onMessage: onMessage
    })
  }, []);

  const onMessage = (m:ChatMessage) => {
    setChat([...chat, m])
  }

  const sendMessage = (m: ChatMessage) => {
    websocketFunctions.sendMessage(m);
    onMessage(m);
  }

  return (
    <GameChatContext.Provider value={[chat, sendMessage]}>
      {children}
    </GameChatContext.Provider>
  );
};

export default GameChatContextProvider;