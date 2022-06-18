import { FC } from "react";
import { Field, FieldProps, Form, useFormikContext } from "formik";
import {
  CreateGameFormFields,
  CreateGameFormValues,
  NAME_MAX_LENGTH
} from "./createGameFormValues";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const CreateGameForm: FC = () => {
  const { errors, isSubmitting } = useFormikContext<CreateGameFormValues>();
  const { t } = useTranslation()

  const translateError = (error?: string) => error ? t(error, { maxCount: NAME_MAX_LENGTH }) : null

  return (
    <Form>
      <HStack spacing="2">
        <Field name={CreateGameFormFields.HOME_NAME}>
          {(props: FieldProps<string>) => (
            <FormControl isInvalid={!!errors[CreateGameFormFields.HOME_NAME]} height="28">
              <FormLabel
                htmlFor={CreateGameFormFields.HOME_NAME}>
                {t('createGameForm.homeName')}
              </FormLabel>
              <Input id={CreateGameFormFields.HOME_NAME} type="text" {...props.field} />
              <FormErrorMessage>
                {translateError(errors[CreateGameFormFields.HOME_NAME])}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name={CreateGameFormFields.AWAY_NAME}>
          {(props: FieldProps<string>) => (
            <FormControl isInvalid={!!errors[CreateGameFormFields.AWAY_NAME]} height="28">
              <FormLabel htmlFor={CreateGameFormFields.AWAY_NAME}>
                {t('createGameForm.awayName')}
              </FormLabel>
              <Input id={CreateGameFormFields.AWAY_NAME} type="text" {...props.field} />
              <FormErrorMessage>
                {translateError(errors[CreateGameFormFields.AWAY_NAME])}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Box>
          <Button type="submit" isLoading={isSubmitting} isDisabled={isSubmitting} mb="2">
            {t('common.add')}
          </Button>
        </Box>
      </HStack>
    </Form>
  );
}