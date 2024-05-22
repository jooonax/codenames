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
    <PlayerContextProvider>
      <WebsocketContextProvider>
          <GameStateContextProvider>
            <GameChatContextProvider>

              <Router>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/game" element={<GamePage />} />
                </Routes>
              </Router>

            </GameChatContextProvider>
          </GameStateContextProvider>
      </WebsocketContextProvider>
    </PlayerContextProvider>
    </>
  )

};

export default App;