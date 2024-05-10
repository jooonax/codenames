// Project: codenames
// Created by: kocjod20
// Date: 2024-05-09
// Time: 13:14:50

import {Player} from "../common/models";
import {useContext, useEffect, useState} from "react";
import apiClient from "../service/apiClient";
import WebsocketContext from "../context/WebsocketContext";

const usePlayers = (roomCode:string): Player[] => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [websocketFunctions, setWebsocketFunctions] = useContext(WebsocketContext);

  setWebsocketFunctions("onJoined", (player: Player) => getPlayers(player.roomCode));

  useEffect(() => {
    if (roomCode.length == 0) return;
    const controller = new AbortController();
    getPlayers(roomCode, controller);
    return () => {controller.abort();};
  }, [roomCode])

  const getPlayers = (roomCode: string, controller: AbortController = new AbortController()) => {
    apiClient.get<Player[]>(`/${roomCode}/players`, {signal: controller.signal})
      .then(res => res.data)
      .then(data => {
        setPlayers(data)
      })
  }


  return players;
}

export default usePlayers;