import React, {ReactNode, useContext, useEffect, useState} from 'react';
import GameStateContext from "./GameStateContext";
import {Card, GameState, Player} from "../common/models";
import PlayerContext from "./PlayerContext";
import WebsocketContext from "./WebsocketContext";
import apiClient from "../service/apiClient";


interface Props {
  children: ReactNode;
}

const GameStateContextProvider = ({children}:Props) => {
  const [gameState, setGameState] = useState<GameState>({
    sender: {
      username: "",
      roomCode: "",
      role: "NONE",
      team: "NONE",
    },
    cards: [],
  });

  const [player, setPlayer] = useContext(PlayerContext);
  const [websocketFunctions, setWebsocketFunctions] = useContext(WebsocketContext);
  setWebsocketFunctions("onGameState", setGameState);

  useEffect(() => {
    if (player.roomCode.length == 0) return;
    const controller = new AbortController();
    getGameState(player.roomCode, controller);
    return () => {controller.abort();};
  }, [player.roomCode])

  const getGameState = (roomCode: string, controller: AbortController = new AbortController()) => {
    apiClient.get<GameState>(`/${roomCode}/gameState`, {signal: controller.signal})
      .then(res => res.data)
      .then(data => {
        console.log(gameState)
        setGameState(data)
      })
  }

  const sendGameState = (gs: GameState) => {
    console.log(gs);
    websocketFunctions.sendGameState({...gs, sender: player});
    setGameState(gs);
  }

  return (
    <GameStateContext.Provider value={[gameState, sendGameState]}>
      <>
        {children}
      </>
    </GameStateContext.Provider>
  );
};

export default GameStateContextProvider;