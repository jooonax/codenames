// Project: codenames
// Created by: kocjod20
// Date: 2024-05-08
// Time: 10:38:44
import React, {ReactNode, useContext, useEffect, useState} from 'react';
import PlayerContext from "./PlayerContext";
import {GameState, Player} from "../common/models";
import WebsocketConetxt from "./WebsocketContext";

interface Props {
  children: ReactNode;
}

const PlayerContextProvider = ({children} : Props) => {
  const [player, setPlayer] = useState<Player>({
    username: "",
    roomCode: "",
    role: "NONE",
    team: "NONE",
  })
  const [websocketFunctions, setWebsocketFunctions] = useContext(WebsocketConetxt);

  return (
    <PlayerContext.Provider value={[player, setPlayer]}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;