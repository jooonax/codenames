interface ChatMessage {
  sender: Player;
  message?: string;
  status: 'JOIN' | 'MESSAGE';
  date: string;
}


type GameState = {
  sender: Player;
  cards: Card[];
  turn: "NONE" | "RED" | "BLUE";
  started: boolean;
  clue?: Clue;
  flippedCount: number;
  winner: "NONE" | "RED" | "BLUE";
}

type Clue = {
  word: string;
  amount: number;
}

type Card = {
  word: string;
  color: "WHITE" | "RED" | "BLUE" | "BLACK";
  flipped: boolean;
  marked: string[];
}

type Player = {
  id: number;
  username: string;
  roomCode: string;
  team: "NONE" | "RED" | "BLUE";
  role: "NONE" | "MASTER" | "OPERATOR";
}

type WebsocketFunctions = {
  connect: (_:Player) => void;
  disconnect: (_:Player) => void;
  start: () => void;
  changeRole: (_:Player) => void;
  sendMessage: (_:ChatMessage) => void;
  onMessage: (_: ChatMessage) => void;
  sendGameState: (_:GameState) => void;
  onGameState: (_:GameState) => void;
  onPlayer: (_:Player) => void;
}

export type {WebsocketFunctions, Player, Clue, Card, ChatMessage, GameState};