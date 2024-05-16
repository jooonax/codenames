// Project: codenames
// Created by: kocjod20
// Date: 2024-05-07
// Time: 13:29:34
import {createContext} from "react";
import {GameState} from "../common/models";

const gameStateContext = createContext<[GameState, (_:GameState) => void]>([{
  sender: {
    id: 0,
    username: "",
    roomCode: "",
    role: "NONE",
    team: "NONE",
  },
  turn: "NONE",
  started: false,
  cards: [],
  flippedCount: 0,
  winner: "NONE",
}, () => null]);

export default gameStateContext;