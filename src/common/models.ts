interface ChatMessage {
  sender: Player;
  message?: string;
  status: 'JOIN' | 'MESSAGE';
  date: string;
}


type GameState = {
  sender: Player;
  cards: Card[];
  players: Player[];
}


type Card = {
  word: string;
  color: string;
}

type Player = {
  username: string;
  roomCode: string;
  team: "NONE" | "RED" | "BLUE";
  role: "NONE" | "MASTER" | "OPERATOR";
}

type WebsocketFunctions = {
  connect: (_:Player) => void;
  sendMessage: (_:ChatMessage) => void;
  onMessage: (_: ChatMessage) => void;
  sendGameState: (_:GameState) => void;
  onGameState: (_:GameState) => void;
}

export type {WebsocketFunctions, Player, Card, ChatMessage, GameState};