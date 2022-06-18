import { FC } from "react";
import { Field, FieldProps, Form, useFormikContext } from "formik";
import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { BiTable } from "react-icons/bi";
import {
  SCORE_MAX,
  SCORE_MIN,
  UpdateGameFormFields,
  UpdateGameFormValues
} from "./updateGameFormValues";

export interface UpdateGameFormProps {
  onCancel: () => void;
}

export const UpdateGameForm: FC<UpdateGameFormProps> = ({ onCancel }) => {
  const { errors, isSubmitting } = useFormikContext<UpdateGameFormValues>();
  const { t } = useTranslation()

  const translateError = (error?: string) => error ? t(error, {
    minValue: SCORE_MIN,
    maxValue: SCORE_MAX
  }) : null

  return (
    <Form>
      <HStack spacing="2">
        <Field name={UpdateGameFormFields.HOME_SCORE}>
          {(props: FieldProps<string>) => (
            <FormControl isInvalid={!!errors[UpdateGameFormFields.HOME_SCORE]} height="28">
              <FormLabel
                htmlFor={UpdateGameFormFields.HOME_SCORE}>
                {t('createGameForm.homeName')}
              </FormLabel>
              <Input id={UpdateGameFormFields.HOME_SCORE} type="number" {...props.field} />
              <FormErrorMessage>
                {translateError(errors[UpdateGameFormFields.HOME_SCORE])}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name={UpdateGameFormFields.AWAY_SCORE}>
          {(props: FieldProps<string>) => (
            <FormControl isInvalid={!!errors[UpdateGameFormFields.AWAY_SCORE]} height="28">
              <FormLabel htmlFor={UpdateGameFormFields.AWAY_SCORE}>
                {t('createGameForm.awayName')}
              </FormLabel>
              <Input id={UpdateGameFormFields.AWAY_SCORE} type="number" {...props.field} />
              <FormErrorMessage>
                {translateError(errors[UpdateGameFormFields.AWAY_SCORE])}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
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