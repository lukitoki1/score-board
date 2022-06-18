import * as yup from 'yup';
import { CreateGameFormFields, NAME_MAX_LENGTH } from "./createGameFormValues";

export const createGameFormValidationSchema = yup.object().shape({
  [CreateGameFormFields.HOME_NAME]: yup
    .string()
    .required('validation.required')
    .max(NAME_MAX_LENGTH, 'validation.max'),
  [CreateGameFormFields.AWAY_NAME]: yup
    .string()
    .required('validation.required')
    .max(NAME_MAX_LENGTH, 'validation.max'),
});