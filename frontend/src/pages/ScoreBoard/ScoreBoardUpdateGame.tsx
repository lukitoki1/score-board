import { FC } from "react";
import { CenteredModal } from "../../components/CenteredModal/CenteredModal";
import { GameDTO } from "../../dto/game";
import { Formik, FormikHelpers } from "formik";
import {
  UpdateGameFormFields,
  UpdateGameFormValues
} from "../../components/UpdateGameForm/updateGameFormValues";
import {
  updateGameFormValidationSchema
} from "../../components/UpdateGameForm/updateGameFormValidation";
import { useUpdateGame } from "../../api/useUpdateGame";
import { UpdateGameForm } from "../../components/UpdateGameForm/UpdateGameForm";
import { useTranslation } from "react-i18next";

export interface ScoreBoardUpdateGameProps {
  game?: GameDTO;
  onClose: () => void;
}

export const ScoreBoardUpdateGame: FC<ScoreBoardUpdateGameProps> = ({ game, onClose }) => {
  const mutation = useUpdateGame()
  const { t } = useTranslation()

  const initialValues: UpdateGameFormValues = {
    [UpdateGameFormFields.HOME_SCORE]: game?.homeScore || 0,
    [UpdateGameFormFields.AWAY_SCORE]: game?.awayScore || 0
  }

  const onSubmit = async (
    values: UpdateGameFormValues,
    actions: FormikHelpers<UpdateGameFormValues>
  ) => {
    if (!game) {
      return
    }

    await mutation.mutateAsync({
      gameID: game.id,
      payload: {
        homeName: game.homeName,
        awayName: game.awayName,
        homeScore: values[UpdateGameFormFields.HOME_SCORE],
        awayScore: values[UpdateGameFormFields.AWAY_SCORE]
      }
    })
    actions.setSubmitting(false)
    onClose()
  }

  const onCancel = () => onClose()

  return (
    <CenteredModal
      isOpen={!!game}
      onClose={onClose}
      heading={t('updateGameModal.heading')}
      text={t('updateGameModal.text')}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={updateGameFormValidationSchema}
        onSubmit={onSubmit}
      >
        <UpdateGameForm onCancel={onCancel}/>
      </Formik>
    </CenteredModal>
  )
}
