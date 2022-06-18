import * as yup from 'yup';
import { SCORE_MAX, SCORE_MIN, UpdateGameFormFields } from "./updateGameFormValues";

export const updateGameFormValidationSchema = yup.object().shape({
  [UpdateGameFormFields.HOME_SCORE]: yup
    .number()
    .required('validation.required')
    .min(SCORE_MIN, 'validation.minValue')
    .max(SCORE_MAX, 'validation.maxValue'),
  [UpdateGameFormFields.AWAY_SCORE]: yup
    .number()
    .required('validation.required')
    .min(SCORE_MIN, 'validation.minValue')
    .max(SCORE_MAX, 'validation.maxValue'),
});