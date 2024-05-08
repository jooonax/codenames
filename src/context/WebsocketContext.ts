// Project: codenames
// Created by: kocjod20
// Date: 2024-05-08
// Time: 10:44:28

import {createContext} from "react";
import {ChatMessage, GameState, Player, WebsocketFunctions} from "../common/models";

const websocketContext = createContext<[WebsocketFunctions, (_:WebsocketFunctions) => void, boolean]>([
  {
    connect: (_:Player) => {},
    onGameState: (_: GameState) => {},
    onMessage: (_: ChatMessage) => {},
    sendGameState: (_: GameState) => {},
    sendMessage: (_: ChatMessage)=> {}
  }, () => null,
  false]);

export default websocketContext;