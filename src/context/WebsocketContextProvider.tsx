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

let stompClient: Client | null = null;

interface Props {
  children: ReactNode;
}

const WebsocketContextProvider = ({children}: Props) => {
  const [player, setPlayer] = useContext(PlayerContext);


  const [websocketFunctions, setWebsocketFunctions] = useState<WebsocketFunctions>({
    connect(player:Player): void {
      if (stompClient?.connected) {
        stompClient?.disconnect(() => {});
      }

      let Sock = new SockJS('http://localhost:8080/ws');
      stompClient = over(Sock);
      stompClient.connect({}, () => onConnected(player), onError);
    }, onGameState(_: GameState): void {
    }, onMessage(_: ChatMessage): void {
    }, sendGameState(gs: GameState): void {
      if (stompClient) {
        stompClient.send("/app/game", {}, JSON.stringify(gs));
      }
    }, sendMessage(m: ChatMessage): void {
      if (stompClient) {
        stompClient.send("/app/message", {}, JSON.stringify(m));
      }
    }
  });

  const join = (player: Player) => {
    if (stompClient) {
      stompClient.send("/app/join", {}, JSON.stringify(player));
    }
    setPlayer(player);
  }

  const onConnected = (player: Player) => {
    stompClient?.subscribe('/user/' + player.username + '/state', (_:any) => websocketFunctions.onGameState(JSON.parse(_.body)));
    stompClient?.subscribe('/user/' + player.username + '/message', (_:any) => {
      console.log(websocketFunctions.onMessage.toString());
      websocketFunctions.onMessage(JSON.parse(_.body))
    });
    join(player);
  }

  const onError = (err: any) => {
    console.log(err);
  }


  return (
    <WebsocketContext.Provider value={[websocketFunctions, setWebsocketFunctions]}>
      <>
        <button type="button" onClick={() => websocketFunctions.connect({
          username: "player_"+Date.now(),
          roomCode: prompt("room code") ?? "",
          role: "NONE",
          team: "NONE",
        })}>
          connect
        </button>
        {websocketFunctions.onMessage.toString()}
        {children}
      </>
    </WebsocketContext.Provider>
  );
};

export default WebsocketContextProvider;