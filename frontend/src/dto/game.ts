export interface CreateGameDTO {
  homeName: string;
  awayName: string;
}

export interface UpdateGameDTO extends CreateGameDTO {
  homeScore: number;
  awayScore: number;
}

export interface GameDTO {
  id: string;
  homeName: string;
  awayName: string;
  homeScore: number;
  awayScore: number;
}