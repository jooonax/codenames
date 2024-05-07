import React, {ReactNode, useEffect, useState} from 'react';
import GameStateContext from "./GameStateContext";
import SockJS from "sockjs-client";
import {Client, over} from "stompjs";
import {GameState, UserData} from "../common/models";
import gameStateContext from "./GameStateContext";

let stompClient: Client | null = null;

interface Props {
  children: ReactNode;
}

const GameStateContextProvider = ({children}:Props) => {
  const [gameState, setGameState] = useState<GameState>({
    sender: "",
    roomCode: "",
    teams: [],
    cards: [],
  });

  const connect = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }

  const onConnected = () => {
    let gs = { ...gameState, sender: "player_" + Date.now(), roomCode: prompt("roomCode") ?? ""};
    setGameState(gs);
    stompClient?.subscribe('/user/' + gs.sender + '/state', onGameState);
    userJoin(gs);
  }

  const userJoin = (gs: GameState) => {
    if (stompClient) {
      stompClient.send("/app/join", {}, JSON.stringify({
        user: gs.sender,
        roomCode: gs.roomCode
      }));
    }
  }


  const onGameState = (payload: any) => {
    console.log(payload);
    payload.sender = gameState.sender;
    setGameState(payload);
  }

  const onError = (err: any) => {
    console.log(err);
  }

  const sendGameState = () => {
    if (stompClient) {
      let gs = gameState;
      console.log(gs);
      stompClient.send("/app/game", {}, JSON.stringify(gs));
    }
  }

  const registerUser = () => {
    connect();
  }


  return (
    <GameStateContext.Provider value={[gameState, setGameState]}>
      <>
        <button type="button" onClick={registerUser}>
          connect
        </button>
        <button type="button" onClick={sendGameState}>
          send
        </button>
        {children}
      </>
    </GameStateContext.Provider>
  );
};

export default GameStateContextProvider;