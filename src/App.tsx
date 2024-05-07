import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import ChatRoom from "./components/ChatRoom";
import './index.css'
import GameStateContextProvider from "./context/GameStateContextProvider";
import GameChat from "./components/GameChat";

const App: React.FC = () => {
  return (
      //<ChatRoom />
    <>
      <GameStateContextProvider>
        <GameChat/>
      </GameStateContextProvider>
    </>
  )

};

export default App;