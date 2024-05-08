// Project: codenames
// Created by: kocjod20
// Date: 2024-05-08
// Time: 10:44:28

import {createContext} from "react";
import {ChatMessage, GameState, Player, WebsocketFunctions} from "../common/models";

const websocketContext = createContext<[WebsocketFunctions, (_:WebsocketFunctions) => void]>([
  {
    connect: (_:Player) => {},
    onGameState: (_: GameState) => {},
    onMessage: (_: ChatMessage) => {},
    sendGameState: (_: GameState) => {},
    sendMessage: (_: ChatMessage)=> {}
  }, () => null]);

export default websocketContext;