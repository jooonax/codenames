import React, { useEffect, useState } from 'react';
import GameStateContextProvider from "./context/GameStateContextProvider";
import GameChat from "./components/GameChat";
import GamePage from "./components/GamePage";
import PlayerContextProvider from "./context/PlayerContextProvider";
import WebsocketContextProvider from "./context/WebsocketContextProvider";
import GameChatContextProvider from "./context/GameChatContextProvider";

const App: React.FC = () => {
  return (
      //<ChatRoom />
    <>
    <PlayerContextProvider>
      <WebsocketContextProvider>
          <GameStateContextProvider>
            <GameChatContextProvider>

              <GamePage/>
              <GameChat/>

            </GameChatContextProvider>
          </GameStateContextProvider>
      </WebsocketContextProvider>
    </PlayerContextProvider>
    </>
  )

};

export default App;