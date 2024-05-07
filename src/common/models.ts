interface UserData {
  username: string;
  connected: boolean;
}


type GameState = {
  sender: string;
  roomCode: string;
  teams: Team[];
  cards: Card[];
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


export type {UserData, GameState};