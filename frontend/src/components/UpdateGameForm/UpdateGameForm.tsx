import { FC } from "react";
import { Form, useFormikContext } from "formik";
import { Button, HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { BiTable } from "react-icons/bi";
import {
  SCORE_MAX,
  SCORE_MIN,
  UpdateGameFormFields,
  UpdateGameFormValues
} from "./updateGameFormValues";
import { FormField } from "../FormField/FormField";

export interface UpdateGameFormProps {
  onCancel: () => void;
}

export const UpdateGameForm: FC<UpdateGameFormProps> = ({ onCancel }) => {
  const { errors, isSubmitting } = useFormikContext<UpdateGameFormValues>();
  const { t } = useTranslation()

  const translateError = (error?: string) => error ? t(error, {
    minValue: SCORE_MIN,
    maxValue: SCORE_MAX
  }) : undefined

  return (
    <Form>
      <HStack spacing="2">
        <FormField
          name={UpdateGameFormFields.HOME_SCORE}
          error={translateError(errors[UpdateGameFormFields.HOME_SCORE])}
          isInvalid={!!errors[UpdateGameFormFields.HOME_SCORE]}
          label={t('updateGameForm.homeScore')}
          type="number"
        />
        <FormField
          name={UpdateGameFormFields.AWAY_SCORE}
          error={translateError(errors[UpdateGameFormFields.AWAY_SCORE])}
          isInvalid={!!errors[UpdateGameFormFields.AWAY_SCORE]}
          label={t('updateGameForm.awayScore')}
          type="number"
        />
      </HStack>
      <HStack justify="end">
        <Button variant="outline" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
        <Button
          type="submit"
          variant="solid"
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
          rightIcon={<BiTable/>}
        >
          {t('common.update')}
        </Button>
      </HStack>
    </Form>
  );
}