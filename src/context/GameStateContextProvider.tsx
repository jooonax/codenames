import React, {ReactNode, useContext, useEffect, useState} from 'react';
import GameStateContext from "./GameStateContext";
import {Card, GameState, Player} from "../common/models";
import PlayerContext from "./PlayerContext";
import WebsocketContext from "./WebsocketContext";


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
    players: [],
    cards: [],
  });
  const [player, setPlayer] = useContext(PlayerContext);
  const [websocketFunctions, setWebsocketFunctions] = useContext(WebsocketContext);

  setWebsocketFunctions({...websocketFunctions,
    onGameState: setGameState
  });

  const sendGameState = (gs: GameState) => {
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