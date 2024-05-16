// Project: codenames
// Created by: kocjod20
// Date: 2024-05-10
// Time: 11:31:43

import React, {CSSProperties, MouseEvent, useContext, useState} from 'react';
import {Card} from "../common/models";
import PlayerContext from "../context/PlayerContext";
import GameStateContext from "../context/GameStateContext";
import gameStateContext from "../context/GameStateContext";
import "./card.css";
import * as url from "url";

interface Props {
  card: Card;
}

const CardComponent = ({card}: Props) => {
  const [player, setPlayer] = useContext(PlayerContext);
  const [gameState, setGameState] = useContext(GameStateContext);
  let textColor = 'inherit';
  const handleFlip = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (
      player.role !== "OPERATOR" ||
      player.team != gameState.turn ||
      !gameState.clue
    ) {
      return;
    }

    let nextTurn = false;
    if (card.color !== gameState.turn || gameState.flippedCount >= gameState.clue.amount) {
      nextTurn = true;
    }

    let newGameState = {...gameState,
      cards: gameState.cards
        .map(c => c.word === card.word ?
          {...c, flipped: true} :
          c
        ),
      flippedCount: nextTurn ? 0 : gameState.flippedCount+1,
      clue: nextTurn ? undefined : gameState.clue,
      turn: nextTurn ? (gameState.turn === "RED" ? "BLUE" : "RED") : gameState.turn,

    }

    if (newGameState.cards.filter(c => c.color === "BLUE" && !c.flipped).length == 0 ||
      newGameState.cards.filter(c => c.color === "RED" && !c.flipped).length == 0 || card.color === "BLACK") {
      newGameState.cards = [];
      newGameState.started = false;
    }

    setGameState(newGameState)
  }

  const handleMarked = () => {
    if (player.role !== "OPERATOR" || player.team != gameState.turn) return;
    const isMarked = card.marked.includes(player.username);
    setGameState(
      {...gameState,
        cards: gameState.cards
          .map(c => c.word === card.word ?
            {...c,
              marked: isMarked ?
                c.marked.filter(m => m != player.username) : [...c.marked, player.username]} :
            c
          )
      }
    )
  }

  const cardStyle = () : CSSProperties => {
    if (player.role !== 'MASTER') return {
      backgroundImage: 'url("/src/assets/card-front-white.png")',
      backgroundSize: "14vw 8vw",
    };
    return {
      backgroundImage: 'url("/src/assets/card-front-'+ card.color.toLocaleLowerCase() +'.png")',
      backgroundSize: "14vw 8vw",
    } as CSSProperties;
  }

  return (
    <div className={card.flipped ? "flipped" : ""} onClick={handleMarked}>
      <div className="card" style={cardStyle()}>
        <div className="card-front">
          <div className="card-flipper" onClick={handleFlip}></div>
          <div className="card-marked">{card.marked.join(", ")}</div>
          {card.word}
        </div>
        <div className="card-back" style={{
          backgroundImage: 'url("/src/assets/card-back-'+ card.color.toLocaleLowerCase() +'.png")',
          backgroundSize: "14vw 8vw",
        }}>
          <div className="word">
            {card.word}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;