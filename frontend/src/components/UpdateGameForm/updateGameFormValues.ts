export enum UpdateGameFormFields {
  HOME_SCORE = 'home-score',
  AWAY_SCORE = 'away-score',
}

export interface UpdateGameFormValues {
  [UpdateGameFormFields.HOME_SCORE]: number;
  [UpdateGameFormFields.AWAY_SCORE]: number;
}

export const SCORE_MIN = 0
export const SCORE_MAX = 999