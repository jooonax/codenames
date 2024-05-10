// Project: codenames
// Created by: kocjod20
// Date: 2024-05-08
// Time: 10:50:23

import React, {ReactNode, useContext, useState} from 'react';
import {ChatMessage, GameState, Player, WebsocketFunctions} from "../common/models";
import {Client, over} from "stompjs";
import SockJS from "sockjs-client";
import WebsocketContext from "./WebsocketContext";
import PlayerContext from "./PlayerContext";
import websocketContext from "./WebsocketContext";

let stompClient: Client | null = null;
let websocketFunctions: WebsocketFunctions = {
  connect: (_:Player) => {},
  onGameState: (_: GameState) => {},
  onMessage: (_: ChatMessage) => {},
  sendGameState: (_: GameState) => {},
  sendMessage: (_: ChatMessage)=> {},
  onJoined: (_:Player) => {},
};



interface Props {
  children: ReactNode;
}

const WebsocketContextProvider = ({children}: Props) => {
  const [player, setPlayer] = useContext(PlayerContext);
  const [connected, setConnected] = useState(false);

  websocketFunctions = {...websocketFunctions,
    connect: (player:Player) => {
      if (stompClient?.connected) {
        stompClient?.disconnect(() => {});
      }

      let Sock = new SockJS('http://localhost:8080/ws');
      stompClient = over(Sock);
      stompClient.connect({}, () => onConnected(player), onError);
    },

    sendGameState: (gs: GameState) => {
      if (stompClient) {
        stompClient.send("/app/game", {}, JSON.stringify(gs));
      }
    },
    sendMessage: (m: ChatMessage) => {
      if (stompClient) {
        stompClient.send("/app/message", {}, JSON.stringify(m));
      }
    }
  }

  const join = (player: Player) => {
    if (stompClient) {
      stompClient.send("/app/join", {}, JSON.stringify(player));
    }
    setPlayer(player);
    setConnected(true);
  }

  const onConnected = (player: Player) => {
    stompClient?.subscribe('/user/' + player.username + '/state', (_:any) => websocketFunctions.onGameState(JSON.parse(_.body)));
    stompClient?.subscribe('/user/' + player.username + '/message', (_:any) => websocketFunctions.onMessage(JSON.parse(_.body)));
    stompClient?.subscribe('/user/' + player.username + '/joined', (_:any) => websocketFunctions.onJoined(JSON.parse(_.body)));
    join(player);
  }
  const onError = (err: any) => {
    console.log(err);
  }

  const setWebsocketFunctions = (name: string, f:any) => {
    if (name == "onJoined" || name == "onMessage" || name == "onGameState") {
      websocketFunctions[name] = f;
    }
  }

  return (
    <WebsocketContext.Provider value={[websocketFunctions, setWebsocketFunctions, connected]}>
      <>
        {children}
      </>
    </WebsocketContext.Provider>
  );
};

export default WebsocketContextProvider;