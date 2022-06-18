export enum CreateGameFormFields {
  HOME_NAME = 'home-name',
  AWAY_NAME = 'away-name',
}

export interface CreateGameFormValues {
  [CreateGameFormFields.HOME_NAME]: string;
  [CreateGameFormFields.AWAY_NAME]: string;
}

export const NAME_MAX_LENGTH = 50