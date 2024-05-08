import React, {ReactNode, useContext, useEffect, useState} from 'react';
import GameStateContext from "./GameStateContext";
import {Card, GameState, Player} from "../common/models";
import PlayerContext from "./PlayerContext";
import WebsocketConetxt from "./WebsocketContext";
import PlayerContextProvider from "./PlayerContextProvider";


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
  const [websocketFunctions, setWebsocketFunctions] = useContext(WebsocketConetxt);

  useEffect(() => {
    setWebsocketFunctions({...websocketFunctions,
      onGameState: (gs:GameState) => {
      console.log(gs);
        setGameState(gs)
      }
    })
  }, []);

  const sendGameState = (gs: GameState) => {
    websocketFunctions.sendGameState({...gs, sender: player});
    setGameState(gs);
  }

  return (
    <GameStateContext.Provider value={[gameState, sendGameState]}>
      <>
        {gameState.sender.username}
        {children}
      </>
    </GameStateContext.Provider>
  );
};

export default GameStateContextProvider;