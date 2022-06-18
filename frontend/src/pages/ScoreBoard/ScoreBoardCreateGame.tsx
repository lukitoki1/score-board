import { FC } from "react";
import { Formik, FormikHelpers } from "formik";
import {
  CreateGameFormFields,
  CreateGameFormValues
} from "../../components/CreateGameForm/createGameFormValues";
import {
  createGameFormValidationSchema
} from "../../components/CreateGameForm/createGameFormValidation";
import { CreateGameForm } from "../../components/CreateGameForm/CreateGameForm";
import { useCreateGame } from "../../api/useCreateGame";

export const ScoreBoardCreateGame: FC = () => {
  const mutation = useCreateGame()

  const initialValues: CreateGameFormValues = {
    [CreateGameFormFields.HOME_NAME]: "",
    [CreateGameFormFields.AWAY_NAME]: ""
  };

  const onSubmit = async (
    values: CreateGameFormValues,
    actions: FormikHelpers<CreateGameFormValues>
  ) => {
    await mutation.mutateAsync({
      homeName: values[CreateGameFormFields.HOME_NAME],
      awayName: values[CreateGameFormFields.AWAY_NAME]
    })
    actions.setSubmitting(false)
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={createGameFormValidationSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <CreateGameForm/>
      </Formik>
    </>
  )
}