export interface CreateGameDTO {
  homeName: string;
  awayName: string;
}

export interface UpdateGameDTO {
  homeScore: number;
  awayScore: number;
}

export interface GetGameDTO {
  id: string;
  homeName: string;
  awayName: string;
  homeScore: number;
  awayScore: number;
}