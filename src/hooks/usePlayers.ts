// Project: codenames
// Created by: kocjod20
// Date: 2024-05-09
// Time: 13:14:50

import {Player} from "../common/models";
import {useEffect, useState} from "react";
import apiClient from "../service/apiClient";

const usePlayers = (roomCode:string): Player[] => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (roomCode.length == 0) return;
    const controller = new AbortController();
    apiClient.get<Player[]>(`/${roomCode}/players`, {signal: controller.signal})
      .then(res => res.data)
      .then(data => setPlayers(data))
      .catch()
    return () => {controller.abort();};
  }, [roomCode])

  return players;
}

export default usePlayers;