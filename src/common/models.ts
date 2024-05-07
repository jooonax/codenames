interface UserData {
  username: string;
  connected: boolean;
}
interface ChatMessage {
  senderName: string;
  message?: string;
  status: 'JOIN' | 'MESSAGE';
  date: string;
  receiverName?: string;
}


type GameState = {
  sender: string;
  roomCode: string;
  teams: Team[];
  cards: Card[];
  gameMessages: ChatMessage[];
}

type Team = {
  teamColor: string;
  spymasters: string[];
  operatives: string[];
}

type Card = {
  word: string;
  color: string;
}


export type {Team, Card, ChatMessage, UserData, GameState};