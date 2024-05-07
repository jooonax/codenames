import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import ChatRoom from "./components/ChatRoom";
import './index.css'
import GameStateContextProvider from "./context/GameStateContextProvider";

const App: React.FC = () => {
  return (
      //<ChatRoom />
    <>
      <GameStateContextProvider>
        <></>
      </GameStateContextProvider>
    </>
  )

};

export default App;