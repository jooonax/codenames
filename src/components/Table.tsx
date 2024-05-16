import React, {useContext} from 'react';
import CardComponent from "./CardComponent";
import GameStateContext from "../context/GameStateContext";
import "./table.css";

// Project: codenames
// Created by: kocjod20
// Date: 2024-05-16
// Time: 16:59:01

const Table = () => {
  const [gameState, setGameState] = useContext(GameStateContext);
  return (
    <div className="table">
    {gameState.cards &&
            <div className="cards">
              {gameState.cards.map((c, i) => <CardComponent key={i} card={c}/>)}
            </div>
    }</div>
  );
};

export default Table;