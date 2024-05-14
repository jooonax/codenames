// Project: codenames
// Created by: kocjod20
// Date: 2024-05-09
// Time: 13:14:50

import {Player} from "../common/models";
import {useContext, useEffect, useState} from "react";
import apiClient from "../service/apiClient";
import WebsocketContext from "../context/WebsocketContext";
import PlayerContext from "../context/PlayerContext";

const usePlayers = (roomCode:string): Player[] => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [websocketFunctions, setWebsocketFunctions] = useContext(WebsocketContext);
  const [player, setPlayer] = useContext(PlayerContext);

  setWebsocketFunctions("onPlayer", (player: Player) => getPlayers(player.roomCode));

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
        setPlayer(data.find(p => p.username === player.username) ?? player)
        setPlayers(data);
      })
  }


  return players;
}

export default usePlayers;