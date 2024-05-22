import React, {ReactNode, useContext, useEffect, useState} from 'react';
import GameStateContextProvider from "./context/GameStateContextProvider";
import GameChat from "./components/GameChat";
import GamePage from "./pages/GamePage";
import PlayerContextProvider from "./context/PlayerContextProvider";
import GameChatContextProvider from "./context/GameChatContextProvider";
import HomePage from "./pages/HomePage";
import WebsocketContextProvider from "./context/WebsocketContextProvider";
import websocketContext from "./context/WebsocketContext";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

const App: React.FC = () => {


  return (
    <>
    <Router>
      <PlayerContextProvider>
        <WebsocketContextProvider>
            <GameStateContextProvider>
              <GameChatContextProvider>

                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/game" element={<GamePage />} />
                  </Routes>

              </GameChatContextProvider>
            </GameStateContextProvider>
        </WebsocketContextProvider>
      </PlayerContextProvider>
    </Router>
    </>
  )

};

export default App;